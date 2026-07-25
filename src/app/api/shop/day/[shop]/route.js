import Product from "@/models/product";
import Operation from "@/models/operation";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  const targetShop = "1"; // Запрашиваемый магазин

  try {
    await connectToDB();

    const result = await Product.aggregate([
      // 1. Разворачиваем массив total для всех товаров
      { $unwind: "$total" },
      
      // 2. Оставляем записи только для shop: "1"
      { $match: { "total.shop": targetShop } },
      
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

    // 1. Формируем границы текущего дня
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 2. Делаем запрос с обязательным вызовом .populate()
    const operations = await Operation.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      }
    })
    .populate("product") // 🌟 Теперь Mongoose найдет модель Product в памяти и подставит данные
    .sort({ createdAt: -1 });

    const totalQuantity = result.length > 0 ? result[0].grandTotal : 0;

    return new Response(JSON.stringify({ shop: targetShop, total: totalQuantity, operations }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при подсчете общего количества:", error);
    return new Response(JSON.stringify({ error: "Failed to calculate grand total" }), { status: 500 });
  }
};
