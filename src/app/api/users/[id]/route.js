import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const data = await request.json();
  const newUser = data?.user;

  try {
    await connectToDB();

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { $set: newUser }, // безопасно обновляем только переданные поля
      { new: true, runValidators: true } // вернуть обновлённый документ + валидация схемы
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return new Response("Error Updating User", { status: 500 });
  }
};
