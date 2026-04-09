import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { getSortParam } from "@/helpers/getSortParam";
import { getSeasonPriorityByDate } from "@/helpers/getSortParam";
import { getGender, getTypeId } from "@/data/getData";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const genderQuery = searchParams.get("gender");
    const gender = getGender(genderQuery);
    const season = searchParams.get("season");
    const view = searchParams.get("view");
    const sizes = searchParams.get("sizes");
    const color = searchParams.get("color");
    const material = searchParams.get("material");
    const sort = searchParams.get("sort");
    const type = searchParams.get("type") ?? 'shoes';
    const limit = Number(searchParams.get("limit") ?? 24);
    const page = Number(searchParams.get("page") ?? 1);
    const isSale = genderQuery === 'sale'

    // ✅ строим фильтр динамически
const filterParams = {};

// Фильтр по type
filterParams.type = getTypeId(type);

// Фильтры по сезону, виду, цвету, материалу
if (season && season !== "null") filterParams.season = season;
if (view && view !== "null") filterParams.view = view;
if (color && color !== "null") filterParams.color = color;
if (material && material !== "null") filterParams.material = material;

// Фильтр по размерам
if (sizes && sizes !== "null") {
  filterParams.sizes = {
    $elemMatch: {
      size: sizes,
      q: { $gt: 0 } // только в наличии
    }
  };
}

// Товары на распродаже
if (isSale) filterParams.price2 = { $exists: true, $ne: null };

// Фильтр по gender
if (genderQuery === "all") {
  // ничего не добавляем, ищем все gender
} else if (genderQuery === "kids") {
  filterParams.gender = { $in: [4, 3] };
} else if (gender && genderQuery !== "bags" && genderQuery !== "sale") {
  filterParams.gender = gender;
}
if (query) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const andConditions = words.map((word) => {
    const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const orConditions = [
      { name: { $regex: safeWord, $options: "i" } },
      { model: { $regex: safeWord, $options: "i" } },
    ];

    // если число → ищем по коду
    if (!isNaN(word)) {
      orConditions.push({ code: Number(word) });
    }

    return { $or: orConditions };
  });

  filterParams.$and = andConditions;
}

//  if (query) {
//   const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//   const orConditions = [
//     { name: { $regex: safeQuery, $options: "i" } },
//     { vendor: { $regex: safeQuery, $options: "i" } },
//     { model: { $regex: safeQuery, $options: "i" } },
//   ];

//   // если число — добавляем code
//   if (!isNaN(query)) {
//     orConditions.push({ code: Number(query) });
//   }

//   filterParams.$or = orConditions;
// }


    const sortParam = getSortParam(sort);

const seasonPriority = getSeasonPriorityByDate();

// защита
Object.keys(sortParam).forEach((key) => {
  if (typeof sortParam[key] !== "number") {
    delete sortParam[key];
  }
});

const baseSort = getSortParam(sort);

const finalSort = {
  seasonOrder: 1,   // сначала сезон
  ...baseSort,  // потом выбранный sort
  _id: 1      
};


const pipeline = [
  { $match: filterParams },

  // добавляем вычисляемое поле для сортировки по сезону
  {
    $addFields: {
      seasonOrder: {
        $switch: {
          branches: [
            { case: { $eq: ["$season", seasonPriority[0]] }, then: 0 },
            { case: { $eq: ["$season", seasonPriority[1]] }, then: 1 },
            { case: { $eq: ["$season", seasonPriority[2]] }, then: 2 },
          ],
          default: 99,
        },
      },
    },
  },

  {
    $facet: {
      data: [
        { $sort: finalSort },      // сортировка
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ],
      meta: [
        { $count: "total" },       // ❗ ОБЩЕЕ количество
      ],
    },
  },
];


const result = await Product.aggregate(pipeline);

const products = result[0]?.data || [];
const total = result[0]?.meta[0]?.total || 0;
const pages = Math.ceil(total / limit);

    return new Response(JSON.stringify({ total, products, pages }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ API filter error:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
