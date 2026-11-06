import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perfume",
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Compare passwords
userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Return public user data
userSchema.methods.toPublic = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    phone: this.phone,
    wishlist: this.wishlist.map((w) => String(w._id || w)),
    createdAt: this.createdAt,
  };
};

export default mongoose.model("User", userSchema);
