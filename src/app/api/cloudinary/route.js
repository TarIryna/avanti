import { v2 as cloudinary } from "cloudinary";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { NextResponse } from 'next/server';


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

    await connectToDB();
    const product = await Product.findOne({
          barcodes: { $in: [code] }
        });

    const allImages = Array.from(new Set([...product.images, originalUrl]));
    product.images = allImages;
    if (lowQualityUrl && !product.small_image){
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


export async function GET() {
  // const startDate = '2026-08-05';
  // const endDate = '2026-08-06';
  const now = new Date();

  // Сегодня
  const endDate = now.toISOString().split('T')[0];

  // Вчера
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const startDate = yesterday.toISOString().split('T')[0];

  try {
    console.log(`Поиск файлов за период с ${startDate} по ${endDate}...`);

    // 1. Запрашиваем данные. Сортировка 'asc' гарантирует хронологический порядок (от старых к новым)
    const result = await cloudinary.search
      .expression(`uploaded_at:[${startDate} TO ${endDate}]`)
      .sort_by('uploaded_at', 'asc') 
      .max_results(500)
      .execute();

    const resources = result.resources || [];

    if (resources.length === 0) {
      return NextResponse.json({ message: 'Файлы за этот период не найдены.' }, { status: 404 });
    }

    // 2. Группируем фото по коду товара
    const groupedProducts = {};

    resources.forEach((asset) => {
      const filename = asset.public_id?.slice(9, 15) || 'unknown';
      const url = asset.secure_url;

      if (!groupedProducts[filename]) {
        groupedProducts[filename] = [];
      }

      // Просто собираем ссылки в массив. Благодаря sort_by('asc'), они уже идут по порядку
      groupedProducts[filename].push(url);
    });

    // 3. Определяем максимальное количество фото у одного товара
    const maxPhotos = Math.max(...Object.values(groupedProducts).map(arr => arr.length), 1);

    // 4. Формируем заголовки: code;url1;small1;url2;url3;url4... (small только у первого)
    let headers = ['code', 'url1', 'small1'];
    for (let i = 2; i <= maxPhotos; i++) {
      headers.push(`url${i}`);
    }
    let csvContent = headers.join(';') + '\n';

    // 5. Заполняем CSV строками данных
    Object.entries(groupedProducts).forEach(([code, urls]) => {
      let rowParts = [`"${code}"`];

      // Обрабатываем первое фото (индекс 0) — для него генерируем small
      const firstUrl = urls[0];
      const firstSmall = firstUrl.replace('upload', 'upload/c_scale,q_30,w_400');
      rowParts.push(`"${firstUrl}"`, `"${firstSmall}"`);

      // Обрабатываем остальные фото (начиная со второго, если они есть)
      for (let i = 1; i < urls.length; i++) {
        rowParts.push(`"${urls[i]}"`);
      }

      // Если фото меньше, чем максимум в таблице, дописываем пустые ячейки для выравнивания
      const missingCells = maxPhotos - urls.length;
      if (missingCells > 0) {
        for (let i = 0; i < missingCells; i++) {
          rowParts.push('');
        }
      }

      csvContent += rowParts.join(';') + '\n';
    });

    // // 6. Сохранение файла на сервере
    // const filePath = path.join('/tmp', 'cloudinary_report.csv');
    // fs.writeFileSync(filePath, csvContent, 'utf-8');

    // console.log("Файл сохранен в D://tmp//cloudinary_report.csv")

    // 7. Отдача файла пользователю в браузер
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="cloudinary_report_${startDate}.csv"`,
      },
    });

  } catch (error) {
    console.error('Произошла ошибка:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB(); // Подключаемся к БД

    // Получаем данные из запроса (ожидаем publicId и code товара)
    const { publicId, code } = await req.json();

    console.log('publicId', publicId, 'code', code)

    if (!publicId) {
      return Response.json({ error: "Не передан publicId для удаления" }, { status: 400 });
    }

    // 1. Удаляем изображение из Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

    if (cloudinaryResult.result !== "ok") {
      // Если Cloudinary вернул "not found", возможно оно уже удалено, но базу все равно стоит почистить
      console.warn(`Предупреждение Cloudinary: ${cloudinaryResult.result}`);
    }

    // 2. Если передан code товара, удаляем ссылки на фото из MongoDB
    if (code) {
      const product = await Product.findOne({ barcodes: { $in: [code] } });

      if (product) {
        // Фильтруем массив картинок, убирая ту, которая содержит удаленный publicId
        product.images = product.images.filter((imgUrl) => !imgUrl.includes(publicId));

        // Если удаленное фото стояло в качестве превью (small_image), очищаем его
        if (product.small_image && product.small_image.includes(publicId)) {
          product.small_image = ""; // или null, смотря что ожидает ваша схема
          product.markModified("small_image");
        }

        // Если превью удалено, но в массиве еще остались другие фото,
        // можно автоматически сделать уменьшенную копию из следующего оставшегося фото:
        if (!product.small_image && product.images.length > 0) {
          // Вытаскиваем public_id следующего фото (извлекаем структуру папок + имя между /upload/.../ и расширением)
          const nextImageUrl = product.images[0];
          // Простая замена пути для генерации lowQualityUrl прямо строкой:
          product.small_image = nextImageUrl.replace('/upload/', '/upload/c_scale,q_30,w_400/');
          product.markModified("small_image");
        }

        product.markModified("images");
        await product.save();
      }
    }

    return Response.json({ success: true, message: "Фото успешно удалено" });

  } catch (error) {
    console.error("Delete error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
