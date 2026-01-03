import Order from "@/models/order";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (request) => {
  try {
    await connectToDB();

    // получаем userId из query параметров
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log(userId, 'userId');

    // фильтруем заказы по userId, если он указан
  const filter = userId
  ? { creator: new mongoose.Types.ObjectId(userId) }
  : {};

    console.log(filter, 'filter')

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    console.log(orders)

    // возвращаем в нужном формате
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Failed to fetch orders", { status: 500 });
  }
};
