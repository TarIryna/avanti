import Client from "@/models/client";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const product = await Client.findOne({phone: params.number});
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
