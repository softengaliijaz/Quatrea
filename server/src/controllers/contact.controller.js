import Message from '../models/Message.js';
import Subscriber from '../models/Subscriber.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/contact
export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  await Message.create({ name, email, subject, message });
  res.status(201).json({ success: true, message: 'Thank you. We will reply within two working days.' });
});

// GET /api/contact (admin)
export const listMessages = asyncHandler(async (req, res) => {
  res.json({ success: true, items: await Message.find().sort('-createdAt') });
});

// PATCH /api/contact/:id/read (admin)
export const markRead = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!msg) throw new ApiError(404, 'Message not found');
  res.json({ success: true, message: msg });
});

// DELETE /api/contact/:id (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) throw new ApiError(404, 'Message not found');
  res.json({ success: true, id: req.params.id });
});

// POST /api/newsletter/subscribe
export const subscribe = asyncHandler(async (req, res) => {
  if (await Subscriber.exists({ email: req.body.email })) return res.json({ success: true, message: 'You are already on the list.' });
  await Subscriber.create({ email: req.body.email });
  res.status(201).json({ success: true, message: 'Welcome to the house of Quatréa.' });
});

// POST /api/newsletter/unsubscribe
export const unsubscribe = asyncHandler(async (req, res) => {
  await Subscriber.deleteOne({ email: req.body.email });
  res.json({ success: true, message: 'You have been unsubscribed.' });
});

// GET /api/newsletter (admin)
export const listSubscribers = asyncHandler(async (req, res) => {
  res.json({ success: true, items: await Subscriber.find().sort('-createdAt') });
});
