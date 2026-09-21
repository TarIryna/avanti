import Product from "@/models/product";
import Operation from "@/models/operation";
import { connectToDB } from "@/utils/database";
import Spending from "@/models/spendings";

export const GET = async (request, { params }) => {
     // 1. Получаем динамический параметр из пути (например, "1")
    const { shop } = await params; 

    // 2. Получаем query-параметры из URL запроса
    const { searchParams } = new URL(request.url);
    const startStr = searchParams.get('start'); // пришли строки вида "2026-09-11"
    const endStr = searchParams.get('end');     // "2026-09-12"

    // 1. Превращаем строки в объекты дат
    const start = new Date(startStr);
    const end = new Date(endStr);

    // 2. Устанавливаем время (используем UTC, чтобы время не съезжало на сервере)
    start.setUTCHours(0, 0, 0, 0);       // Начало дня (00:00:00.000)
    end.setUTCHours(23, 59, 59, 999);    // Конец дня (23:59:59.999)

  try {
    await connectToDB();

    const result = await Product.aggregate([
      // 1. Разворачиваем массив total для всех товаров
      { $unwind: "$total" },
      
      // 2. Оставляем записи только для shop
      { $match: { "total.shop": shop } },
      
      // 3. Группируем и безопасно конвертируем строки в числа
      {
        $group: {
          _id: null,
          grandTotal: { 
            $sum: { 
              $convert: {
                input: "$total.q",
                to: "int",
                onError: 0, // ИСПРАВЛЕНО: если в поле пустая строка, подставится 0
                onNull: 0   // ИСПРАВЛЕНО: если поля нет или оно null, подставится 0
              }
            } 
          }
        }
      }
    ]);


    // 2. Делаем запрос с обязательным вызовом .populate()
    const operations = await Operation.find({
      shop,
      createdAt: {
        $gte: start,
        $lte: end,
      }
    })
    .populate("product") // 🌟 Теперь Mongoose найдет модель Product в памяти и подставит данные
    .sort({ createdAt: -1 });

    const spendings = await Spending.find({
       shop,
       createdAt: {
        $gte: start,
        $lte: end,
      }
    })

    const totalQuantity = result.length > 0 ? result[0].grandTotal : 0;

    return new Response(JSON.stringify({ shop, total: totalQuantity, operations, spendings }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при подсчете общего количества:", error);
    return new Response(JSON.stringify({ error: "Failed to calculate grand total" }), { status: 500 });
  }
};
