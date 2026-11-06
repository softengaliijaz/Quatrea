import mongoose from 'mongoose';
import Perfume from './Perfume.js';

const reviewSchema = new mongoose.Schema(
  {
    perfume: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfume', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 800 },
  },
  { timestamps: true }
);
reviewSchema.index({ perfume: 1, user: 1 }, { unique: true });

reviewSchema.statics.recalculate = async function (perfumeId) {
  const [stats] = await this.aggregate([
    { $match: { perfume: new mongoose.Types.ObjectId(perfumeId) } },
    { $group: { _id: '$perfume', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  await Perfume.findByIdAndUpdate(perfumeId, {
    ratingAvg: stats ? Math.round(stats.avg * 10) / 10 : 0,
    ratingCount: stats ? stats.count : 0,
  });
};

export default mongoose.model('Review', reviewSchema);
