import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    
    const startOfTwoDaysAgo = new Date();
    startOfTwoDaysAgo.setDate(startOfTwoDaysAgo.getDate() - 1); // 1 день назад (вчера) или 2 (ставь -2)
    startOfTwoDaysAgo.setHours(0, 0, 0, 0); // Начало дня (00:00:00.000)

    const products = await Product.find({ 
      updatedAt: { $gte: startOfTwoDaysAgo } 
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
