const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, default: "Pending" },
  totalPrice: { type: Number },
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
