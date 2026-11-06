import Review from "../models/Review.js";
import Perfume from "../models/Perfume.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/perfumes/:perfumeId/reviews
export const listReviews = asyncHandler(async (req, res) => {
  const items = await Review.find({ perfume: req.params.perfumeId })
    .populate("user", "name")
    .sort("-createdAt");
  res.json({ success: true, items });
});

// POST /api/perfumes/:perfumeId/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { perfumeId } = req.params;
  if (!(await Perfume.exists({ _id: perfumeId })))
    throw new ApiError(404, "Perfume not found");
  if (await Review.exists({ perfume: perfumeId, user: req.user._id }))
    throw new ApiError(409, "You have already reviewed this perfume");
  const review = await Review.create({
    perfume: perfumeId,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  await Review.recalculate(perfumeId);
  await review.populate("user", "name");
  const perfume = await Perfume.findById(perfumeId);
  res.status(201).json({ success: true, review, perfume });
});

// DELETE /api/reviews/:id  (owner or admin)
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw new ApiError(404, "Review not found");
  if (String(review.user) !== String(req.user._id) && req.user.role !== "admin")
    throw new ApiError(403, "You can only remove your own review");
  await review.deleteOne();
  await Review.recalculate(review.perfume);
  const perfume = await Perfume.findById(review.perfume);
  res.json({ success: true, id: req.params.id, perfume });
});
