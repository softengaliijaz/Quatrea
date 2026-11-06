import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Perfume from '../models/Perfume.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/orders  (creates an order from the signed-in user's cart)
export const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.perfume');
  const lines = (cart?.items || []).filter((i) => i.perfume);
  if (!lines.length) throw new ApiError(400, 'Your cart is empty');
  for (const l of lines) {
    if (l.perfume.stock < l.qty) throw new ApiError(400, `Only ${l.perfume.stock} of ${l.perfume.name} left in stock`);
  }
  const items = lines.map((l) => ({ perfume: l.perfume._id, name: l.perfume.name, season: l.perfume.season, price: l.perfume.price, qty: l.qty }));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const paymentMethod = req.body.paymentMethod || 'cod';
  const order = await Order.create({
    user: req.user._id, items, total, shipping: req.body.shipping, paymentMethod,
    status: paymentMethod === 'card' ? 'paid' : 'pending', // card payment is simulated in this demo
  });
  await Perfume.bulkWrite(lines.map((l) => ({ updateOne: { filter: { _id: l.perfume._id }, update: { $inc: { stock: -l.qty } } } })));
  cart.items = [];
  await cart.save();
  res.status(201).json({ success: true, order });
});

// GET /api/orders/mine
export const myOrders = asyncHandler(async (req, res) => {
  const items = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json({ success: true, items });
});

// GET /api/orders/:id  (owner or admin)
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found');
  const ownerId = String(order.user._id || order.user);
  if (ownerId !== String(req.user._id) && req.user.role !== 'admin') throw new ApiError(403, 'You cannot view this order');
  res.json({ success: true, order });
});

// PATCH /api/orders/:id/cancel  (owner, pending only)
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) throw new ApiError(404, 'Order not found');
  if (!['pending', 'paid'].includes(order.status)) throw new ApiError(400, 'This order can no longer be cancelled');
  order.status = 'cancelled';
  await order.save();
  await Perfume.bulkWrite(order.items.map((i) => ({ updateOne: { filter: { _id: i.perfume }, update: { $inc: { stock: i.qty } } } })));
  res.json({ success: true, order });
});

// GET /api/orders  (admin)
export const listOrders = asyncHandler(async (req, res) => {
  const items = await Order.find().populate('user', 'name email').sort('-createdAt');
  res.json({ success: true, items });
});

// PATCH /api/orders/:id/status  (admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found');
  res.json({ success: true, order });
});
