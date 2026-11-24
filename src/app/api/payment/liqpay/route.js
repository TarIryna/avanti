import Order from "@/models/order";
import { connectToDB } from "@/utils/database";
import { getLiqPayKeys, readLiqPayCallback } from "@/utils/liqpay";
import { PAYMENT_METHODS } from "@/constants/payment";

export const POST = async (request) => {
  const keys = getLiqPayKeys();
  if (!keys) return new Response(null, { status: 503 });

  const form = await request.formData().catch(() => null);
  const payment = readLiqPayCallback(form?.get("data"), form?.get("signature"), keys);
  if (!payment) return new Response(null, { status: 400 });

  const { order_id, status, currency, amount, payment_id } = payment;
  const orderAmount = Number(amount);
  if (typeof order_id !== "string" || typeof status !== "string" ||
      currency !== "UAH" || !Number.isFinite(orderAmount) || orderAmount <= 0) {
    return new Response(null, { status: 400 });
  }

  if (!keys.sandbox && status === "sandbox") return new Response(null, { status: 400 });
  const isPaid = status === "success" || (keys.sandbox && status === "sandbox");
  const isFailed = status === "failure" || status === "error";
  const update = {
    "payment.status": isPaid ? "paid" : isFailed ? "failed" : "pending",
    "payment.providerStatus": status,
  };
  if (payment_id != null) update["payment.providerPaymentId"] = String(payment_id);
  if (isPaid) update["payment.paidAt"] = new Date();

  await connectToDB();
  await Order.updateOne({
    "payment.method": PAYMENT_METHODS.LIQPAY,
    "payment.sandbox": keys.sandbox,
    "payment.providerOrderId": order_id,
    "payment.currency": currency,
    "payment.amount": orderAmount,
    "payment.status": isPaid ? { $in: ["pending", "failed"] } : "pending",
  }, { $set: update });

  return new Response(null, { status: 200 });
};
