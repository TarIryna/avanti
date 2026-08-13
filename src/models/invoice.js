import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const InvoiceSchema = new Schema(
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

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);

export default Invoice;
