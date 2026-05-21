import { Schema, model, models } from "mongoose";

const OperationSchema = new Schema(
  {
    clientPhone: {
      type: String,
      default: null
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required!"],
        },
    salePrice: {
      type: Number,
      required: [true, "Price is required!"],
        },
    image: {
          type: String,
          required: [true, "Image is required!"],
        },
    size: {
          type: String
        },
    code: {
        type: Number,
        },
    quantity: {
          type: Number,
          default: 1,
        },
    terminal: {
      type: Number,
      default: 0
    },

    operationId: {
      type: String
    },
    type: {
      type: String,
      enum: ["sale", "return"],
      default: "sale"
    }
  },
  {
    timestamps: true, // ✅ это нужно ставить здесь, во втором аргументе
  }
);

const Operation = models.Operation || model("Operation", OperationSchema);
export default Operation;
