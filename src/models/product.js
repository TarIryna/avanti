import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      unique: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: Number,
      required: [true, "gender is required"],
    },
    view: String,
    season: {
      type: Number
    },
    quantity: Number,
    price: {
      type: Number,
    },
    price2: Number,
    pop: Number,
    res: Number,
    sizes: [
      {
        size: String,
        q: Number,
      }
    ],
    material: Number,
    sizesGroup: Number,
    color: Number,
    material_top: Number,
    material_inside: Number,
    type: Number,
    small_image: String,
    vendor: Number,
    model: String,
    size_type: Number,
    facebook: Number,
    style: Number,
    country: Number,
    rozetka_id: Number,
    description: String,
    images: [String],
    video: String,
    year: Number,
    heel: Number,
    totalCount: Number,
    totalGot: Number,
    priceOrder: {
      price: {
        type: Number,
      },
      currency: {
        type: Number,
      },
    },
    company: Number,
    total: {
    type: [
      {
        shop: Number,
        q: Number,
      },
    ],
      default: [], // Для массивов дефолтное значение лучше делать пустой массив
    },
    barcodes: {
      type: [String],
    }, 
   sizes_all: {
    type: Object,
    default: {},
  },
  },
  { versionKey: false, timestamps: true, collection: "products" } // ← обязательно
);

// Keep per-shop totals in sync for every document save that changes stock.
ProductSchema.pre("validate", function () {
  if (!this.isModified("sizes_all")) return;

  this.total = Object.entries(this.sizes_all || {}).map(([shop, sizes]) => ({
    shop: Number(shop),
    q: (Array.isArray(sizes) ? sizes : []).reduce((sum, item) => {
      const quantity = Number(item.q);
      return sum + (Number.isFinite(quantity) ? quantity : 0);
    }, 0),
  }));
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
