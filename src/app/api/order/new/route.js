import Order from "@/models/order";
import Cart from "@/models/cart";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { delivery, items, userId } = await request.json();

  try {
    await connectToDB();

    // 1️⃣ Проверяем товары и пересчитываем сумму
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue; // можно выбросить ошибку, если товар не найден

      const itemTotal = product.price * (item.quantity || 1);
      total += itemTotal;

      validatedItems.push({
        product: product._id,
        size: item.size,
        quantity: item.quantity,
        price: product.price, // берем из БД, а не с клиента
        image: !!product.small_image ? product.small_image : product?.image1 ?? product?.image2,
      });
    }

    // 2️⃣ Создаем заказ с безопасными данными
    const newOrder = new Order({
      creator: userId,
      items: validatedItems,
      status: "new",
      delivery,
      totalPrice: total,
    });

    await newOrder.save();

    // 3️⃣ Чистим корзину пользователя
    await Cart.deleteMany({ creator: userId });

    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    console.error("POST /api/order/new error:", error);
    return new Response("Failed to create a new order", { status: 500 });
  }
};


// ======================
// PATCH /api/order/new
// ======================
export const PATCH = async (request) => {
  const { date, status, id, delivery } = await request.json();
  const isDelivery =
    delivery?.cityDescription?.length > 0 &&
    delivery?.addressDescription?.length > 0;

  try {
    await connectToDB();

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return new Response("Order not found", { status: 404 });
    }

    existingOrder.date = date;
    existingOrder.status = status;
    if (isDelivery) {
      existingOrder.delivery = delivery;
    }

    await existingOrder.save();

    return new Response("Successfully updated the order", { status: 200 });
  } catch (error) {
    console.error("PATCH /api/order/new error:", error);
    return new Response("Error Updating Order", { status: 500 });
  }
};