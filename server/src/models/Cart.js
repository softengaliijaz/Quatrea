import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        perfume: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Perfume",
          required: true,
        },
        qty: { type: Number, required: true, min: 1, default: 1 },
      },
    ],
  },
  { timestamps: true },
);
export default mongoose.model("Cart", cartSchema);
