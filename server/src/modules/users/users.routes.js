import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { ok } from '../../utils/http.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

// Admin: list users, optionally filtered by role (used to pick officers).
router.get('/', authenticate, authorize(ROLES.ADMIN), async (req, res, next) => {
  try {
    const where = {};
    if (req.query.role) where.role = { name: String(req.query.role) };

    const users = await prisma.user.findMany({
      where,
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        department: true,
        isActive: true,
        role: { select: { name: true } },
      },
    });
    ok(res, users.map((u) => ({ ...u, role: u.role.name })));
  } catch (err) {
    next(err);
  }
});

export default router;
