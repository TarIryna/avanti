import Price from "@/models/price";
import Label from "@/models/label";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { getRoundPrice } from "@/helpers/getRoundPrice";
import { getProductCodeMatch, getProductPairCountMatch } from "@/helpers/productRevalueMatch";


export const POST = async (request) => {
  try {
    const { filter, percent, price } = await request.json();
    const filterParams = getProductPairCountMatch(filter);
    if (!filterParams) return Response.json({ error: "Некоректна кількість пар" }, { status: 400 });
    const codeMatch = getProductCodeMatch(filter.productCode);
    if (!codeMatch) return Response.json({ error: "Некоректний код товару" }, { status: 400 });
    const hasCode = Boolean(codeMatch.$or || codeMatch.barcodes);
    Object.assign(filterParams, codeMatch);
    if (filterParams.pop !== undefined && !filterParams.$expr && !hasCode) {
      filterParams.totalCount = { $gt: 0 };
    }

    const { 
      color, 
      gender, 
      material, 
      season, 
      type, 
      vendor, 
      view, 
      year, 
      limit = 2000, 
      page = 1 
    } = filter;

    await connectToDB();

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

    const items = hasCode
      ? await Product.find(filterParams).limit(2).lean()
      : (await Product.aggregate(pipeline))[0]?.data || [];

    if (hasCode && items.length > 1) {
      return Response.json({ error: "Код відповідає кільком товарам. Вкажіть унікальний код або штрихкод." }, { status: 409 });
    }

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
      if (percent) {
        newPrice = getRoundPrice(firstPrice, percent);
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
