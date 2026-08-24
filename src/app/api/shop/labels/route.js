import Product from "@/models/product";
import Label from "@/models/label";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

// 1. Получение товаров, у которых есть лейблы
export const GET = async () => {
      try {
        await connectToDB();
           const labels = await Product.aggregate([
      {
        $lookup: {
          from: "labels",          // Имя коллекции лейблов в MongoDB (обычно во множественном числе)
          localField: "_id",       // Поле из коллекции Product
          foreignField: "product", // Поле из коллекции Label, где хранится ID товара
          as: "labelInfo"          // Временное поле для хранения совпадений
        }
      },
      // Отсекаем товары, у которых нет ни одного лейбла
      { $match: { "labelInfo.0": { $exists: true } } }
    ]);

            return new Response(JSON.stringify(labels), {
            status: 200,
            headers: { "Content-Type": "application/json" }
            });

      } catch (error) {
            console.error("❌ API labels error:", error);
            // Исправлено: возвращаем JSON даже в случае ошибки, чтобы фронтенд не ломался
            return new Response(JSON.stringify({ error: "Failed to fetch labels", message: error.message }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
            });
        }
}

// 2. Удаление ВСЕХ записей из таблицы labels
export const DELETE = async () => {
  try {
    await connectToDB();

    // Удаляем абсолютно все документы из коллекции Label
    const deleteResult = await Label.deleteMany({});

    return new Response(JSON.stringify({ 
      success: true, 
      message: "All labels deleted successfully", 
      deletedCount: deleteResult.deletedCount 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API labels DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete labels", message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};