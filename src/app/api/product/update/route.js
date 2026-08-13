//api>product>update>route.js
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const PUT = async (request) => {
  // Получаем данные с фронтенда
  const { images, code, video, sizesGroup } = await request.json(); 

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

      // 🌟 ГЕНЕРИРУЕМ И ОБНОВЛЯЕМ ПРЕВЬЮ PHOTO_SMALL
      if (images && images.length > 0) {
        const firstImage = images[0]; // Берем самую первую картинку из нового списка

        // Проверяем, что картинка с Cloudinary, чтобы не сломать обычные ссылки (например, ibb)
        if (firstImage.includes("cloudinary.com")) {
          const newSmallImage = firstImage.replace(
            "/upload/", 
            "/upload/c_scale,q_30,w_400/"
          );
          // Вставляем параметры сжатия строго после "upload/"
          product.small_image = newSmallImage;
        } else if (!product.photo_small) {
          // Если это не Cloudinary, просто копируем оригинал первой картинки
          product.small_image = firstImage;
        }
      } else {
        // Если менеджер удалил вообще все картинки товара, зануляем превью
        product.small_image = "";
      }
      
      product.markModified("small_image");
    }

    // 4. ИСПРАВЛЕНО: Проверяем, было ли передано поле video в запросе
    if (video !== undefined) {
      product.video = video;
      product.markModified("video");
    }

    if (sizesGroup !== undefined) {
      console.log(sizesGroup)
      product.sizesGroup = Number(sizesGroup);
      product.markModified("sizesGroup");
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
