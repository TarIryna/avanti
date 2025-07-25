import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    view: {
      type: String,
    },
    season: {
      type: String,
      required: [true, "season is required"],
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    price2: {
      type: Number,
    },
    sizes: {
      type: String,
    },
    material: {
      type: String,
    },
    color: {
      type: String,
    },
    material_top: {
      type: String,
    },
    material_inside: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
