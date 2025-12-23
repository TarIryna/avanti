import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
      type: Number,
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
    view: String,
    season: {
      type: String,
      required: [true, "season is required"],
    },
    quantity: Number,
    price: {
      type: Number,
      required: true,
    },
    price2: Number,
    sizes: String,
    material: String,
    color: String,
    material_top: String,
    material_inside: String,
    type: String,
    small_image: String
  },
  { versionKey: false, timestamps: true, collection: "products" } // ← обязательно
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
