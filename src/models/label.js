import { Schema, model, models } from "mongoose";

const LabelSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required!"],
        },
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Label = models.Label || model("Label", LabelSchema);
export default Label;
