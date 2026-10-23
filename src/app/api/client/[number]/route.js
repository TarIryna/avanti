import Client from "@/models/client";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const { number } = await params;
    const client = await Client.findOne({ phone: number });
    return Response.json(client);
  } catch (error) {
    console.error("GET /api/client/[number] error:", error);
    return Response.json({ error: "Не вдалося знайти клієнта" }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { number } = await params;
    const { surname, name, phone, shop } = await request.json();
    if (![surname, name, phone].every((value) => typeof value === "string" && value.trim())) {
      return Response.json({ error: "Прізвище, ім'я та телефон обов'язкові" }, { status: 400 });
    }

    await connectToDB();
    const normalizedPhone = phone.trim();
    const existingClient = await Client.findOne({ phone: number }, { _id: 1 });
    if (!existingClient) return Response.json({ error: "Клієнта не знайдено" }, { status: 404 });
    const duplicate = await Client.exists({ phone: normalizedPhone, _id: { $ne: existingClient._id } });
    if (duplicate) {
      return Response.json({ error: "Клієнт із таким телефоном уже існує" }, { status: 409 });
    }

    const update = { surname: surname.trim(), name: name.trim(), phone: normalizedPhone };
    if (shop !== undefined && Number.isFinite(Number(shop))) update.shop = Number(shop);
    const client = await Client.findOneAndUpdate({ phone: number }, update, { new: true, runValidators: true });
    if (!client) return Response.json({ error: "Клієнта не знайдено" }, { status: 404 });
    return Response.json({ success: true, client });
  } catch (error) {
    console.error("PATCH /api/client/[number] error:", error);
    return Response.json({ error: "Не вдалося оновити клієнта" }, { status: 500 });
  }
};
