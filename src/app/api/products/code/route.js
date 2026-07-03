import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return new Response(JSON.stringify([]), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    await connectToDB();

   // Используем агрегацию для работы с числовым полем как со строкой
    const result = await Product.aggregate([
      {
        // 1. Создаем виртуальное строковое поле для поиска
        $addFields: {
          codeString: { $toString: "$code" }
        }
      },
      {
        // 2. Фильтруем документы, которые НАЧИНАЮТСЯ с query
        $match: {
          codeString: { $regex: `^${query}` } // Флаг "i" для чисел не нужен
        }
      },
      {
        // 3. Сортируем по оригинальному числовому полю code (от большего к меньшему)
        $sort: { code: -1 }
      },
      {
        // 4. Берем только первый (самый большой) документ
        $limit: 1
      },
      {
        // 5. Оставляем в ответе только поле code для экономии трафика
        $project: {
          _id: 0,
          code: 1
        }
      }
    ]);

    // Если массив пустой — значит совпадений нет вообще
    const maxCode = result.length > 0 ? result[0].code : null;

    return new Response(JSON.stringify({ maxCode }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (error) {
    console.error("Критическая ошибка бэкенда:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch code" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};