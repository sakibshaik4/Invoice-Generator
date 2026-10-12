const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String },
    address: { type: String },
    companyContact: { type: String },
    phone: { type: String },
    gst: { type: String },
    companyEmail: { type: String },
    gstRate: { type: Number },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
