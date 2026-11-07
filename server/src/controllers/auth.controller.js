import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import env from "../config/env.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  hashToken,
  issueTokens,
  REFRESH_COOKIE,
  cookieOptions,
} from "../utils/token.js";

const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: env.smtpUser
      ? { user: env.smtpUser, pass: env.smtpPass }
      : undefined,
  });
  const resetUrl = `${env.clientUrl.split(",")[0]}/reset-password/${token}`;
  await transporter.sendMail({
    from: env.mailFrom || env.smtpUser,
    to: email,
    subject: "Reset your Quatréa password",
    text: `Use this link to reset your password within 15 minutes:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
  });
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email }))
    throw new ApiError(409, "An account with this email already exists");
  const user = await User.create({ name, email, password });
  const accessToken = await issueTokens(user, res);
  res.status(201).json({ success: true, user: user.toPublic(), accessToken });
});

const authenticate = async ({ email, password }, requiredRole) => {
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user || !(await user.matchPassword(password)))
    throw new ApiError(401, "Incorrect email or password");
  if (requiredRole && user.role !== requiredRole)
    throw new ApiError(401, "Incorrect email or password");
  return user;
};

const startSession = async (user, res) => {
  const accessToken = await issueTokens(user, res);
  return { success: true, user: user.toPublic(), accessToken };
};

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const user = await authenticate(req.body);
  res.json(await startSession(user, res));
});

// POST /api/auth/admin/login
export const adminLogin = asyncHandler(async (req, res) => {
  const user = await authenticate(req.body, "admin");
  res.json(await startSession(user, res));
});

// POST /api/auth/refresh  (rotates the httpOnly refresh cookie)
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (!token) throw new ApiError(401, "No active session");
  let decoded;
  try {
    decoded = jwt.verify(token, env.refreshSecret);
  } catch {
    throw new ApiError(401, "Session expired, please sign in again");
  }
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== hashToken(token))
    throw new ApiError(401, "Session is no longer valid");
  const accessToken = await issueTokens(user, res);
  res.json({ success: true, accessToken });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (token)
    await User.updateOne(
      { refreshToken: hashToken(token) },
      { $unset: { refreshToken: 1 } },
    );
  res.clearCookie(REFRESH_COOKIE, { ...cookieOptions, maxAge: undefined });
  res.json({ success: true, message: "Signed out" });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user.toPublic() });
});

// POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  if (!env.smtpHost || !env.mailFrom)
    throw new ApiError(503, "Password reset email is not configured");

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = hashToken(token);
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    try {
      await sendPasswordResetEmail(user.email, token);
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.error("Password reset email delivery failed:", error);
    }
  }
  res.json({
    success: true,
    message: "If the account exists, password reset instructions have been sent.",
  });
});

// POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: hashToken(req.body.token),
    resetPasswordExpires: { $gt: new Date() },
  }).select(
    "+password +refreshToken +resetPasswordToken +resetPasswordExpires",
  );
  if (!user) throw new ApiError(400, "Reset link is invalid or has expired");

  user.password = req.body.password;
  user.refreshToken = undefined;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.clearCookie(REFRESH_COOKIE, { ...cookieOptions, maxAge: undefined });
  res.json({ success: true, message: "Password updated. Please sign in." });
});
