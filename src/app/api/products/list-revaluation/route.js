import Price from "@/models/price";
import Label from "@/models/label";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
// Импортируйте вашу функцию округления из правильного файла утилит
// import { getRoundPrice } from "@/utils/helpers"; 

// Локальный дубликат функции на случай, если импорт настроен иначе
const getRoundPrice = (price, percent) => {
   return Math.round(Number(price) / 10 * (100 - Number(percent)) / 100) * 10;
};

export const POST = async (request) => {
  try {
    const { filter, persent, price } = await request.json();

    const { 
      color, 
      gender, 
      material, 
      season, 
      size_type, 
      type, 
      vendor, 
      view, 
      year, 
      limit = 2000, 
      page = 1 
    } = filter;

    await connectToDB();

    // ✅ Строим фильтр динамически
    const filterParams = {};

    if (season && season !== "null" && season?.length > 0) {
      filterParams.season = Array.isArray(season) ? { $in: season } : { $in: season.split(",") };
    }

    if (vendor && vendor !== "null" && vendor?.length > 0) {
      filterParams.vendor = Array.isArray(vendor) ? { $in: vendor } : vendor;
    }

    if (gender && gender !== "null" && gender?.length > 0) {
      filterParams.gender = Array.isArray(gender) ? { $in: gender.map(g => Number(g)) } : Number(gender);
    }

    if (color && color !== "null" && color?.length > 0) { 
      filterParams.color = Array.isArray(color) ? { $in: color } : color;
    }

    if (type !== undefined && type !== null && type !== "null" && type !== "") {
      filterParams.type = Number(type);
    }
    if (size_type && size_type !== "null") filterParams.size_type = Number(size_type);
    if (view && view !== "null") filterParams.view = view;
    if (material && material !== "null") filterParams.material = Number(material);
    
    if (year && year !== "null") {
      filterParams.year = { $lte: Number(year) };
    }

    const pipeline = [
      { $match: filterParams },
      {
        $facet: {
          data: [
            { $sort: { vendor: 1 } }, 
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
          ],
        },
      },
    ];

    const result = await Product.aggregate(pipeline);
    const items = result[0]?.data || [];

    if (items.length === 0) {
      return new Response(JSON.stringify({ message: "No products found for revaluation" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const pricesToInsert = [];
    const labelsToInsert = [];
    const productBulkOperations = [];

    for (const item of items) {
      // 1. Вычисляем базовую цену для расчёта (ваша логика)
      const firstPrice = item.price2 ?? item.price;  
      
      // 2. Рассчитываем новую цену (строго или по проценту, или фиксированную)
      let newPrice = null;
      if (persent) {
        newPrice = getRoundPrice(firstPrice, persent);
      } else if (price) {
        newPrice = Number(price);
      }

      // Если цену рассчитать не удалось, пропускаем товар
      if (newPrice === null) continue;

      // 3. КРИТИЧЕСКОЕ УСЛОВИЕ: переоцениваем только если новая цена МЕНЬШЕ текущей product.price
      if (newPrice < item.price) {
        
        pricesToInsert.push({
          product: item._id,
          firstPrice: item.price2 ?? null,
          secondPrice: item.price,
          newPrice: newPrice,
          code: item.code,
          shop: item.shop ?? null,
        });

        labelsToInsert.push({
          product: item._id,
          firstPrice: item.price2 ?? item.price,
          newPrice: newPrice,
        });

        productBulkOperations.push({
          updateOne: {
            filter: { _id: item._id },
            update: { $set: { price: newPrice } }
          }
        });
      }
    }

    // Если ни один товар не подошел под условие "newPrice < item.price"
    if (productBulkOperations.length === 0) {
      return new Response(JSON.stringify({ success: true, processedCount: 0, message: "No products matched the price reduction criteria" }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Выполняем массовые операции только для прошедших валидацию товаров
    await Price.insertMany(pricesToInsert);
    await Label.insertMany(labelsToInsert);
    await Product.bulkWrite(productBulkOperations);

    return new Response(JSON.stringify({ success: true, processedCount: productBulkOperations.length }), { 
      status: 201,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response(JSON.stringify({ error: "Failed to create operations", details: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
