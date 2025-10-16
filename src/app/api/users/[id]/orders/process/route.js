import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const orders = await Order.find({
      creator: params.id,
      status: "in process",
    }).populate("creator");

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  const orderId = Math.random();
  try {
    await connectToDB();

    const products = await Order.find({
      creator: userId,
      status: "in process",
    }).populate("creator");

    products.map((item) => {
      const newItem = new Order({
        creator: userId,
        product: item,
        date: new Date(),
        orderId,
      });
      newItem.save();
      return new Response(JSON.stringify(newItem), { status: 201 });
    });
  } catch (error) {
    return new Response("Failed to fetch orders created by user", {
      status: 500,
    });
  }
};

// export const POST = async (request) => {
//   const { userId, prompt, tag } = await request.json();

//   try {
//     await connectToDB();
//     const newPrompt = new Prompt({ creator: userId, prompt, tag });

//     await newPrompt.save();
//     return new Response(JSON.stringify(newPrompt), { status: 201 });
//   } catch (error) {
//     return new Response("Failed to create a new prompt", { status: 500 });
//   }
// };
