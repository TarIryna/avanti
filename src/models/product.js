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
    sizes: [
      {
        size: String,
        q: Number,
      }
    ],
    material: String,
    color: String,
    material_top: Number,
    material_inside: Number,
    type: String,
    small_image: String,
    vendor: Number,
    model: String,
    size_type: Number,
    facebook: String,
    style: Number,
    country: Number,
    rozetka_id: Number,
    description: String,
    images: [String],
    year: Number,
    heel: Number
  },
  { versionKey: false, timestamps: true, collection: "products" } // ← обязательно
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
