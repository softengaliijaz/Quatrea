import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));

export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Server error';
  if (err.name === 'CastError') { status = 400; message = 'Invalid identifier'; }
  if (err.code === 11000) { status = 409; message = `${Object.keys(err.keyValue || {})[0] || 'Value'} already exists`; }
  if (err.name === 'ValidationError') { status = 422; message = Object.values(err.errors).map((e) => e.message).join(', '); }
  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message, errors: err.errors });
};
