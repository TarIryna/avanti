import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";
import Product from "@/models/product";

// ========================
// POST /api/cart/add-many
// Добавление нескольких товаров сразу
// ========================
export async function ADD_MANY(req) {
  try {
    await connectToDB();
    const { items, userId } = await req.json();

    if (!Array.isArray(items) || items.length === 0)
      return NextResponse.json({ error: "No items provided" }, { status: 400 });

    let cart = await Cart.findOne({ creator: userId, status: "new" });
    if (!cart) cart = new Cart({ creator: userId, items: [] });

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) continue;

      const existingIndex = cart.items.findIndex(
        (i) => i.product.toString() === product._id.toString() && i.size === item.size
      );

      if (existingIndex >= 0) {
        cart.items[existingIndex].quantity += item.quantity || 1;
      } else {
        cart.items.push({
          product: product._id,
          price: item.price,
          image: item.image || "",
          size: item.size,
          code: item.code,
          quantity: item.quantity || 1,
        });
      }
    }

    await cart.save();
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart/add-many error:", error);
    return NextResponse.json({ error: "Failed to add items" }, { status: 500 });
  }
}