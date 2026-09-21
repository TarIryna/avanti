import { Schema, model, models } from "mongoose";

const SpendingSchema = new Schema(
  {
    amount: Number,
    staff: Number,
    comment: String,
    type: Number,
    shop: Number
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Spending = models.Spending || model("Spending", SpendingSchema);
export default Spending;