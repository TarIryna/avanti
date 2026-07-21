import { Schema, model, models } from "mongoose";

const RateSchema = new Schema(
  {
    rate: {
      type: Number,
        },
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Rate = models.Rate || model("Rate", RateSchema);
export default Rate;
