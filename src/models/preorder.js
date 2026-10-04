import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  productCode: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  total: Number,
});

const PreorderSchema = new Schema(
  {
    company: { type: Number, required: true },
    items: [ItemSchema],
    rate: Number ,
    currency: Number,
    total: Number,
    totalUSD: Number,
    comment: String,
    number: String,
    date: Date,
    season: Number
  },
  { timestamps: true }
);

const Preorder = models.Preorder || model("Preorder", PreorderSchema);

export default Preorder;
