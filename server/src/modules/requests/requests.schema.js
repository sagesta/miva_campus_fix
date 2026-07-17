import { z } from 'zod';
import { PRIORITY_VALUES, STATUS_VALUES } from '../../utils/constants.js';

export const createRequestSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Please describe the issue'),
  location: z.string().min(2, 'Location is required'),
  categoryId: z.coerce.number().int().positive('Category is required'),
  priority: z.enum(PRIORITY_VALUES).optional(),
});

export const assignSchema = z.object({
  officerId: z.coerce.number().int().positive('Officer is required'),
  note: z.string().optional(),
});

export const statusSchema = z.object({
  newStatus: z.enum(STATUS_VALUES),
  comment: z.string().optional(),
});
