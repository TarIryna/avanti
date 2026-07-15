import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectToDB();

    // Запрашиваем из БД только поле-массив 'barcodes'. Поле code исключаем, раз нужен только чистый barcodes
    const products = await Product.find({}, { barcodes: 1, _id: 0 }).lean();

    // .flatMap() автоматически достанет элементы из всех внутренних массивов 
    // и объединит их в один плоский массив строк
    const allBarcodes = products.flatMap(p => p.barcodes || []).filter(Boolean);

    // Опционально: убираем дубликаты штрихкодов, если один код случайно привязан к разным товарам
    const uniqueBarcodes = [...new Set(allBarcodes)];

    return new Response(JSON.stringify(uniqueBarcodes), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("❌ Error fetching barcodes:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
