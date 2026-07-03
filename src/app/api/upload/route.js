import { v2 as cloudinary } from "cloudinary";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function POST(req) {
  try {
    await connectToDB(); // Подключаемся к базе данных

    const data = await req.formData();
    const file = data.get("file");
    const code = data.get("code"); 

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Загружаем оригинальный файл в Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `products/${code}` 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Ссылка на оригинальное изображение (высокое качество)
    const originalUrl = result.secure_url;

    // 2. Генерируем ссылку для уменьшенной копии (низкое качество)
    // Метод не делает повторных запросов, он просто создает правильный URL на основе public_id
    const lowQualityUrl = cloudinary.url(result.public_id, {
      width: 400,          // сжимаем ширину до 400px
      quality: 30,         // снижаем качество до 30%
      crop: "scale",       // пропорциональное масштабирование
      secure: true,        // обязательно https
    });

    console.log('Поле 1 (Оригинал):', originalUrl);
    console.log('Поле 2 (Сжатая):', lowQualityUrl);

    await connectToDB();
    const product = await Product.findOne({
          barcodes: { $in: [code] }
        });

    const allImages = Array.from(new Set([...product.images, originalUrl]));
    product.images = allImages;
    if (lowQualityUrl){
      product.small_image = lowQualityUrl; 
      product.markModified("small_image");
    }
    product.markModified("images");
    await product.save();

    return Response.json({ success: true, originalUrl, lowQualityUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
