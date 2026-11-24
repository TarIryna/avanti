import Link from "next/link";
import { notFound } from "next/navigation";
import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export default async function LiqPayResult({ params }) {
  await connectToDB();
  const order = await Order.findOne({
    "payment.providerOrderId": params.id,
    "payment.sandbox": true,
  }).select("payment.status").lean();
  if (!order) notFound();

  const messages = {
    paid: "Тестову оплату підтверджено.",
    failed: "Тестова оплата не пройшла.",
    pending: "Очікуємо підтвердження тестової оплати. Оновіть сторінку, щоб перевірити статус.",
  };

  return (
    <main className="container page">
      <h1>Тестова оплата LiqPay</h1>
      <p>{messages[order.payment.status]}</p>
      <Link href="/cart">Повернутися до кошика</Link>
    </main>
  );
}
