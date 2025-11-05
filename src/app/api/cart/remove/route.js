import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";


export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const creator = searchParams.get("creator");

    if (!creator) {
      return NextResponse.json({ message: "creator is required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ creator, status: "new" });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = [];
    await cart.save();

    return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ message: "Failed to clear cart" }, { status: 500 });
  }
}

