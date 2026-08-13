import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
  {
    company: { type: Number, required: true },
    rate: Number,
    currency: Number,
    amount: Number,
    amountUSD: Number,
    comment: String,
    date: Date,
    season: Number
  },
  { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
