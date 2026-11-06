import mongoose from "mongoose";
import slugify from "../utils/slugify.js";

const perfumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    season: {
      type: String,
      enum: ["spring", "summer", "autumn", "winter"],
      required: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    notes: {
      top: [String],
      heart: [String],
      base: [String],
    },
    mood: {
      type: String,
      default: "",
    },
    accent: {
      type: String,
      default: "#7c6bc4",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sizeMl: {
      type: Number,
      default: 50,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Generate slug before validation
perfumeSchema.pre("validate", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
});

export default mongoose.model("Perfume", perfumeSchema);
