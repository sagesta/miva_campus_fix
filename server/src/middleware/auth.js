import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { unauthorized, forbidden } from '../utils/http.js';

// Verifies the Bearer token, loads the user, rejects deactivated accounts.
export async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw unauthorized('Missing Bearer token');

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw unauthorized('Invalid or expired token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true },
    });
    if (!user) throw unauthorized('User no longer exists');
    if (!user.isActive) throw forbidden('Account is deactivated');

    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.name,
    };
    next();
  } catch (err) {
    next(err);
  }
}

// Restricts a route to the given roles.
export function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) {
      return next(forbidden(`Requires one of: ${roles.join(', ')}`));
    }
    next();
  };
}
