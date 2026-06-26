import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    accountNumber: String,
    adhaarNum: String,
    address: String,
    isActive: { type: Boolean, default: true },

    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

const CustomerDetailSchema = new mongoose.Schema({});
