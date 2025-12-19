import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";
import Product from "@/models/product";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

// ========================
// POST /api/cart/add
// Добавление одного товара
// ========================
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { creator, product, price, image, size, quantity, code } = body;
    console.log('creator', creator)

  

    if (!creator || !product || !size || !price) {
      return NextResponse.json(
        { message: "creator, product, size and price are required" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ creator, status: "new" });

    // если корзины нет, создаём новую
    if (!cart) {
      cart = new Cart({ creator, items: [] });
    }

    // на всякий случай проверяем, что items — массив
    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const existingIndex = cart.items.findIndex(
      (i) => i.product.toString() === product && i.size === size
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product, price, image, size, code, quantity: quantity || 1 });
    }

    await cart.save();
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart/add error:", error);
    return NextResponse.json({ message: "Failed to add item" }, { status: 500 });
  }
}
