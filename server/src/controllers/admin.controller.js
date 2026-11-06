import User from "../models/User.js";
import Order from "../models/Order.js";
import Perfume from "../models/Perfume.js";
import Message from "../models/Message.js";
import Subscriber from "../models/Subscriber.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const [
    users,
    perfumes,
    orders,
    unread,
    subscribers,
    revenueAgg,
    byStatus,
    lowStock,
  ] = await Promise.all([
    User.countDocuments(),
    Perfume.countDocuments(),
    Order.countDocuments(),
    Message.countDocuments({ read: false }),
    Subscriber.countDocuments(),
    Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Perfume.find({ stock: { $lte: 10 } }).select("name stock season"),
  ]);
  res.json({
    success: true,
    stats: {
      users,
      perfumes,
      orders,
      unreadMessages: unread,
      subscribers,
      revenue: revenueAgg[0]?.total || 0,
      ordersByStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.count])),
      lowStock,
    },
  });
});
