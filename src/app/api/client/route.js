import Client from "@/models/client";
import { connectToDB } from "@/utils/database";

const todayInKyiv = () => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Kyiv",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

export const GET = async (request) => {
  try {
    const query = new URL(request.url).searchParams.get("search")?.trim();
    if (!query) return Response.json({ clients: [] });

    await connectToDB();
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const clients = await Client.find({
      $or: [
        { phone: { $regex: escapedQuery, $options: "i" } },
        { surname: { $regex: escapedQuery, $options: "i" } },
      ],
    }).select("surname name phone shop discount").limit(20).lean();
    return Response.json({ clients });
  } catch (error) {
    console.error("GET /api/client error:", error);
    return Response.json({ error: "Не вдалося знайти клієнтів" }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const { surname, name, phone, shop } = await request.json();
    if (![surname, name, phone].every((value) => typeof value === "string" && value.trim())) {
      return Response.json({ error: "Прізвище, ім'я та телефон обов'язкові" }, { status: 400 });
    }

    await connectToDB();
    const normalizedPhone = phone.trim();
    if (await Client.exists({ phone: normalizedPhone })) {
      return Response.json({ error: "Клієнт із таким телефоном уже існує" }, { status: 409 });
    }

    const client = await Client.create({
      surname: surname.trim(),
      name: name.trim(),
      phone: normalizedPhone,
      shop: Number.isFinite(Number(shop)) ? Number(shop) : undefined,
      discount: 5,
      created: todayInKyiv(),
    });
    return Response.json({ success: true, client }, { status: 201 });
  } catch (error) {
    console.error("POST /api/client error:", error);
    return Response.json({ error: "Не вдалося створити клієнта" }, { status: 500 });
  }
};
