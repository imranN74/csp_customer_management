import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: String,
    email: String,
    accountNumber: { type: String, unique: true, sparse: true },
    cifNumber: { type: String },
    adhaarNum: { type: String, unique: true, sparse: true },
    dob: Date,
    age: Number,
    address: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const CustomerDetailSchema = new mongoose.Schema(
  {
    accountOpenDate: Date,
    passbookRcvDate: Date,
    pmsby: Boolean,
    pmjjby: Boolean,
    apy: Boolean,
    profileImageUrl: String,
    signatureImageUrl: String,
    remarks: String,
    isActive: { type: Boolean, default: true },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Customer = mongoose.model("Customer", CustomerSchema);
const CustomerDetail = mongoose.model("CustomerDetail", CustomerDetailSchema);

export { Customer, CustomerDetail };
