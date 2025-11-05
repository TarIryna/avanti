import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";
import Product from "@/models/product";

// ========================
// GET /api/cart?userId=...
// ========================
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ items: [] }, { status: 400 });

    const cart = await Cart.findOne({ creator: userId, status: "new" })
  .populate({ path: "items.product", strictPopulate: false });

    return NextResponse.json({ items: cart ? cart.items : [] }, { status: 200 });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

// ========================
// POST /api/cart/add
// Добавление одного товара
// ========================
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { creator, product, price, image, size, quantity, code } = body;

    if (!creator || !product || !size || !price)
      return NextResponse.json({ message: "creator, product, size and price are required" }, { status: 400 });

    let cart = await Cart.findOne({ creator, status: "new" });
    if (!cart) cart = new Cart({ creator, items: [] });

    const existingIndex = cart.items.findIndex(
      (i) => i.product.toString() === product && i.size === size
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product, price, image, size, quantity: quantity || 1, code });
    }

    await cart.save();
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart/add error:", error);
    return NextResponse.json({ message: "Failed to add item" }, { status: 500 });
  }
}

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

// ========================
// POST /api/cart/remove
// Удаление одного товара по product + size
// ========================
export async function REMOVE(req) {
  try {
    await connectToDB();
    const { creator, product, size } = await req.json();

    if (!creator || !product || !size)
      return NextResponse.json({ message: "creator, product and size are required" }, { status: 400 });

    const cart = await Cart.findOne({ creator, status: "new" });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === product && item.size === size)
    );

    await cart.save();
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("POST /api/cart/remove error:", error);
    return NextResponse.json({ message: "Failed to remove item" }, { status: 500 });
  }
}

// ========================
// DELETE /api/cart?userId=...
// Очистка корзины
// ========================
export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ message: "userId is required" }, { status: 400 });

    const cart = await Cart.findOne({ creator: userId, status: "new" });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    cart.items = [];
    await cart.save();

    return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ message: "Failed to clear cart" }, { status: 500 });
  }
}
