import { hash } from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, username, name, surname, phone, city, address, cityDescription, addressDescription } =
      body;

    await connectToDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return new Response(
        JSON.stringify({ message: "Пользователь уже существует" }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      name,
      surname,
      phone,
      city,
      cityDescription,
      address,
      addressDescription
    });

    return new Response(
      JSON.stringify({ message: "Пользователь создан", user: newUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Ошибка регистрации", error: error.message }),
      {
        status: 500,
      }
    );
  }
}
