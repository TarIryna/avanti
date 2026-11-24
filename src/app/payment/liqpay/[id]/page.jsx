import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Order from "@/models/order";
import { connectToDB } from "@/utils/database";
import { PAYMENT_METHODS } from "@/constants/payment";
import PaymentNavigation from "../../PaymentNavigation";

export const dynamic = "force-dynamic";

export default async function LiqPayResult({ params }) {
  await connectToDB();
  const order = await Order.findOne({
    "payment.providerOrderId": params.id,
    "payment.method": PAYMENT_METHODS.LIQPAY,
  }).select("payment.status payment.sandbox").lean();
  if (!order) notFound();
  const { status } = order.payment;
  if (status === "paid") {
    redirect(`/payment/success?order=${encodeURIComponent(params.id)}`);
  }

  const messages = {
    failed: "Оплата не пройшла.",
    refunded: "Кошти повернуто.",
  };

  return (
    <main className="container page">
      <h1>{order.payment.sandbox ? "Тестова оплата LiqPay" : "Оплата LiqPay"}</h1>
      <p>{messages[status] ?? "Очікуємо підтвердження оплати."}</p>
      <PaymentNavigation key={params.id} status={status} />
      <Link href="/cart">Повернутися до кошика</Link>
    </main>
  );
}
