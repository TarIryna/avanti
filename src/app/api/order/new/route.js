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

    // 1️⃣ Если userId нет → создаём гостевого пользователя
    let createdGuest = false;
    if (!userId) {
      const existingUser = await User.findOne({ $or: [{ email: delivery.email }] });
      if (existingUser) {
        userId = existingUser._id;
      } else {
        const guestEmail = `guest_${Date.now()}@avanti.local`;
        const newGuest = await User.create({
          email: guestEmail,
          username: guestEmail,
          name: delivery.name || "Guest",
          surname: delivery.surname || "",
          phone: delivery.phone || "",
          password: "",
          isGuest: true,
        });
        userId = newGuest._id;
        createdGuest = true;
      }
    }

    // 2️⃣ Проверяем товары, пересчитываем сумму и обновляем остатки на складе
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;

      const productId = typeof item.product === "string" ? item.product : item.product?._id;
      const image = item.image || item?.product?.small_image || item?.product?.images?.[0] || "no image";
      const code = item.code || item?.product?.code;

      // Извлекаем строковое значение размера (например, "38")
      const sizeValue = typeof item.size === "object" ? item.size?.size : item.size;
      const quantityToSubtract = item.quantity || 1;

      validatedItems.push({
        product: productId,
        size: item.size,
        quantity: quantityToSubtract,
        price: item.price,
        code,
        image,
      });

      // Списываем количество купленного размера в модели Product
      if (productId && sizeValue) {
        await Product.updateOne(
          { _id: productId, "sizes.size": sizeValue },
          { $inc: { "sizes.$.q": -quantityToSubtract } }
        );
      }
    }

    // 3️⃣ Создаём заказ с валидированными данными
    const newOrder = await Order.create({
      creator: userId,
      items: validatedItems,
      status: "new",
      delivery,
      totalPrice: total,
    });

    // 4️⃣ Чистим корзину (если пользователь был авторизован)
    if (userId) {
      await Cart.deleteMany({ creator: userId });
    }

    // 5️⃣ Отправка уведомления в Telegram
    const text =
      `🛒 Нове замовлення!\n` +
      `👤 Клієнт: ${delivery.surname} ${delivery.name}, тел: ${delivery.phone}\n` +
      `Реквізити: ${delivery.cityDescription}, ${delivery.addressDescription}\n` +
      `📦 Товари: всього ${validatedItems.length}:\n` +
      validatedItems
        .map(
          (item) =>
            `код: ${item.code} розмір: ${item.size?.size ?? item.size} кількість: ${item.quantity} ціна: ${item.price} акційна ціна: ${Math.ceil(item.price)}`
        )
        .join("\n");

    await sendTelegramMessage(text);

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
