import { Router } from 'express';
import * as controller from './requests.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { createRequestSchema, assignSchema, statusSchema } from './requests.schema.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

router.use(authenticate);

router.post('/', authorize(ROLES.REQUESTER, ROLES.ADMIN), validate(createRequestSchema), controller.create);
router.get('/', controller.list);
router.get('/:id', controller.detail);
router.post('/:id/cancel', authorize(ROLES.REQUESTER, ROLES.ADMIN), controller.cancel);
router.post('/:id/assign', authorize(ROLES.ADMIN), validate(assignSchema), controller.assign);
router.post('/:id/status', authorize(ROLES.OFFICER, ROLES.ADMIN), validate(statusSchema), controller.updateStatus);

export default router;
