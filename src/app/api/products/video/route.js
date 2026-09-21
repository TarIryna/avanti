import { getName } from "@/data";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
export const dynamic = 'force-dynamic';


export const GET = async () => {
  try {
    await connectToDB();

    const products = await Product.find({ 
        video: { $exists: true, $ne: null },
        totalCount: { $gt: 0 }
    });

    const csvRows = products.flatMap(product => {
        // Фильтруем размеры, где количество (q) больше 0
        const availableSizes = product.sizes.filter(size => size.q > 0);

        // Создаем отдельную запись для каждого подходящего размера
        return availableSizes.map(size => ({
            id: `${product.code}${size.size}`,
            title: getName(product, size.size, 'ua', true),       // Название товара
            video: product.video,       // Ссылка на видео
        }));
        });

     let csvContent = '\uFEFFid;title;video\n';

    Object.entries(csvRows).forEach(([index, data]) => {
    const rowParts = [
        `"${data.id}"`,
        `${data.title}`,
        `${data.video}`,
    ];

    csvContent += rowParts.join(';') + '\n';
    });

    console.log(csvContent)

       // 7. Отдача файла пользователю в браузер
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="video.csv"`,
      },
    });
  } catch (error) {
    console.error("API Error:", error); // Поможет увидеть ошибку в логах сервера, если она возникнет
    return new Response("Internal Server Error", { status: 500 });
  }
}
