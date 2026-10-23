import { Schema, model, models } from "mongoose";

const LabelSchema = new Schema(
  {
    code: String
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Label = models.Label || model("Label", LabelSchema);
export default Label;
