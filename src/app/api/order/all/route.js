import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // получаем userId из query параметров
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // фильтруем заказы по userId, если он указан
    const filter = userId ? { userId } : {};

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    // возвращаем в нужном формате
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Failed to fetch orders", { status: 500 });
  }
};
