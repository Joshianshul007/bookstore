const mongoose = require("mongoose");
const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    status: {
      type: String,
      enum: ["Order Placed", "Out For Delivery", "Delivered", "Cancelled"],
      default: "Order Placed"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", order);