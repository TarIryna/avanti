import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { client, items, total, terminal, shop, type } = await request.json();
  const isSalePrice = type === "sale" || type === "return"
  try {
    await connectToDB();
    // общий id чека (связывает операции)
    const operationId = `op_${Date.now()}`;

    // считаем общий total по товарам (на всякий случай)
    const totalSum = isSalePrice ? items.reduce(
      (sum, item) => sum + item.salePrice * (item.quantity || 1),
      0
    ) : 0;

    // создаём операции
const operations = await Promise.all(
  items.map(async (item) => {
      const itemTotal = isSalePrice ? item.salePrice * (item.quantity || 1) : 0;

      // доля терминала
      const terminalPart = isSalePrice && terminal
        ? Math.round((itemTotal / totalSum) * terminal)
        : 0;

    const product = await Product.findOne({ code: item.code });

      if (product) {
        const sizesAll = product.get("sizes_all");

        const shopKey = shop.toString();

        if (!sizesAll.get(shopKey)) {
          sizesAll.set(shopKey, []);
        }

        const shopSizes = sizesAll.get(shopKey);

        for (const itemSize of item.size) {
          let sizeObj = shopSizes.find(
            (s) => s.size === itemSize.size
          );

          // Добавление товара
          if (type === "return" || type === "arrival") {
            if (sizeObj) {
              sizeObj.q += itemSize.q;
            } else {
              shopSizes.push({
                size: itemSize.size,
                q: itemSize.q,
              })
            }
          }

          // Списание товара
          if (type === "sale" || type === "decrease" || type === "inside") {
            if (sizeObj) {
              sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
            }
            // если размера нет — ничего не делаем
            // либо можно залогировать ошибку
          }
          
        }
        shopSizes.sort((a, b) => Number(a.size) - Number(b.size));
        product.markModified("sizes_all");
        await product.save();
      }

      return {
          clientPhone: client?.phone || null,
          product: product?._id,
          salePrice: item.salePrice,
          image: item.images?.[0] || "",
          size: item.size,
          code: item.code,
          quantity: item.quantity,
          terminal: terminalPart / (item.quantity || 1),
          operationId,
          type,
          shop,
          comment: item.comment ?? null,
          staff: item.staff ?? null
        };
   
    })
  )

    await Operation.insertMany(operations);

    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
