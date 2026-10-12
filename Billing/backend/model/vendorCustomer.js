const mongoose = require("mongoose");

const vendorCustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    gst: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    userType: {
      type: String,
      enum: ["vendor", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vendor-customer", vendorCustomerSchema);
