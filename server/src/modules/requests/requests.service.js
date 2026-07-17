import { prisma } from '../../config/prisma.js';
import { ROLES, STATUS } from '../../utils/constants.js';
import { canTransition } from '../../utils/statusMachine.js';
import { badRequest, forbidden, notFound } from '../../utils/http.js';

const requestInclude = {
  category: true,
  requester: { select: { id: true, fullName: true, email: true, department: true } },
  assignments: {
    where: { isActive: true },
    include: { officer: { select: { id: true, fullName: true, email: true } } },
    orderBy: { assignedAt: 'desc' },
  },
  statusUpdates: {
    include: { updatedBy: { select: { id: true, fullName: true, role: { select: { name: true } } } } },
    orderBy: { createdAt: 'asc' },
  },
};

export async function createRequest(user, input) {
  const category = await prisma.requestCategory.findUnique({ where: { id: input.categoryId } });
  if (!category) throw badRequest('Invalid category');

  return prisma.serviceRequest.create({
    data: {
      title: input.title,
      description: input.description,
      location: input.location,
      priority: input.priority || 'MEDIUM',
      requesterId: user.id,
      categoryId: input.categoryId,
    },
    include: requestInclude,
  });
}

// Role-scoped listing with filters + pagination.
export async function listRequests(user, query) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const where = {};
  if (user.role === ROLES.REQUESTER) {
    where.requesterId = user.id;
  } else if (user.role === ROLES.OFFICER) {
    where.assignments = { some: { officerId: user.id, isActive: true } };
  }
  // ADMIN: no scope filter.

  if (query.status) where.status = String(query.status);
  if (query.categoryId) where.categoryId = Number(query.categoryId);
  if (query.priority) where.priority = String(query.priority);
  if (query.search) {
    where.OR = [
      { title: { contains: String(query.search) } },
      { description: { contains: String(query.search) } },
      { location: { contains: String(query.search) } },
    ];
  }

  const [total, data] = await Promise.all([
    prisma.serviceRequest.count({ where }),
    prisma.serviceRequest.findMany({
      where,
      include: {
        category: true,
        requester: { select: { id: true, fullName: true } },
        assignments: {
          where: { isActive: true },
          include: { officer: { select: { id: true, fullName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  };
}

// Object-level access: requester (owner), assigned officer, or admin.
export async function getRequest(user, id) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: requestInclude,
  });
  if (!request) throw notFound('Request not found');

  const isOwner = request.requesterId === user.id;
  const isAssignedOfficer = request.assignments.some((a) => a.officer.id === user.id);
  if (user.role !== ROLES.ADMIN && !isOwner && !isAssignedOfficer) {
    throw forbidden('You cannot view this request');
  }
  return request;
}

export async function cancelRequest(user, id) {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) throw notFound('Request not found');
  if (user.role !== ROLES.ADMIN && request.requesterId !== user.id) {
    throw forbidden('You can only cancel your own requests');
  }
  if (request.status !== STATUS.PENDING) {
    throw badRequest('Only pending requests can be cancelled');
  }

  return transitionStatus(user, id, STATUS.CANCELLED, 'Cancelled by requester');
}

export async function assignOfficer(user, id, input) {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) throw notFound('Request not found');

  const officer = await prisma.user.findUnique({
    where: { id: input.officerId },
    include: { role: true },
  });
  if (!officer || officer.role.name !== ROLES.OFFICER) {
    throw badRequest('Selected user is not an officer');
  }

  if (!canTransition(request.status, STATUS.ASSIGNED, user.role)) {
    throw badRequest(`Cannot assign a request that is ${request.status}`);
  }

  return prisma.$transaction(async (tx) => {
    // Deactivate any previous active assignment (reassignment).
    await tx.assignment.updateMany({
      where: { requestId: id, isActive: true },
      data: { isActive: false },
    });
    await tx.assignment.create({
      data: {
        requestId: id,
        officerId: officer.id,
        assignedById: user.id,
        note: input.note,
      },
    });
    await tx.statusUpdate.create({
      data: {
        requestId: id,
        updatedById: user.id,
        oldStatus: request.status,
        newStatus: STATUS.ASSIGNED,
        comment: input.note || `Assigned to ${officer.fullName}`,
      },
    });
    return tx.serviceRequest.update({
      where: { id },
      data: { status: STATUS.ASSIGNED },
      include: requestInclude,
    });
  });
}

export async function transitionStatus(user, id, newStatus, comment) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: { assignments: { where: { isActive: true } } },
  });
  if (!request) throw notFound('Request not found');

  // Officers may only act on their own active assignment.
  if (user.role === ROLES.OFFICER) {
    const isAssigned = request.assignments.some((a) => a.officerId === user.id);
    if (!isAssigned) throw forbidden('This request is not assigned to you');
  }

  if (!canTransition(request.status, newStatus, user.role)) {
    throw badRequest(`Cannot change status from ${request.status} to ${newStatus}`);
  }

  return prisma.$transaction(async (tx) => {
    await tx.statusUpdate.create({
      data: {
        requestId: id,
        updatedById: user.id,
        oldStatus: request.status,
        newStatus,
        comment,
      },
    });
    return tx.serviceRequest.update({
      where: { id },
      data: { status: newStatus },
      include: requestInclude,
    });
  });
}
