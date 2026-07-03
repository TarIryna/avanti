import { Schema, model, models } from "mongoose";

const PriceSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required!"],
        },
    firstPrice: {
      type: Number,
        },
    secondPrice: {
          type: Number,
        },
    newPrice: {
          type: Number,
          required: [true, "Image is required!"],
        },
    code: {
        type: Number,
        },
    shop: {
      type: Number
    },
    staff: {
      type: Number
    }
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Price = models.Price || model("Price", PriceSchema);
export default Price;
