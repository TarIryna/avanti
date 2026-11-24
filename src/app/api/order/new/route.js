import Order from "@/models/order";
import Cart from "@/models/cart";
import Product from "@/models/product";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendTelegramMessage } from "@/fetchActions/orders/sendTelegramMessage";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from "@/constants/payment";
import { randomUUID } from "node:crypto";
import { createLiqPayCheckout, getLiqPayKeys } from "@/utils/liqpay";

export const POST = async (request) => {
  let { delivery, items, userId, paymentMethod = PAYMENT_METHODS.MANAGER } = await request.json();
  if (!Object.values(PAYMENT_METHODS).includes(paymentMethod)) {
    return new Response("Невідомий спосіб оплати", { status: 400 });
  }
  const isLiqPay = paymentMethod === PAYMENT_METHODS.LIQPAY;
  const liqPayKeys = isLiqPay ? getLiqPayKeys() : null;
  if (isLiqPay && (!liqPayKeys || (!liqPayKeys.sandbox && !process.env.LIQPAY_SITE_URL))) {
    return new Response("Оплата LiqPay недоступна", { status: 503 });
  }
  if (isLiqPay && (!Array.isArray(items) || items.length === 0)) {
    return new Response("Кошик порожній", { status: 400 });
  }

  try {
    await connectToDB();

    if (isLiqPay) {
      const pricedItems = [];
      let totalInKopiykas = 0;
      for (const item of items) {
        const productId = typeof item.product === "string" ? item.product : item.product?._id;
        const quantity = item.quantity ?? 1;
        if (!/^[a-f\d]{24}$/i.test(productId) || !Number.isSafeInteger(quantity) || quantity < 1) {
          return new Response("Некоректний товар у кошику", { status: 400 });
        }
        const product = await Product.findById(productId).select("price code small_image images").lean();
        const priceInKopiykas = Math.round(product?.price * 100);
        totalInKopiykas += priceInKopiykas * quantity;
        if (priceInKopiykas <= 0 || !Number.isSafeInteger(totalInKopiykas)) {
          return new Response("Ціна товару недоступна", { status: 400 });
        }
        pricedItems.push({
          product: productId,
          price: priceInKopiykas / 100,
          quantity,
          size: item.size,
          code: product.code,
          image: product.small_image || product.images?.[0] || "no image",
        });
      }

      const payment = {
        method: paymentMethod,
        status: "pending",
        sandbox: liqPayKeys.sandbox,
        amount: totalInKopiykas / 100,
        currency: "UAH",
        providerOrderId: randomUUID(),
      };
      const checkout = createLiqPayCheckout(
        payment,
        liqPayKeys,
        process.env.LIQPAY_SITE_URL || new URL(request.url).origin
      );
      if (!checkout) {
        return new Response("Оплата LiqPay недоступна", { status: 503 });
      }
      const creator = userId || (await User.create({
        email: `guest_${payment.providerOrderId}@avanti.local`,
        username: `guest_${payment.providerOrderId}@avanti.local`,
        name: delivery.name || "Guest",
        surname: delivery.surname || "",
        phone: delivery.phone || "",
        password: "",
        isGuest: true,
      }))._id;
      await Order.create({ creator, items: pricedItems, delivery, totalPrice: payment.amount, payment });
      return Response.json({ checkout }, { status: 201 });
    }

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
      payment: { method: paymentMethod },
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
      `💳 Оплата: ${PAYMENT_METHOD_LABELS[paymentMethod]}\n` +
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
