import { Schema, model, models } from "mongoose";

const BarcodesSchema = new Schema(
  {
    code: String,
    amount: Number,
    shop: Number
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Barcodes = models.Barcodes || model("Barcodes", BarcodesSchema);
export default Barcodes;
