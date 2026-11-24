import { Schema, model, models } from "mongoose";
import { PAYMENT_METHODS, PAYMENT_STATUSES } from "@/constants/payment";

const PaymentSchema = new Schema(
  {
    method: { type: String, enum: Object.values(PAYMENT_METHODS), required: true },
    status: { type: String, enum: PAYMENT_STATUSES, default: "unpaid" },
    currency: { type: String, default: "UAH" },
    sandbox: Boolean,
    amount: { type: Number, min: 0 },
    providerOrderId: String,
    providerPaymentId: String,
    providerStatus: String,
    paidAt: Date,
  },
  { _id: false }
);

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
          size: String,
          q: Number
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

    payment: PaymentSchema,

    delivery: {
      type: Object,
      default: {},
    },
    deliveryStatus: {
      type: String,
    },
    ttn: {
       type: Object,
       default: {},
    },
    check: {
      type: String,
    }
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
