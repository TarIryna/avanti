import Product from "@/models/product";
import { connectToDB } from "@/utils/database";


export const GET = async () => {
  try {
    await connectToDB();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Устанавливаем 00:00:00.000 текущего дня

    const products = await Product.find({
      updatedAt: { $gte: startOfToday }
    });

   return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
