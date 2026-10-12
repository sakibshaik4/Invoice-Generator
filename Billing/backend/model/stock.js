const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Types.ObjectId, ref: "item" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    vendor: { type: mongoose.Types.ObjectId, ref: "vendor-customer" },
    qty: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stock", stockSchema);
