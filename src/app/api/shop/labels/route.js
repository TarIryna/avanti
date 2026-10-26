import Product from "@/models/product";
import Label from "@/models/label";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

// 1. Получение товаров, у которых есть лейблы
export const GET = async () => {
      try {
        await connectToDB();
      const labelRecords = await Label.find({}, { code: 1, _id: 0 }).lean();
      const codes = labelRecords.map(({ code }) => String(code));
      const products = await Product.find({ code: { $in: codes.map(Number) } }).lean();
      const productsByCode = new Map(products.map((product) => [String(product.code), product]));
      const labels = labelRecords
        .map(({ code }) => productsByCode.get(String(code)))
        .filter(Boolean);

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
