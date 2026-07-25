import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const PUT = async (request) => {
  // Получаем данные с фронтенда
  const { images, code, video } = await request.json(); 

  console.log('video', video);

  try {
    await connectToDB();

    // 1. Находим товар по штрихкоду
    const product = await Product.findOne({ barcodes: { $in: [code] } });

    // 2. ИСПРАВЛЕНО: Проверяем существование товара СРАЗУ, до манипуляций с ним
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    // 3. ИСПРАВЛЕНО: Проверяем, было ли передано поле images в запросе
    if (images !== undefined) {
      product.images = images;
      product.markModified("images");
    }

    // 4. ИСПРАВЛЕНО: Проверяем, было ли передано поле video в запросе
    if (video !== undefined) {
      product.video = video;
      product.markModified("video");
    }

    // 5. Сохраняем обновленный документ
    await product.save();

    // Возвращаем обновленный продукт обратно на фронтенд
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении полей товара:", error);
    return new Response(JSON.stringify({ error: "Failed to update product data" }), { status: 500 });
  }
};
