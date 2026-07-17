import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ROLE_NAMES = ['REQUESTER', 'OFFICER', 'ADMIN'];
const CATEGORIES = [
  ['Electrical', 'Faulty wiring, sockets, lighting, power issues'],
  ['Plumbing', 'Leaking pipes, taps, drainage, water supply'],
  ['Furniture', 'Damaged desks, chairs, beds, cupboards'],
  ['Internet', 'Wi-Fi, network, and connectivity problems'],
  ['Classroom Equipment', 'Projectors, boards, AC, lab equipment'],
  ['Hostel', 'General hostel maintenance issues'],
  ['Other', 'Anything not covered above'],
];

async function main() {
  console.log('Seeding database...');

  // Roles
  const roles = {};
  for (const name of ROLE_NAMES) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Categories
  const categories = {};
  for (const [name, description] of CATEGORIES) {
    categories[name] = await prisma.requestCategory.upsert({
      where: { name },
      update: { description },
      create: { name, description },
    });
  }

  const passwordHash = await bcrypt.hash('password123', 10);

  const upsertUser = (email, data) =>
    prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, passwordHash, ...data },
    });

  // Admin
  const admin = await upsertUser('admin@university.edu', {
    fullName: 'Ada Admin',
    roleId: roles.ADMIN.id,
    department: 'Facilities Management',
  });

  // Officers
  const officer1 = await upsertUser('officer1@university.edu', {
    fullName: 'Ola Officer',
    roleId: roles.OFFICER.id,
    department: 'Maintenance',
  });
  const officer2 = await upsertUser('officer2@university.edu', {
    fullName: 'Efe Engineer',
    roleId: roles.OFFICER.id,
    department: 'Maintenance',
  });

  // Requesters
  const student = await upsertUser('student@university.edu', {
    fullName: 'Sam Student',
    roleId: roles.REQUESTER.id,
    userType: 'STUDENT',
    department: 'Hostel B',
  });
  const staff = await upsertUser('staff@university.edu', {
    fullName: 'Stella Staff',
    roleId: roles.REQUESTER.id,
    userType: 'STAFF',
    department: 'Registry',
  });

  // Only seed sample requests once (skip if any already exist).
  const existing = await prisma.serviceRequest.count();
  if (existing > 0) {
    console.log(`Seed complete (kept ${existing} existing requests).`);
    return;
  }

  const samples = [
    { title: 'Broken socket in Room 214', description: 'The wall socket sparks when plugged in.', location: 'Hostel B, Room 214', categoryId: categories.Electrical.id, priority: 'HIGH', requesterId: student.id, status: 'PENDING' },
    { title: 'Leaking pipe under sink', description: 'Water pooling in the kitchenette.', location: 'Hostel B, Kitchen 2', categoryId: categories.Plumbing.id, priority: 'URGENT', requesterId: student.id, status: 'PENDING' },
    { title: 'Projector not turning on', description: 'LT-3 projector shows no signal.', location: 'Lecture Theatre 3', categoryId: categories['Classroom Equipment'].id, priority: 'MEDIUM', requesterId: staff.id, status: 'ASSIGNED', officerId: officer1.id },
    { title: 'Wi-Fi keeps dropping', description: 'Connection drops every few minutes in Registry.', location: 'Registry Building', categoryId: categories.Internet.id, priority: 'MEDIUM', requesterId: staff.id, status: 'IN_PROGRESS', officerId: officer2.id },
    { title: 'Cracked desk in Room 101', description: 'Desk surface is split and unsafe.', location: 'Block A, Room 101', categoryId: categories.Furniture.id, priority: 'LOW', requesterId: student.id, status: 'COMPLETED', officerId: officer1.id },
    { title: 'Flickering corridor lights', description: 'Lights flicker on the 2nd floor corridor.', location: 'Hostel B, Floor 2', categoryId: categories.Electrical.id, priority: 'MEDIUM', requesterId: student.id, status: 'CANCELLED' },
  ];

  for (const s of samples) {
    const { officerId, status, ...data } = s;
    const request = await prisma.serviceRequest.create({ data: { ...data, status } });

    // Build a plausible status history + assignment for non-pending items.
    if (status === 'CANCELLED') {
      await prisma.statusUpdate.create({
        data: { requestId: request.id, updatedById: request.requesterId, oldStatus: 'PENDING', newStatus: 'CANCELLED', comment: 'No longer needed' },
      });
    }

    if (officerId) {
      await prisma.assignment.create({
        data: { requestId: request.id, officerId, assignedById: admin.id, note: 'Please handle promptly', isActive: true },
      });
      await prisma.statusUpdate.create({
        data: { requestId: request.id, updatedById: admin.id, oldStatus: 'PENDING', newStatus: 'ASSIGNED', comment: 'Assigned to officer' },
      });
      if (status === 'IN_PROGRESS' || status === 'COMPLETED') {
        await prisma.statusUpdate.create({
          data: { requestId: request.id, updatedById: officerId, oldStatus: 'ASSIGNED', newStatus: 'IN_PROGRESS', comment: 'Work started' },
        });
      }
      if (status === 'COMPLETED') {
        await prisma.statusUpdate.create({
          data: { requestId: request.id, updatedById: officerId, oldStatus: 'IN_PROGRESS', newStatus: 'COMPLETED', comment: 'Fixed and verified' },
        });
      }
    }
  }

  console.log('Seed complete.');
  console.log('Login with any of these (password: password123):');
  console.log('  admin@university.edu | officer1@university.edu | student@university.edu');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
