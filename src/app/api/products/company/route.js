import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

// Изменяем на POST, так как GET не умеет принимать тело запроса request.json()
export const POST = async (request) => {
  try {
    await connectToDB();

    // Безопасно парсим тело запроса
    const body = await request.json();
    const { 
      year, 
      company,
      limit = 2000, 
      page = 1 
    } = body;

    // ✅ Строим фильтр динамически
    const filterParams = {};
    
    if (year && year !== "null") {
      filterParams.year =  Number(year);
    }
    if (company && company !== "null") {
       filterParams.company =  Number(company); 
    }

    const pipeline = [
      { $match: filterParams },
      {
        $facet: {
          data: [
            // Сортировка по vendor (1 - от А до Я). Заменили несуществующий finalSort
            { $sort: { code: 1 } }, 
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) },
          ],
          meta: [
            { $count: "total" }, 
          ],
        },
      },
    ];

    const result = await Product.aggregate(pipeline);

    const products = result[0]?.data || [];
    const total = result[0]?.meta[0]?.total || 0;
    const pages = Math.ceil(total / limit);

    // Всегда возвращаем JSON структуру
    return new Response(JSON.stringify({ total, products, pages }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API products/company error:", error);
    // Исправлено: возвращаем JSON даже в случае ошибки, чтобы фронтенд не ломался
    return new Response(JSON.stringify({ error: "Failed to fetch products", message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
