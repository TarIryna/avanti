import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Order from "@/models/order";

export async function GET(req) {
  try {
    await connectToDB();

    // userId берём из query-параметра
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { items: [] },
        { status: 400, statusText: "userId is required" }
      );
    }

    // ищем корзину только текущего пользователя
    const cart = await Order.find({
      creator: userId,
      status: "new",
    }).populate("product"); // если нужно подтянуть данные о товаре

    return NextResponse.json({ items: cart }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

// POST /api/cart (добавить товар)
export async function POST(req) {
  try {
    const body = await req.json();
    if (body?.item) {
      cart.items.push(body.item);
    }
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json(
      { message: "Failed to add item" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart (очистить корзину)
export async function DELETE() {
  try {
    cart.items = [];
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/cart:", error);
    return NextResponse.json(
      { message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
