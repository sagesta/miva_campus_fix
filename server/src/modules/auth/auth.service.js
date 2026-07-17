import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { env } from '../../config/env.js';
import { ROLES } from '../../utils/constants.js';
import { conflict, unauthorized } from '../../utils/http.js';

// Strip the password hash before a user object leaves the service.
function publicUser(user) {
  const { passwordHash, roleId, ...rest } = user;
  return { ...rest, role: user.role?.name };
}

function signToken(user) {
  return jwt.sign({ userId: user.id, role: user.role.name }, env.jwtSecret, {
    expiresIn: '24h',
  });
}

export async function register(input) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw conflict('An account with that email already exists');

  const requesterRole = await prisma.role.findUnique({ where: { name: ROLES.REQUESTER } });
  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      passwordHash,
      userType: input.userType,
      department: input.department,
      phone: input.phone,
      roleId: requesterRole.id,
    },
    include: { role: true },
  });

  return { token: signToken(user), user: publicUser(user) };
}

export async function login(input) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { role: true },
  });
  if (!user) throw unauthorized('Invalid email or password');
  if (!user.isActive) throw unauthorized('Account is deactivated');

  const match = await bcrypt.compare(input.password, user.passwordHash);
  if (!match) throw unauthorized('Invalid email or password');

  return { token: signToken(user), user: publicUser(user) };
}

export async function me(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
  return publicUser(user);
}
