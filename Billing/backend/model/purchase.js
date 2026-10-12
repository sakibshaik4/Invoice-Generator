const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: mongoose.Types.ObjectId, ref: "item" },
        qty: { type: Number },
      },
    ],
    netPrice: { type: Number },
    gst: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    vendor: { type: mongoose.Types.ObjectId, ref: "vendor-customer" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("purchase", purchaseSchema);
