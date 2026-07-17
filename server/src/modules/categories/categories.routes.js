import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import { authenticate } from '../../middleware/auth.js';
import { ok } from '../../utils/http.js';

const router = Router();

router.get('/', authenticate, async (_req, res, next) => {
  try {
    const categories = await prisma.requestCategory.findMany({ orderBy: { name: 'asc' } });
    ok(res, categories);
  } catch (err) {
    next(err);
  }
});

export default router;
