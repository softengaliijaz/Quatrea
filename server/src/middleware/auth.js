import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Authentication: verifies the Bearer access token and attaches req.user
export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token) throw new ApiError(401, "Please sign in to continue");
  let decoded;
  try {
    decoded = jwt.verify(token, env.accessSecret);
  } catch {
    throw new ApiError(401, "Your session has expired");
  }
  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, "Account no longer exists");
  req.user = user;
  next();
});

// Authorization: restricts a route to the given roles
export const authorize =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user?.role)
      ? next()
      : next(new ApiError(403, "You do not have permission to do this"));
