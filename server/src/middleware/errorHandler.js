import { ApiError } from '../utils/http.js';

export function notFoundHandler(_req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
}

// Central error handler — must keep 4 args so Express recognises it.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  // Prisma unique-constraint violation
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: { code: 'CONFLICT', message: 'A record with that value already exists' },
    });
  }

  console.error('[error]', err);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL', message: 'Something went wrong' },
  });
}
