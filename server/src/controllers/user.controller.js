import User from "../models/User.js";
import Perfume from "../models/Perfume.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { issueTokens } from "../utils/token.js";

// PUT /api/users/me
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (name !== undefined) req.user.name = name;
  if (phone !== undefined) req.user.phone = phone;
  await req.user.save();
  res.json({ success: true, user: req.user.toPublic() });
});

// PUT /api/users/me/password
export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.matchPassword(req.body.currentPassword)))
    throw new ApiError(400, "Current password is incorrect");
  user.password = req.body.newPassword;
  const accessToken = await issueTokens(user, res);
  res.json({ success: true, message: "Password updated", accessToken });
});

// GET /api/users/me/wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json({ success: true, items: user.wishlist });
});

// POST /api/users/me/wishlist/:perfumeId  (toggle)
export const toggleWishlist = asyncHandler(async (req, res) => {
  if (!(await Perfume.exists({ _id: req.params.perfumeId })))
    throw new ApiError(404, "Perfume not found");
  const id = String(req.params.perfumeId);
  const has = req.user.wishlist.some((w) => String(w) === id);
  req.user.wishlist = has
    ? req.user.wishlist.filter((w) => String(w) !== id)
    : [...req.user.wishlist, id];
  await req.user.save();
  res.json({
    success: true,
    wishlist: req.user.wishlist.map(String),
    added: !has,
  });
});

// GET /api/users  (admin)
export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt");
  res.json({ success: true, items: users.map((u) => u.toPublic()) });
});

// PATCH /api/users/:id/role  (admin)
export const updateRole = asyncHandler(async (req, res) => {
  if (String(req.user._id) === req.params.id)
    throw new ApiError(400, "You cannot change your own role");
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true },
  );
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, user: user.toPublic() });
});

// DELETE /api/users/:id  (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  if (String(req.user._id) === req.params.id)
    throw new ApiError(400, "You cannot delete your own account here");
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, id: req.params.id });
});
