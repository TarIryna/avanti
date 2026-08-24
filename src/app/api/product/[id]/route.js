import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  const code = params.id
  try {
    await connectToDB();
    const product = await Product.findOne({
      barcodes: { $in: [code] }
    });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};



export const PUT = async (request, { params }) => {
  try {
    await connectToDB();

    // 1. Получаем код (или ID) товара из параметров URL
    const code = params.id;

    // 2. Получаем новые данные товара из тела запроса
    // Переименуем переменную в updatedData, чтобы избежать конфликта имен
    const { product: updatedData } = await request.json();

    // 3. Находим товар по коду и обновляем его поля
    // Опция { new: true } заставляет Mongoose вернуть уже обновленный документ вместо старого
    const updatedProduct = await Product.findOneAndUpdate(
      { code: code },          // Критерий поиска (фильтр)
      { $set: updatedData },   // Какие данные обновить
      { new: true }            // Возвращать обновленный документ
    );

    // Если товар по такому коду не был найден в базе
    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ error: "Товар для обновления не найден" }), 
        { status: 404 }
      );
    }

    // Возвращаем успешный ответ с обновленным товаром
    return new Response(JSON.stringify(updatedProduct), { status: 200 });

  } catch (error) {
    console.error("PUT /api/product/[id] error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update the product" }), 
      { status: 500 }
    );
  }
};

