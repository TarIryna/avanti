import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { getSortParam } from "@/helpers/getSortParam";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get("gender");
    const season = searchParams.get("season");
    const view = searchParams.get("view");
    const sizes = searchParams.get("sizes");
    const color = searchParams.get("color");
    const material = searchParams.get("material");
    const sort = searchParams.get("sort");
    const type = searchParams.get("type");
    const limit = Number(searchParams.get("limit") ?? 24);
    const page = Number(searchParams.get("page") ?? 1);

    // ✅ строим фильтр динамически
    const filterParams = {};
    if (type && type !== "null") filterParams.type = type;
    if (gender && gender !== "bags") filterParams.gender = gender;
    if (season && season !== "null") filterParams.season = season;
    if (view && view !== "null") filterParams.view = view;
    if (color && color !== "null") filterParams.color = color;
    if (material && material !== "null") filterParams.material = material;
    if (type && type !== "null") filterParams.type = type;
    if (sizes && sizes !== "null") {
      filterParams.sizes = { $regex: `\\b${sizes}\\b` };
    }

    const sortParam = getSortParam(sort);

    // ✅ считаем total
    const total = await Product.countDocuments(filterParams);
    console.log(filterParams);
    // ✅ достаем продукты с пагинацией
    const products = await Product.find(filterParams)
      .sort(sortParam)
      .limit(limit)
      .skip((page - 1) * limit);

    const pages = Math.ceil(total / limit);

    return new Response(JSON.stringify({ total, products, pages }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ API filter error:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
