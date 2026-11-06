import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../config/env.js";

export const signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.accessSecret, {
    expiresIn: env.accessExpires,
  });

export const signRefreshToken = (user) =>
  jwt.sign({ id: user._id }, env.refreshSecret, {
    expiresIn: env.refreshExpires,
  });

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const REFRESH_COOKIE = "qt_refresh";
export const cookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};
