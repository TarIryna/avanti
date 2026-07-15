// /api/shop/audit/route.js
import Audit from "@/models/audit"; 
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    // Получаем данные из фронтенда (номер магазина, название полки и объект отсканированных штрихкодов)
    const { shopId, shop, place, items } = await request.json(); 
    const targetShop = Number(shopId || shop);

    if (!targetShop || !place || !items) {
      return new Response(JSON.stringify({ error: "Missing required fields (shop, place, or items)" }), { status: 400 });
    }

    await connectToDB();

    // Трансформируем объект { "штрихкод": количество } в плоский массив документов для Mongoose
    const auditRecordsToInsert = Object.entries(items).map(([barcode, quantity]) => ({
      barcode: String(barcode),
      count: Number(quantity),
      shop: targetShop,
      place: String(place)
    }));

    // Записываем всю полку в базу данных одним ультрабыстрым запросом
    if (auditRecordsToInsert.length > 0) {
      await Audit.insertMany(auditRecordsToInsert);
    }

    return new Response(JSON.stringify({ success: true, processedCount: auditRecordsToInsert.length }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API Audit Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
