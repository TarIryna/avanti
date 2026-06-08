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
    type: Number,
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
    heel: Number,
    barcodes: {
      type: Map,
      of: String
    }, 
    sizes_all: {
      type: Map,
      of: [
        {
          size: String,
          q: Number,
        },
      ],
      default: {},
    }
  },
  { versionKey: false, timestamps: true, collection: "products" } // ← обязательно
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
