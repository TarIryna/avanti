import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { items } = await req.json();

    const user = await User.findById(params.id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // допустим, у пользователя есть массив orders
    user.orders.push(...items);

    await user.save();

    return new Response(JSON.stringify(user.orders), { status: 200 });
  } catch (error) {
    console.error("Error adding orders:", error);
    return new Response("Failed to add orders", { status: 500 });
  }
};
