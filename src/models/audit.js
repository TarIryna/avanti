import { Schema, model, models } from "mongoose";

const AuditSchema = new Schema(
  {
    barcode: {
      type: String
    },
    count: {
        type: Number
    },
    shop: {
      type: Number
    },
    place: {
      type: String
    }
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Audit = models.Audit || model("Audit", AuditSchema);
export default Audit;
