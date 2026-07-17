import { Router } from 'express';
import * as controller from './requests.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { createRequestSchema, assignSchema, statusSchema } from './requests.schema.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new service request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, location, categoryId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               priority:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Request created successfully
 */
router.post('/', authorize(ROLES.REQUESTER, ROLES.ADMIN), validate(createRequestSchema), controller.create);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests (role scoped)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get request details by ID
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request details
 */
router.get('/:id', controller.detail);

/**
 * @swagger
 * /api/requests/{id}/cancel:
 *   post:
 *     summary: Cancel a request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request cancelled
 */
router.post('/:id/cancel', authorize(ROLES.REQUESTER, ROLES.ADMIN), controller.cancel);

/**
 * @swagger
 * /api/requests/{id}/assign:
 *   post:
 *     summary: Assign a request to an officer (Admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [officerId]
 *             properties:
 *               officerId:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request assigned successfully
 */
router.post('/:id/assign', authorize(ROLES.ADMIN), validate(assignSchema), controller.assign);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   post:
 *     summary: Update request status (Officer/Admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.post('/:id/status', authorize(ROLES.OFFICER, ROLES.ADMIN), validate(statusSchema), controller.updateStatus);


export default router;
