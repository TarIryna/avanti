import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const orders = await Order.find({
      status: "confirmed",
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch orders", {
      status: 500,
    });
  }
};
