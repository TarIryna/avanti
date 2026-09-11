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
const [invoicesData, operations] = await Promise.all([
  Invoice.find({ "items.productCode": String(productAccessCode) })
    .sort({ date: -1 })
    .lean(), // 1. Добавляем .lean(), чтобы получить чистые JS-объекты

  Operation.find({ code: Number(productAccessCode) })
    .sort({ createdAt: -1 })
]);

// 2. Фильтруем массив items в каждом инвойсе
const invoices = invoicesData.map(invoice => ({
  ...invoice,
  items: invoice.items.filter(item => item.productCode === String(productAccessCode))
}));

console.log('operations', operations)
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
