const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    price: { type: Number },
    priceUnit: { type: String, enum: ["grm", "kg", "ltr", "piece"] },
    vendor: { type: mongoose.Types.ObjectId, ref: "vendor-customer" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("item", itemSchema);
