import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

// Изменяем на POST, так как GET не умеет принимать тело запроса request.json()
export const POST = async (request) => {
  try {
    await connectToDB();

    // Безопасно парсим тело запроса
    const body = await request.json();
    const { 
      color, 
      gender, 
      material, 
      season, 
      type, 
      vendor, 
      view, 
      year, 
      yearMinus,
      yearPlus,
      limit = 2000, 
      page = 1 
    } = body;

    // ✅ Строим фильтр динамически
    const filterParams = {};

    // Обработка сезона (если с фронта прилетает массив, используем напрямую, если строка — через split)
    if (season && season !== "null" && season?.length > 0) {
      filterParams.season = Array.isArray(season) ? { $in: season } : { $in: season.split(",") };
    }


    if (vendor && vendor !== "null" && vendor?.length > 0) {
      filterParams.vendor = Array.isArray(vendor) ? { $in: vendor } : vendor;
    }

    // Обработка гендера (проверяем массив или одиночное значение)
    if (gender && gender !== "null" && gender?.length > 0) {
      filterParams.gender = Array.isArray(gender) ? { $in: gender.map(g => Number(g)) } : Number(gender);
    }

    if (color && color !== "null" && color?.length > 0) { 
      filterParams.color = Array.isArray(color) ? { $in: color } : color;
    }

    if (type ?? type !== "null") filterParams.type = Number(type);
    if (view && view !== "null") filterParams.view = view;
    if (material && material !== "null") filterParams.material = Number(material);
    
    if (year && year !== "null") {
      filterParams.year =  Number(year);
    }

    if (yearPlus && yearPlus !== "null") {
      filterParams.year = { $gte: Number(yearPlus) };
    }

    if (yearMinus && yearMinus !== "null") {
      filterParams.year = { $lte: Number(yearMinus) };
    }


    const pipeline = [
  { $match: filterParams },
  {
    $facet: {
      data: [
        { $sort: { code: 1 } }, 
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
      ],
      meta: [
        { $count: "total" }, 
      ],
      // --- ДОБАВЛЯЕМ НОВУЮ СЕКЦИЮ ДЛЯ ПОДСЧЕТА СУММЫ Q ---
      shopTotals: [
        { $unwind: "$total" }, // Разворачиваем массив total
        {
          $match: {
            "total.shop": { $in: ["1", "2"] }, // Только нужные магазины
            "total.q": { $exists: true, $nin: ["", "0", 0, null] } // Исключаем пустые строки, нули и null
          }
        },
        {
          $group: {
            _id: null,
            totalQ: {
              $sum: {
                $convert: {
                  input: "$total.q",
                  to: "int",
                  onError: 0, // Защита: если что-то пойдет не так, вернет 0
                  onNull: 0
                }
              }
            }
          }
        }
      ]


    },
  },
];


    // const pipeline = [
    //   { $match: filterParams },
    //   {
    //     $facet: {
    //       data: [
    //         // Сортировка по vendor (1 - от А до Я). Заменили несуществующий finalSort
    //         { $sort: { code: 1 } }, 
    //         { $skip: (Number(page) - 1) * Number(limit) },
    //         { $limit: Number(limit) },
    //       ],
    //       meta: [
    //         { $count: "total" }, 
    //       ],
    //     },
    //   },
    // ];

    const result = await Product.aggregate(pipeline);

    const products = result[0]?.data || [];
    const total = result[0]?.meta[0]?.total || 0;
    const pages = Math.ceil(total / limit);

    // Всегда возвращаем JSON структуру
    return new Response(JSON.stringify({ total, products, pages }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API filter error:", error);
    // Исправлено: возвращаем JSON даже в случае ошибки, чтобы фронтенд не ломался
    return new Response(JSON.stringify({ error: "Failed to fetch products", message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
