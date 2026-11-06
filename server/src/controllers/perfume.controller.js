import Perfume from "../models/Perfume.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const SORTS = {
  "price-asc": "price",
  "price-desc": "-price",
  rating: "-ratingAvg",
  newest: "-createdAt",
  seasons: "createdAt",
};

// GET /api/perfumes
export const listPerfumes = asyncHandler(async (req, res) => {
  const {
    season,
    search,
    sort = "seasons",
    minPrice,
    maxPrice,
    featured,
    page = 1,
    limit = 12,
  } = req.query;
  const filter = {};
  if (season) filter.season = season;
  if (featured === "true") filter.featured = true;
  if (minPrice || maxPrice)
    filter.price = {
      ...(minPrice && { $gte: +minPrice }),
      ...(maxPrice && { $lte: +maxPrice }),
    };
  if (search) {
    const rx = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { name: rx },
      { tagline: rx },
      { "notes.top": rx },
      { "notes.heart": rx },
      { "notes.base": rx },
    ];
  }
  const p = Math.max(1, +page);
  const l = Math.min(50, Math.max(1, +limit));
  const [items, total] = await Promise.all([
    Perfume.find(filter)
      .sort(SORTS[sort] || "createdAt")
      .skip((p - 1) * l)
      .limit(l),
    Perfume.countDocuments(filter),
  ]);
  res.json({
    success: true,
    items,
    total,
    page: p,
    pages: Math.ceil(total / l),
  });
});

// GET /api/perfumes/:slug
export const getPerfume = asyncHandler(async (req, res) => {
  const perfume = await Perfume.findOne({ slug: req.params.slug });
  if (!perfume) throw new ApiError(404, "Perfume not found");
  res.json({ success: true, perfume });
});

// POST /api/perfumes (admin)
export const createPerfume = asyncHandler(async (req, res) => {
  const perfume = await Perfume.create(req.body);
  res.status(201).json({ success: true, perfume });
});

// PUT /api/perfumes/:id (admin)
export const updatePerfume = asyncHandler(async (req, res) => {
  const perfume = await Perfume.findById(req.params.id);
  if (!perfume) throw new ApiError(404, "Perfume not found");
  const { ratingAvg, ratingCount, slug, ...changes } = req.body;
  perfume.set(changes);
  await perfume.save();
  res.json({ success: true, perfume });
});

// DELETE /api/perfumes/:id (admin)
export const deletePerfume = asyncHandler(async (req, res) => {
  const perfume = await Perfume.findByIdAndDelete(req.params.id);
  if (!perfume) throw new ApiError(404, "Perfume not found");
  res.json({ success: true, id: req.params.id });
});
