import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { itemFrom, itemTo } = await request.json();

  try {
    await connectToDB();

    // Завантажуємо звичайні Mongoose-документи (БЕЗ .lean(), щоб працювали методи Map)
    const product = await Product.findOne({ code: itemTo });
    const productFrom = await Product.findOne({ code: itemFrom });

    if (!product || !productFrom) {
      return new Response("One or both products not found", { status: 404 });
    }

    // создание операций
    let operations = []

    // --- 1. ПЕРЕНОС SIZES_ALL ---
    // Отримуємо sizes_all цільового продукту. Якщо поля немає, створюємо пусту Map
    if (!product.sizes_all) {
      product.sizes_all = new Map();
    }
    const targetSizesAll = product.sizes_all;

    // Перетворюємо sizes_all вихідного продукту на об'єкт для зручного ітерування
    const rawSizesAllFrom = productFrom.sizes_all instanceof Map
      ? Object.fromEntries(productFrom.sizes_all)
      : (productFrom.toObject().sizes_all || {});

    for (const [store, newSizes] of Object.entries(rawSizesAllFrom)) {
      // додавання операції для даного магазину
       const operationId = `op_${Date.now()}`;
       const total = newSizes.reduce((sum, el) => sum + (el.q || 0), 0);

      console.log(store, newSizes, total)

       operations.push({
          clientPhone: null,
          product: product?._id,
          salePrice: 0,
          image: product.images?.[0] || "",
          size: newSizes,
          code: product.code,
          quantity: total,
          terminal: 0,
          operationId,
          type: "redirect",
          shop: store,
          comment: `з ${itemFrom}`,
          staff: null
        })

        const operationSecondId = `op_${Date.now()}`;

         operations.push({
          clientPhone: null,
          product: productFrom?._id,
          salePrice: 0,
          image: productFrom.images?.[0] || "",
          size: newSizes,
          code: productFrom.code,
          quantity: -total,
          terminal: 0,
          operationId: operationSecondId,
          type: "redirect",
          shop: store,
          comment: `на ${itemTo}`,
          staff: null
        })


      // Якщо в цільовому продукті ще немає цього магазину, створюємо пустий масив через .set()
      if (!targetSizesAll.has(store)) {
        targetSizesAll.set(store, []);
      }

      // Отримуємо посилання на масив розмірів для поточного магазину
      const sizesArray = targetSizesAll.get(store);

      for (const itemSize of newSizes) {
        // Оскільки всередині масиву лежать прості об'єкти, шукаємо збіг за розміром
        const sizeObj = sizesArray.find(s => s.size === itemSize.size);
        if (sizeObj) {
          sizeObj.q += itemSize.q;
        } else {
          // Пушимо новий чистий об'єкт розміру
          sizesArray.push({ size: itemSize.size, q: itemSize.q });
        }
      }

      // Сортуємо масив розмірів всередині сховища
      sizesArray.sort((a, b) => Number(a.size) - Number(b.size));
      
      // Явно перевизначаємо ключ у Map, щоб Mongoose зафіксував мутацію масиву всередині
      targetSizesAll.set(store, sizesArray);
    }

    // --- 2. ПЕРЕНОС SIZES (Обычный массив) ---
    const currentSizes = product.sizes ? product.toObject().sizes : [];
    const sizeMap = new Map(currentSizes.map(item => [item.size, { size: item.size, q: item.q }]));

    if (productFrom.sizes && Array.isArray(productFrom.sizes)) {
      for (const item of productFrom.sizes) {
        if (sizeMap.has(item.size)) {
          sizeMap.get(item.size).q += item.q;
        } else {
          sizeMap.set(item.size, { size: item.size, q: item.q });
        }
      }
    }
    const mergedSizes = Array.from(sizeMap.values()).sort((a, b) => Number(a.size) - Number(b.size));
    product.sizes = mergedSizes;

       // --- 3. ПЕРЕНОС BARCODES (БЕЗ ПОВТОРІВ) ---
    const currentBarcodes = product.barcodes || [];
    const fromBarcodes = productFrom.barcodes || [];

    // Об'єднуємо обидва масиви в Set для автоматичного видалення дублікатів
    const uniqueBarcodes = Array.from(new Set([...currentBarcodes, ...fromBarcodes]));
    product.barcodes = uniqueBarcodes;

    // Повідомляємо Mongoose про зміни та зберігаємо цільовий товар
    product.markModified("sizes_all");
    product.markModified("sizes");
    product.markModified("barcodes");
    await product.save();


    // --- 3. ОЧИСТКА ИСХОДНОГО ПРОДУКТА (productFrom) ---
    if (productFrom.sizes_all instanceof Map) {
      for (const [store, sizes] of productFrom.sizes_all.entries()) {
        const clearedSizes = sizes.map(sizeObj => ({ size: sizeObj.size, q: 0 }));
        productFrom.sizes_all.set(store, clearedSizes);
      }
    }

    if (productFrom.sizes && Array.isArray(productFrom.sizes)) {
      productFrom.sizes.forEach(item => {
        item.q = 0;
      });
    }

        // Повністю очищаємо штрихкоди вихідного товару
    productFrom.barcodes = [];

    productFrom.markModified("sizes_all");
    productFrom.markModified("sizes");
    productFrom.markModified("barcodes");
    await productFrom.save();
    await Operation.insertMany(operations);

    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/inside-redirect error:", error);
    return new Response("Failed to redirect product", { status: 500 });
  }
};
