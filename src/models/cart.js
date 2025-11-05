import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  image: { type: String },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  code: { type: Number }
});

const CartSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [ItemSchema],
    status: { type: String, default: "new" },
    delivery: { type: Object, default: {} },
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
