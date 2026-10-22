export function errorHandler(err, req, res, next) {
  console.error('[Error Middleware]', err.stack || err.message);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred while processing your request.';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
}
