import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";
import Product from "@/models/product";

export async function PATCH(req) {
  try {
    await connectToDB();
    const { creator, productId, size } = await req.json();

    if (!creator || !productId) {
      return NextResponse.json({ message: "creator and productId are required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ creator, status: "new" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId && item.size.toString() !== size);
    await cart.save();

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/cart/remove-item error:", error);
    return NextResponse.json({ message: "Failed to remove item" }, { status: 500 });
  }
}
