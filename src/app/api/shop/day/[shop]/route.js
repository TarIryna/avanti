import Product from "@/models/product";
import Operation from "@/models/operation";
import { connectToDB } from "@/utils/database";
import Spending from "@/models/spendings";

const kyivOffsetAt = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).filter(({ type }) => type !== "literal");
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second) - date.getTime();
};

const parseDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10) === value ? date : null;
};

const kyivStartOfDay = (date) => new Date(date.getTime() - kyivOffsetAt(date));

export const GET = async (request, { params }) => {
  const { shop: shopParam } = await params;
  const shop = Number(shopParam);
  const { searchParams } = new URL(request.url);
  // const startDate = parseDate("2026-10-23");
  // const endDate = parseDate("2026-10-23");
  const startDate = parseDate(searchParams.get("start"));
  const endDate = parseDate(searchParams.get("end"));

  if (!Number.isInteger(shop) || shop < 1) {
    return Response.json({ error: "Вкажіть коректний номер магазину" }, { status: 400 });
  }
  if (!startDate || !endDate || startDate > endDate) {
    return Response.json({ error: "Вкажіть коректний період звіту" }, { status: 400 });
  }

  const nextDay = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
  const start = kyivStartOfDay(startDate);
  const end = kyivStartOfDay(nextDay);

  try {
    await connectToDB();

    const result = await Product.aggregate([
      // 1. Разворачиваем массив total для всех товаров
      { $unwind: "$total" },
      
      // 2. Оставляем записи только для shop
      { $match: { "total.shop": shop } },
      
      // 3. Группируем и безопасно конвертируем строки в числа
      {
        $group: {
          _id: null,
          grandTotal: { 
            $sum: { 
              $convert: {
                input: "$total.q",
                to: "int",
                onError: 0, // ИСПРАВЛЕНО: если в поле пустая строка, подставится 0
                onNull: 0   // ИСПРАВЛЕНО: если поля нет или оно null, подставится 0
              }
            } 
          }
        }
      }
    ]);


    // 2. Делаем запрос с обязательным вызовом .populate()
    const operations = await Operation.find({
      shop,
      createdAt: {
        $gte: start,
        $lt: end,
      }
    })
    .populate("product") // 🌟 Теперь Mongoose найдет модель Product в памяти и подставит данные
    .sort({ createdAt: -1 });

    const spendings = await Spending.find({
       shop,
       createdAt: {
        $gte: start,
        $lt: end,
      }
    }).sort({ createdAt: -1 });

    const totalQuantity = result.length > 0 ? result[0].grandTotal : 0;

    return new Response(JSON.stringify({ shop, total: totalQuantity, operations, spendings }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при подсчете общего количества:", error);
    return new Response(JSON.stringify({ error: "Failed to calculate grand total" }), { status: 500 });
  }
};
