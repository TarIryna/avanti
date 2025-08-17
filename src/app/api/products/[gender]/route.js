import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);

    const gender = searchParams.get("gender");
    const view = searchParams.get("view");
    const season = searchParams.get("season");
    const size = searchParams.get("size");
    const material = searchParams.get("material");
    const color = searchParams.get("color");
    const sortBy = searchParams.get("sortBy");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 24);
    const query = { gender };

    // Добавляешь фильтры только если они есть
    if (view) query.view = view;
    if (season) query.season = season;
    if (size) query.size = size;
    if (material) query.material = material;
    if (color) query.color = color;
    if (sortBy) query.sortBy = sortBy;

    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
    const product = await Product.find({
      gender: params?.gender,
    }).limit(36);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
