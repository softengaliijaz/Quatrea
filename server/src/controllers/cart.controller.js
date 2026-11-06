import Cart from "../models/Cart.js";
import Perfume from "../models/Perfume.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const POPULATE = {
  path: "items.perfume",
  select: "name slug price season accent stock sizeMl",
};
const loadCart = async (userId) => {
  const cart =
    (await Cart.findOne({ user: userId })) ||
    (await Cart.create({ user: userId, items: [] }));
  return cart;
};
const respond = async (cart, res, status = 200) => {
  await cart.populate(POPULATE);
  cart.items = cart.items.filter((i) => i.perfume);
  res.status(status).json({ success: true, cart });
};

// GET /api/cart
export const getCart = asyncHandler(async (req, res) =>
  respond(await loadCart(req.user._id), res),
);

// POST /api/cart
export const addToCart = asyncHandler(async (req, res) => {
  const { perfumeId, qty = 1 } = req.body;
  const perfume = await Perfume.findById(perfumeId);
  if (!perfume) throw new ApiError(404, "Perfume not found");
  if (perfume.stock < 1)
    throw new ApiError(400, `${perfume.name} is out of stock`);
  const cart = await loadCart(req.user._id);
  const line = cart.items.find((i) => String(i.perfume) === String(perfumeId));
  if (line) line.qty = Math.min(perfume.stock, 10, line.qty + Number(qty));
  else
    cart.items.push({
      perfume: perfumeId,
      qty: Math.min(perfume.stock, Number(qty)),
    });
  await cart.save();
  await respond(cart, res, 201);
});

// PUT /api/cart/:perfumeId
export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await loadCart(req.user._id);
  const line = cart.items.find(
    (i) => String(i.perfume) === req.params.perfumeId,
  );
  if (!line) throw new ApiError(404, "Item is not in your cart");
  const perfume = await Perfume.findById(req.params.perfumeId);
  line.qty = Math.min(Number(req.body.qty), perfume ? perfume.stock : 1);
  await cart.save();
  await respond(cart, res);
});

// DELETE /api/cart/:perfumeId
export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await loadCart(req.user._id);
  cart.items = cart.items.filter(
    (i) => String(i.perfume) !== req.params.perfumeId,
  );
  await cart.save();
  await respond(cart, res);
});

// DELETE /api/cart
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await loadCart(req.user._id);
  cart.items = [];
  await cart.save();
  await respond(cart, res);
});
