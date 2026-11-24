import { createHash, timingSafeEqual } from "node:crypto";

export const getLiqPayKeys = () => {
  const publicKey = process.env["LIQPAY_PUBLIC_KEY"];
  const privateKey = process.env["LIQPAY_PRIVATE_KEY"];
  if (!publicKey || !privateKey) return null;
  const sandbox = publicKey.startsWith("sandbox_");
  if (sandbox !== privateKey.startsWith("sandbox_")) return null;
  return { publicKey, privateKey, sandbox };
};

const sign = (data, privateKey) =>
  createHash("sha3-256").update(privateKey + data + privateKey).digest();

export const createLiqPayCheckout = (payment, keys, origin) => {
  const site = URL.canParse(origin) ? new URL(origin) : null;
  const hasPublicCallback = site?.protocol === "https:" &&
    !["localhost", "127.0.0.1", "[::1]"].includes(site.hostname);
  if (!keys.sandbox && !hasPublicCallback) return null;

  const data = Buffer.from(JSON.stringify({
    version: 7,
    public_key: keys.publicKey,
    action: "pay",
    amount: payment.amount,
    currency: payment.currency,
    description: keys.sandbox ? "Тестова оплата замовлення Avanti" : "Оплата замовлення Avanti",
    order_id: payment.providerOrderId,
    ...(hasPublicCallback && {
      server_url: new URL("/api/payment/liqpay", site).href,
      result_url: new URL(`/payment/liqpay/${payment.providerOrderId}`, site).href,
    }),
    language: "uk",
  })).toString("base64");

  return { data, signature: sign(data, keys.privateKey).toString("base64") };
};

export const readLiqPayCallback = (data, signature, keys) => {
  if (typeof data !== "string" || typeof signature !== "string") return null;
  const expected = sign(data, keys.privateKey);
  const received = Buffer.from(signature, "base64");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64").toString("utf8"));
    return payload?.public_key === keys.publicKey ? payload : null;
  } catch {
    return null;
  }
};
