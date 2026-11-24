import Link from "next/link";
import { notFound } from "next/navigation";
import { PAYMENT_METHODS } from "@/constants/payment";
import Order from "@/models/order";
import { connectToDB } from "@/utils/database";
import PaymentNavigation from "../PaymentNavigation";

export const dynamic = "force-dynamic";

export default async function PaymentSuccess({ searchParams }) {
  const orderId = searchParams.order;
  if (typeof orderId !== "string" || !orderId) notFound();

  await connectToDB();
  const order = await Order.findOne({
    "payment.providerOrderId": orderId,
    "payment.method": PAYMENT_METHODS.LIQPAY,
    "payment.status": "paid",
  }).select("payment.sandbox").lean();
  if (!order) notFound();

  return (
    <main className="container page">
      <h1>{order.payment.sandbox ? "Тестову оплату підтверджено" : "Оплату підтверджено"}</h1>
      <p>Дякуємо за замовлення!</p>
      <PaymentNavigation key={orderId} status="paid" />
      <Link href="/">На головну</Link>
    </main>
  );
}
