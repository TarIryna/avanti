import { OPERATION_TYPE } from "@/constants/constants";
import Operation from "@/models/operation";
import Product from "@/models/product";
import Rate from "@/models/rate";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { client, items, terminal, shop, type } = await request.json();
  const isSalePrice = type === OPERATION_TYPE.SALE || type === OPERATION_TYPE.RETURN;
  const decreaseType = type === OPERATION_TYPE.SALE || type === OPERATION_TYPE.DECREASE;
  const increaseType = type === OPERATION_TYPE.RETURN || type === OPERATION_TYPE.ARRIVAL;

  try {
    await connectToDB();
    const lastRate = await Rate.findOne().sort({ timestamp: -1 });
    const rate = lastRate?.rate ?? 45;
    
    // Общий id чека (связывает операции)
    const operationId = `op_${Date.now()}`;

    // Считаем общий total по товарам
    const totalSum = isSalePrice ? items.reduce(
      (sum, item) => sum + item.salePrice * (item.quantity || 1),
      0
    ) : 0;

    // Создаём операции
    const operations = await Promise.all(
      items.map(async (item) => {
        const itemTotal = isSalePrice ? item.salePrice * (item.quantity || 1) : 0;

        // Доля терминала
        const terminalPart = isSalePrice && terminal && totalSum > 0
          ? Math.round((itemTotal / totalSum) * terminal)
          : 0;

        const product = await Product.findOne({ code: item.code });

        const multiplier = [OPERATION_TYPE.SALE, OPERATION_TYPE.DECREASE, OPERATION_TYPE.INSIDE].includes(type) ? -1 : 1;
        const currentQuantity = (item.quantity ?? 1) * multiplier;


        if (product) {
          const sizesAll = product.get("sizes_all");
          const sizes = product.get("sizes");

          for (const itemSize of item.size) {
            let sizeObj = sizes.find((s) => s.size === itemSize.size);

            // Добавление товара (Возврат / Приход)
            if (increaseType) {
              if (sizeObj) {
                sizeObj.q += itemSize.q;
              } else {
                sizes.push({ size: itemSize.size, q: itemSize.q });
              }
            }

            // Списание товара (Продажа / Списание / Перемещение)
            if (decreaseType) {
              if (sizeObj) {
                sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
              }
            }
          }

          const shopKey = shop.toString();

         if (!sizesAll[shopKey]) {
            sizesAll[shopKey] = [];
          }
          const shopSizes = sizesAll[shopKey];
          
          for (const itemSize of item.size) {
            let sizeObj = shopSizes.find((s) => s.size === itemSize.size);

            // Добавление товара по конкретному магазину
            if (increaseType) {
              if (sizeObj) {
                sizeObj.q += itemSize.q;
              } else {
                shopSizes.push({ size: itemSize.size, q: itemSize.q });
              }
            }

            // Списание товара по конкретному магазину
            if (decreaseType) {
              if (sizeObj) {
                sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
              }
            }
          }

          // ИСПРАВЛЕНО: Корректный приоритет скобок для вычисления pop и res
          if (type === OPERATION_TYPE.SALE) {
            product.pop = (product.pop || 0) + currentQuantity;
            product.res = Number((product.res || 0) + (item.salePrice / rate)).toFixed(2);
          }
          
          if (type === OPERATION_TYPE.RETURN) {
            product.pop = Math.max(0, (product.pop || 0) - currentQuantity);
            product.res = Number((product.res || 0) - (item.salePrice / rate)).toFixed(2);
          }

          sizes.sort((a, b) => Number(a.size) - Number(b.size));
          shopSizes.sort((a, b) => Number(a.size) - Number(b.size));
          product.markModified("sizes_all");
          product.markModified("sizes");
          await product.save();
        } else {
          // Залогируем критический пропуск, если товара со штрихкодом нет в базе
          console.warn(`ВНИМАНИЕ: Товар с кодом ${item.code} не найден при создании операции ${type}`);
        }
   
        return {
          clientPhone: client?.phone || null,
          product: product ? product._id : null, // Запишет ObjectId, если товар найден
          salePrice: item.salePrice,
          image: item.images?.[0] || "",
          size: item.size,
          code: item.code,
          quantity: currentQuantity,
          terminal: terminalPart / (currentQuantity || 1),
          operationId,
          type,
          shop,
          comment: item.comment ?? null,
          staff: item.staff ?? null
        };
      })
    );

    // Сохраняем все сформированные операции пакетным запросом
    await Operation.insertMany(operations);

    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
