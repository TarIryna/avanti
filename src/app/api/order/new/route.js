import Order from "@/models/order";
import Cart from "@/models/cart";
import Product from "@/models/product";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendTelegramMessage } from "@/fetchActions/orders/sendTelegramMessage";

export const POST = async (request) => {
  let { delivery, items, userId } = await request.json();

  try {
    await connectToDB();

    // -----------------------------------------------------
    // 1️⃣ Если userId нет → создаём гостевого пользователя
    // -----------------------------------------------------
    let createdGuest = false;

    if (!userId) {
      const guestEmail = `guest_${Date.now()}@avanti.local`;

      const newGuest = await User.create({
        email: guestEmail,
        username: guestEmail,
        name: "Guest",
        password: "",
        isGuest: true,
      });

      userId = newGuest._id;
      createdGuest = true;
    }

    // -----------------------------------------------------
    // 2️⃣ Проверяем товары и пересчитываем сумму
    // -----------------------------------------------------
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;

      const image = item?.product?.small_image || item?.product.images[0] || "no image"

      validatedItems.push({
        product: item?.product._id,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        code: item?.product.code,
        image,
      });
    }

    // -----------------------------------------------------
    // 3️⃣ Создаём заказ с валидированными данными
    // -----------------------------------------------------
    const newOrder = await Order.create({
      creator: userId,
      items: validatedItems,
      status: "new",
      delivery,
      totalPrice: total,
    });

    // -----------------------------------------------------
    // 4️⃣ Чистим корзину (если пользователь был авторизован)
    // -----------------------------------------------------
    if (!createdGuest) {
      await Cart.deleteMany({ creator: userId });
    }

    const text =
      `🛒 Нове замовлення!\n` +
      `👤 Клієнт: ${delivery.surname} ${delivery.name}, тел: ${delivery.phone}\n` +
      `Реквізити: ${delivery.cityDescription}, ${delivery.addressDescription}\n` +
      `📦 Товари: всього ${validatedItems.length}:\n` +
      validatedItems
        .map(
          item =>
            `код: ${item.code} розмір: ${item.size?.size ?? item.size} кількість: ${item.quantity} ціна: ${item.price} акційна ціна: ${Math.ceil(item.price)}`
        )
        .join("\n");

    const resTelegram =  await sendTelegramMessage(text);

    return new Response(
      JSON.stringify({
        order: newOrder,
        userId,
        isGuest: createdGuest,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/order/new error:", error);
    return new Response("Failed to create a new order", { status: 500 });
  }
};



// ======================
// PATCH /api/order/new
// ======================
// export const PATCH = async (request) => {
//   const { date, status, id, delivery } = await request.json();
//   const isDelivery =
//     delivery?.cityDescription?.length > 0 &&
//     delivery?.addressDescription?.length > 0;

//   try {
//     await connectToDB();

//     const existingOrder = await Order.findById(id);
//     if (!existingOrder) {
//       return new Response("Order not found", { status: 404 });
//     }

//     existingOrder.date = date;
//     existingOrder.status = status;
//     if (isDelivery) {
//       existingOrder.delivery = delivery;
//     }

//     await existingOrder.save();

//     return new Response("Successfully updated the order", { status: 200 });
//   } catch (error) {
//     console.error("PATCH /api/order/new error:", error);
//     return new Response("Error Updating Order", { status: 500 });
//   }
// };