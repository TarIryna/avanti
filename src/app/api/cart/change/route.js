import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Cart from "@/models/cart";

// ========================
// POST /api/cart/change
// Замена количества товара
// ========================
export async function PUT(req) {
  try {
    await connectToDB();

    const body = await req.json();

    const { creator, product, price, image, size, quantity, code } = body;


    if (!creator || !product || !size || typeof quantity !== "number") {
      return NextResponse.json(
        { message: "creator, product, size and quantity are required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ creator, status: "new" });

    if (!cart || !Array.isArray(cart.items)) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

const existingIndex = cart.items.findIndex(
  (i) =>
    i.code === Number(code) &&
    String(i.size).trim() === String(size).trim()
);

    if (existingIndex === -1) {
      return NextResponse.json(
        { message: "Item not found in cart" },
        { status: 404 }
      );
    }

    // 🔥 ГЛАВНОЕ ИЗМЕНЕНИЕ — заменяем количество
    cart.items[existingIndex] = {
      ...cart.items[existingIndex],
      product: cart.items[existingIndex].product, // или убедиться, что это ObjectId
      size: cart.items[existingIndex].size,
      quantity,
      price: price ?? cart.items[existingIndex].price,
      image: image ?? cart.items[existingIndex].image,
      code: code ?? cart.items[existingIndex].code,
    };
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("POST /api/cart/change error:", error);
    return NextResponse.json(
      { message: "Failed to change item quantity" },
      { status: 500 }
    );
  }
}
