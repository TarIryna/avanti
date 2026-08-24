import { connectToDB } from "@/utils/database"; // Замените на ваш путь к БД
import Product from "@/models/product";         // Замените на ваш путь к моделям
import Invoice from "@/models/invoice";
import Operation from "@/models/operation";

export const GET = async (request, { params }) => {
  const barcode = params.id;

  try {
    await connectToDB();

    // 1. Находим сам товар по штрихкоду
    const product = await Product.findOne({
      barcodes: { $in: [barcode] }
    });

    // Если товар не найден, сразу отдаем 404
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Извлекаем стабильный код товара (артикул из Access)
    // Предполагаю, что в модели Product это поле называется code. Если по-другому, замените product.code
    const productAccessCode = product.code; 

    // 2. Запускаем параллельный поиск в других коллекциях для скорости (через Promise.all)
    const [invoices, operations] = await Promise.all([
      // Ищем все инвойсы, где в массиве items есть элемент с нашим productCode
      Invoice.find({ "items.productCode": String(productAccessCode) })
        .sort({ date: -1 }), // Сортируем: сначала новые получения

      // Ищем все операции по стабильному коду товара
      Operation.find({ code: Number(productAccessCode) })
        .sort({ createdAt: -1 }) // Сортируем: сначала свежие операции
    ]);

    // 3. Формируем единый упорядоченный ответ
    const responseData = {
      product,
      invoices,
      operations
    };

    return new Response(JSON.stringify(responseData), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error /api/product/info/[id]:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product data" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
