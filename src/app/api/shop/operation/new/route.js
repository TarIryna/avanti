import Operation from "@/models/operation";
import Product from "@/models/product";
import Rate from "@/models/rate";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { client, items, total, terminal, shop, type } = await request.json();
  const isSalePrice = type === "sale" || type === "return"
  try {
    await connectToDB();
    const lastRate = await Rate.findOne().sort({ timestamp: -1 });
    const rate = lastRate?.rate ?? 45;
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
        const sizes = product.get("sizes");

        for (const itemSize of item.size) {
          let sizeObj = sizes.find(
            (s) => s.size === itemSize.size
          );

          // Добавление товара
          if (type === "return" || type === "arrival") {
            if (sizeObj) {
              sizeObj.q += itemSize.q;
            } else {
              sizes.push({
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

      if (type === "sale" || type === "inside"){
        product.pop = (product.pop || 0) + item.quantity ?? 1;
        product.res = (product.res || 0) + Math.round(item.salePrice / rate)
      }
      if (type === "return"){
        product.pop = (product.pop || 0) - item.quantity ?? 1;
        product.res = (product.res || 0) - Math.round(item.salePrice / rate)
      }

        sizes.sort((a, b) => Number(a.size) - Number(b.size));
        shopSizes.sort((a, b) => Number(a.size) - Number(b.size));
        product.markModified("sizes_all");
        product.markModified("sizes");
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
