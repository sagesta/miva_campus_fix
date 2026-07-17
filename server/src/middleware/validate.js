import { badRequest } from '../utils/http.js';

// Validates req.body against a Zod schema, replacing it with the parsed value.
export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }));
      return next(badRequest('Validation failed', details));
    }
    req.body = result.data;
    next();
  };
}
