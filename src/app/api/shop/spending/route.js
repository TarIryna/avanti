// /api/shop/audit/route.js
import Spending from "@/models/spendings";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    // 1. Получаем query-параметры из URL запроса
    const { searchParams } = new URL(request.url);
    const shop = searchParams.get('shop');
    const startStr = searchParams.get('start'); // пришли строки вида "2026-09-11"
    const endStr = searchParams.get('end');     // "2026-09-12"
    // 2. Превращаем строки в объекты дат
    const start = new Date(startStr);
    const end = new Date(endStr);

    // 3. Устанавливаем время (используем UTC, чтобы время не съезжало на сервере)
    start.setUTCHours(0, 0, 0, 0);       // Начало дня (00:00:00.000)
    end.setUTCHours(23, 59, 59, 999);    // Конец дня (23:59:59.999)

   try {
    await connectToDB();
    const spendings = await Spending.find({
      shop,
      createdAt: {
        $gte: start,
        $lte: end,
      }
    })
    .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, spendings }), { status: 200 });
  } catch (error) {
    console.error("Помилка отримання витрат:", error);
    return new Response(JSON.stringify({ error: "Failed to get spendings" }), { status: 500 });
  }
};



export const POST = async (request) => {
  try {
    const { staff, amount, comment, shop, type } = await request.json();
    await connectToDB();

    const newSpending = await Spending.create({ staff, amount, comment, shop, type });
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API Spending Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
