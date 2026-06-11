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
        },
    image: {
          type: String,
          required: [true, "Image is required!"],
        },
    size: {
          type: Object
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
    comment: {
      type: String
    },

    operationId: {
      type: String
    },
    type: {
      type: String,
      enum: ["sale", "return", "arrival", "decrease", "inside"],
      default: "sale"
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

const Operation = models.Operation || model("Operation", OperationSchema);
export default Operation;
