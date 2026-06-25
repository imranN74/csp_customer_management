import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "User",
      enum: ["User", "Admin"],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
