import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    ref: "Product",
    type: Schema.Types.ObjectId,
    required: [true, "Product is required!"],
  },
  price: {
    type: Number,
    required: [true, "Product is required!"],
  },
  image: {
    type: String,
  },
  size: {
    type: String,
    required: [true, "Size is required!"],
  },
  quantity: {
    type: Number,
    required: [true],
    default: 1,
  },
  status: {
    type: String,
    required: [true],
    default: "new",
  },
  date: {
    type: Date,
    required: [true],
    default: new Date(),
  },
  orderId: {
    type: Number,
    required: [false],
  },
  delivery: {
    type: Object,
    default: {},
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
