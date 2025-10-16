import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
import Product from "@/models/product";

// POST /api/cart/add-many
export async function POST(req) {
  try {
    await connectToDB();

    const { items, userId } = await req.json();
    console.log("items in api add-many", items, "user id", userId);

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // добавляем каждый товар
    const newOrders = [];

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        console.warn("Product not found:", item.id);
        continue; // пропускаем или выбрасываем ошибку
      }

      const order = await Order.create({
        creator: userId,
        product: product._id, // гарантируем правильный ObjectId
        price: item.price,
        image: item.image || "",
        size: item.size,
        quantity: item.quantity || 1,
        status: "new",
      });

      newOrders.push(order);
    }

    return NextResponse.json(
      { success: true, items: newOrders },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/cart/add-many:", error);
    return NextResponse.json({ error: "Failed to add items" }, { status: 500 });
  }
}
