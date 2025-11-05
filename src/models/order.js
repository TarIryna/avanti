import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required!"],
        },
        price: {
          type: Number,
          required: [true, "Price is required!"],
        },
        image: {
          type: String,
          required: [true, "Image is required!"],
        },
        size: {
          type: String,
          required: [true, "Size is required!"],
        },
         code: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    status: {
      type: String,
      default: "new",
      required: [true, "Status is required!"],
    },
     totalPrice: { type: Number, default: 0 }, 

    orderId: String,

    delivery: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
