import { Schema, model, models } from "mongoose";

const SpendingSchema = new Schema(
  {
    amount: Number,
    hours: {
      type: Number,
      min: 1,
      max: 24,
      validate: { validator: Number.isInteger, message: 'Hours must be a whole number' },
    },
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
