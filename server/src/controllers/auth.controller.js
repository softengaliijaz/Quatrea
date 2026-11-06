import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, hashToken, REFRESH_COOKIE, cookieOptions } from '../utils/token.js';

const issueTokens = async (user, res) => {
  const refresh = signRefreshToken(user);
  user.refreshToken = hashToken(refresh);
  await user.save({ validateBeforeSave: false });
  res.cookie(REFRESH_COOKIE, refresh, cookieOptions);
  return signAccessToken(user);
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email })) throw new ApiError(409, 'An account with this email already exists');
  const user = await User.create({ name, email, password });
  const accessToken = await issueTokens(user, res);
  res.status(201).json({ success: true, user: user.toPublic(), accessToken });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !(await user.matchPassword(password))) throw new ApiError(401, 'Incorrect email or password');
  const accessToken = await issueTokens(user, res);
  res.json({ success: true, user: user.toPublic(), accessToken });
});

// POST /api/auth/refresh  (rotates the httpOnly refresh cookie)
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (!token) throw new ApiError(401, 'No active session');
  let decoded;
  try {
    decoded = jwt.verify(token, env.refreshSecret);
  } catch {
    throw new ApiError(401, 'Session expired, please sign in again');
  }
  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== hashToken(token)) throw new ApiError(401, 'Session is no longer valid');
  const accessToken = await issueTokens(user, res);
  res.json({ success: true, accessToken });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (token) await User.updateOne({ refreshToken: hashToken(token) }, { $unset: { refreshToken: 1 } });
  res.clearCookie(REFRESH_COOKIE, { ...cookieOptions, maxAge: undefined });
  res.json({ success: true, message: 'Signed out' });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user.toPublic() });
});
