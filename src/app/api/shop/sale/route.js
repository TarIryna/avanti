import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { client, items, total, terminal } = await request.json();

  try {
    await connectToDB();

    // общий id чека (связывает операции)
    const operationId = `op_${Date.now()}`;

    // считаем общий total по товарам (на всякий случай)
    const totalSum = items.reduce(
      (sum, item) => sum + item.salePrice * (item.quantity || 1),
      0
    );

    // создаём операции
    const operations = [];

    for (const item of items) {
      const itemTotal = item.salePrice * (item.quantity || 1);

      // доля терминала
      const terminalPart = terminal
        ? Math.round((itemTotal / totalSum) * terminal)
        : 0;

      // если quantity > 1 — делаем несколько операций
      for (let i = 0; i < (item.quantity || 1); i++) {
        const product = await Product.findOne({ code: item.code });

        operations.push({
          clientPhone: client?.phone || null,
          product: product?._id,
          salePrice: item.salePrice,
          image: item.images?.[0] || "",
          size: item.size,
          code: item.code,
          quantity: 1,
          terminal: terminalPart / (item.quantity || 1),
          operationId,
          type: "sale",
        });
      }
    }

    await Operation.insertMany(operations);

    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
