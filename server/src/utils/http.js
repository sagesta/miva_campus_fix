// Helpers for the consistent { success, data|error, meta? } response envelope.

export function ok(res, data, meta) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.json(body);
}

export function created(res, data) {
  return res.status(201).json({ success: true, data });
}

// Throwable API error picked up by the central error handler.
export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (msg, details) => new ApiError(400, 'BAD_REQUEST', msg, details);
export const unauthorized = (msg = 'Authentication required') => new ApiError(401, 'UNAUTHORIZED', msg);
export const forbidden = (msg = 'You do not have access to this resource') => new ApiError(403, 'FORBIDDEN', msg);
export const notFound = (msg = 'Resource not found') => new ApiError(404, 'NOT_FOUND', msg);
export const conflict = (msg) => new ApiError(409, 'CONFLICT', msg);
