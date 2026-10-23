import { OPERATION_TYPE } from "@/constants/constants";
import Operation from "@/models/operation";
import Product from "@/models/product";
import Rate from "@/models/rate";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { client, items, terminal, shop, type } = await request.json();
  const isSalePrice = type === OPERATION_TYPE.SALE || type === OPERATION_TYPE.RETURN;
  
  // Флаги типов операций на основе вашего справочника
  const isSale = type === OPERATION_TYPE.SALE;              // id: 1 (Продаж)
  const isReturn = type === OPERATION_TYPE.RETURN;          // id: 2 (Повернення)
  const isArrival = type === OPERATION_TYPE.ARRIVAL;        // id: 3 (Прихід)
  const isDecrease = type === OPERATION_TYPE.DECREASE;      // id: 4 (Списання / Межмаг. транзит на shop 3)
  const isTransit = type === OPERATION_TYPE.TRANSIT;        // id: 5 (Передано в доставку на балансы 4, 5, 6)

  // Принудительно сохраняем shopKey как строку для работы с объектом sizes_all в JS
  const shopKey = shop.toString();
  const shop3 = "3"; // Склад обычного транзита (ночные продажи)
  
  // Массив интернет-балансов "В дороге к клиенту"
  const internetShops = ["4", "5", "6"]; 
  
  // Проверяем, относится ли текущий магазин операции к интернет-площадкам
  const isInternetShop = internetShops.includes(shopKey);
  const isInternetSale = isSale && isInternetShop; // Финальная продажа интернет-заказа

  try {
    await connectToDB();
    const lastRate = await Rate.findOne().sort({ timestamp: -1 });
    const rate = lastRate?.rate ?? 45;
    
    const operationId = `op_${Date.now()}`;

    const totalSum = isSalePrice ? items.reduce(
      (sum, item) => sum + item.salePrice * (item.quantity || 1),
      0
    ) : 0;

    const operations = await Promise.all(
      items.map(async (item) => {
        const itemTotal = isSalePrice ? item.salePrice * (item.quantity || 1) : 0;

        const terminalPart = isSalePrice && terminal && totalSum > 0
          ? Math.round((itemTotal / totalSum) * terminal)
          : 0;

        const product = await Product.findOne({ code: item.code });

        // Множитель количества для записи в историю операций
        const multiplier = [OPERATION_TYPE.SALE, OPERATION_TYPE.DECREASE, OPERATION_TYPE.TRANSIT].includes(type) ? -1 : 1;
        const currentQuantity = (item.quantity ?? 1) * multiplier;

        if (product) {
          const sizesAll = product.get("sizes_all");
          const sizes = product.get("sizes");

          // --- 1. ГЛОБАЛЬНЫЙ МАССИВ SIZES (ОБЩИЙ ОСТАТОК НА САЙТЕ) ---
          for (const itemSize of item.size) {
            let sizeObj = sizes.find((s) => s.size === itemSize.size);

            if (isReturn) {
              if (sizeObj) {
                sizeObj.q += itemSize.q;
              } else {
                sizes.push({ size: itemSize.size, q: itemSize.q });
              }
            }

            // Уменьшаем глобальный остаток только при:
            // - Передаче в доставку интернет-площадкам (isTransit), чтобы товар сразу исчез с витрины сайта
            // - Прямой физической продаже из обычных магазинов (isSale, но НЕ когда списываем с интернет-балансов 4, 5, 6)
            if (isTransit || (isSale && !isInternetSale)) {
              if (sizeObj) {
                sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
              }
            }
          }

          // --- 2. ЛОКАЛЬНЫЕ ОСТАТКИ ПО МАГАЗИНАМ (SIZES_ALL) ---
          if (!sizesAll[shopKey]) {
            sizesAll[shopKey] = [];
          }
          const shopSizes = sizesAll[shopKey];
          
          for (const itemSize of item.size) {
            let sizeObj = shopSizes.find((s) => s.size === itemSize.size);

            // А) Интернет-продажа (Подтверждение получения с балансов 4, 5 или 6)
            if (isInternetSale) {
              if (sizeObj) {
                sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
              }
            }

            // Б) Обычная физическая продажа (Магазины 1, 2)
            else if (isSale) {
              if (sizeObj) {
                sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
              }
            }

            // В) Передано в доставку (TRANSIT) — снимаем с физ. магазина, кладем в "дорогу" на 4, 5 или 6
            else if (isTransit) {
              if (sizeObj) sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);

              if (!sizesAll[shopKey]) sizesAll[shopKey] = [];
              let tObj = sizesAll[shopKey].find((s) => s.size === itemSize.size);
              if (tObj) tObj.q += itemSize.q;
              else sizesAll[shopKey].push({ size: itemSize.size, q: itemSize.q });
            }

            // Г) Приход (ARRIVAL) — зачисляем в магазин, автоматически снимаем со склада транзита "3"
            else if (isArrival) {
              if (sizeObj) sizeObj.q += itemSize.q;
              else shopSizes.push({ size: itemSize.size, q: itemSize.q });

              if (!sizesAll[shop3]) sizesAll[shop3] = [];
              let tObj = sizesAll[shop3].find((s) => s.size === itemSize.size);
              if (tObj) tObj.q = Math.max(0, tObj.q - itemSize.q);
            }

            // Д) Списание (DECREASE) — снимаем из магазина, временно кладем на склад транзита "3"
            else if (isDecrease) {
              if (sizeObj) sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);

              if (!sizesAll[shop3]) sizesAll[shop3] = [];
              let tObj = sizesAll[shop3].find((s) => s.size === itemSize.size);
              if (tObj) tObj.q += itemSize.q;
              else sizesAll[shop3].push({ size: itemSize.size, q: itemSize.q });
            }

            // Е) Возврат (RETURN) — возвращаем в текущий магазин
            else if (isReturn) {
              if (sizeObj) sizeObj.q += itemSize.q;
              else shopSizes.push({ size: itemSize.size, q: itemSize.q });
            }
          }

          // --- 3. ФИКСАЦИЯ АНАЛИТИКИ (POP / RES) ---
          if (isSale) {
            product.pop = (product.pop || 0) + (item.quantity || 1);
            product.res = Number((product.res || 0) + (item.salePrice / rate)).toFixed(2);
          }
          
          if (isReturn) {
            product.pop = Math.max(0, (product.pop || 0) - (item.quantity || 1));
            product.res = Number((product.res || 0) - (item.salePrice / rate)).toFixed(2);
          }

          // Сортировка всех массивов для идеального порядка в базе данных
          sizes.sort((a, b) => Number(a.size) - Number(b.size));
          shopSizes.sort((a, b) => Number(a.size) - Number(b.size));
          if (sizesAll[shop3]) sizesAll[shop3].sort((a, b) => Number(a.size) - Number(b.size));
          internetShops.forEach(id => {
            if (sizesAll[id]) sizesAll[id].sort((a, b) => Number(a.size) - Number(b.size));
          });

          product.markModified("sizes_all");
          product.markModified("sizes");
          await product.save();
        } else {
          console.warn(`ВНИМАНИЕ: Товар с кодом ${item.code} не найден при создании операции ${type}`);
        }
   
        // Автоматическое формирование красивых лог-комментариев
        let autoComment = item.comment ?? null;
        if (isArrival) autoComment = `${item.comment ?? ''} (знято з транзитного складу 3)`.trim();
        if (isDecrease) autoComment = `${item.comment ?? ''} (переміщено на склад 3)`.trim();
        
        if (isTransit) {
          const shopNames = { "4": "Розетка", "5": "Пром", "6": "Сайт" };
          const platform = shopNames[shopKey] || shopKey;
          autoComment = `${item.comment ?? ''} (відправлено в дорозі до клієнта ${platform})`.trim();
        }
        if (isInternetSale) {
          const shopNames = { "4": "Розетка", "5": "Пром", "6": "Сайт" };
          const platform = shopNames[shopKey] || shopKey;
          autoComment = `${item.comment ?? ''} (продано та знято з балансу ${platform})`.trim();
        }

        return {
          clientPhone: client?.phone || null,
          product: product ? product._id : null,
          salePrice: item.salePrice,
          image: item.images?.[0] || "",
          size: item.size,
          code: item.code,
          quantity: currentQuantity,
          terminal: terminalPart / (-1 * currentQuantity || 1),
          operationId,
          type,
          shop: Number(shop), // ИСПРАВЛЕНО: Принудительное приведение к числу для схемы Mongoose
          comment: autoComment,
          staff: item.staff ?? null
        };
      })
    );

    await Operation.insertMany(operations);
    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};




// import { OPERATION_TYPE } from "@/constants/constants";
// import Operation from "@/models/operation";
// import Product from "@/models/product";
// import Rate from "@/models/rate";
// import { connectToDB } from "@/utils/database";

// export const POST = async (request) => {
//   const { client, items, terminal, shop, type } = await request.json();
//   const isSalePrice = type === OPERATION_TYPE.SALE || type === OPERATION_TYPE.RETURN;
//   const decreaseType = type === OPERATION_TYPE.SALE || type === OPERATION_TYPE.DECREASE;
//   const increaseType = type === OPERATION_TYPE.RETURN || type === OPERATION_TYPE.ARRIVAL;

//   try {
//     await connectToDB();
//     const lastRate = await Rate.findOne().sort({ timestamp: -1 });
//     const rate = lastRate?.rate ?? 45;
    
//     // Общий id чека (связывает операции)
//     const operationId = `op_${Date.now()}`;

//     // Считаем общий total по товарам
//     const totalSum = isSalePrice ? items.reduce(
//       (sum, item) => sum + item.salePrice * (item.quantity || 1),
//       0
//     ) : 0;

//     // Создаём операции
//     const operations = await Promise.all(
//       items.map(async (item) => {
//         const itemTotal = isSalePrice ? item.salePrice * (item.quantity || 1) : 0;

//         // Доля терминала
//         const terminalPart = isSalePrice && terminal && totalSum > 0
//           ? Math.round((itemTotal / totalSum) * terminal)
//           : 0;

//         const product = await Product.findOne({ code: item.code });

//         const multiplier = [OPERATION_TYPE.SALE, OPERATION_TYPE.DECREASE, OPERATION_TYPE.INSIDE].includes(type) ? -1 : 1;
//         const currentQuantity = (item.quantity ?? 1) * multiplier;


//         if (product) {
//           const sizesAll = product.get("sizes_all");
//           const sizes = product.get("sizes");

//           for (const itemSize of item.size) {
//             let sizeObj = sizes.find((s) => s.size === itemSize.size);

//             // Добавление товара (Возврат / Приход)
//             if (increaseType) {
//               if (sizeObj) {
//                 sizeObj.q += itemSize.q;
//               } else {
//                 sizes.push({ size: itemSize.size, q: itemSize.q });
//               }
//             }

//             // Списание товара (Продажа / Списание / Перемещение)
//             if (decreaseType) {
//               if (sizeObj) {
//                 sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
//               }
//             }
//           }

//           const shopKey = shop.toString();

//          if (!sizesAll[shopKey]) {
//             sizesAll[shopKey] = [];
//           }
//           const shopSizes = sizesAll[shopKey];
          
//           for (const itemSize of item.size) {
//             let sizeObj = shopSizes.find((s) => s.size === itemSize.size);

//             // Добавление товара по конкретному магазину
//             if (increaseType) {
//               if (sizeObj) {
//                 sizeObj.q += itemSize.q;
//               } else {
//                 shopSizes.push({ size: itemSize.size, q: itemSize.q });
//               }
//             }

//             // Списание товара по конкретному магазину
//             if (decreaseType) {
//               if (sizeObj) {
//                 sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
//               }
//             }
//           }

//           // ИСПРАВЛЕНО: Корректный приоритет скобок для вычисления pop и res
//           if (type === OPERATION_TYPE.SALE) {
//             product.pop = (product.pop || 0) + currentQuantity;
//             product.res = Number((product.res || 0) + (item.salePrice / rate)).toFixed(2);
//           }
          
//           if (type === OPERATION_TYPE.RETURN) {
//             product.pop = Math.max(0, (product.pop || 0) - currentQuantity);
//             product.res = Number((product.res || 0) - (item.salePrice / rate)).toFixed(2);
//           }

//           sizes.sort((a, b) => Number(a.size) - Number(b.size));
//           shopSizes.sort((a, b) => Number(a.size) - Number(b.size));
//           product.markModified("sizes_all");
//           product.markModified("sizes");
//           await product.save();
//         } else {
//           // Залогируем критический пропуск, если товара со штрихкодом нет в базе
//           console.warn(`ВНИМАНИЕ: Товар с кодом ${item.code} не найден при создании операции ${type}`);
//         }
   
//         return {
//           clientPhone: client?.phone || null,
//           product: product ? product._id : null, // Запишет ObjectId, если товар найден
//           salePrice: item.salePrice,
//           image: item.images?.[0] || "",
//           size: item.size,
//           code: item.code,
//           quantity: currentQuantity,
//           terminal: terminalPart / (-1 * currentQuantity || 1),
//           operationId,
//           type,
//           shop,
//           comment: item.comment ?? null,
//           staff: item.staff ?? null
//         };
//       })
//     );

//     // Сохраняем все сформированные операции пакетным запросом
//     await Operation.insertMany(operations);

//     return new Response(JSON.stringify({ success: true }), { status: 201 });

//   } catch (error) {
//     console.error("POST /api/operation error:", error);
//     return new Response("Failed to create operations", { status: 500 });
//   }
// };
