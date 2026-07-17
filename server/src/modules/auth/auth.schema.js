import { z } from 'zod';
import { USER_TYPE_VALUES } from '../../utils/constants.js';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(USER_TYPE_VALUES),
  department: z.string().min(1).optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
});
