import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  productCode: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  sizes: [
      {
        size: { type: String },
        q: { type: Number }
      }
    ],
  total: Number,
});

const InvoiceSchema = new Schema(
  {
    company: { type: Number, required: true },
    items: [ItemSchema],
    rate: Number ,
    currency: Number,
    total: Number,
    totalUSD: Number,
    totalQuantity: Number,
    comment: String,
    number: String,
    date: Date,
    season: Number
  },
  { timestamps: true }
);

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);

export default Invoice;
