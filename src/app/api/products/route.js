import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

import { getParams } from "@/utils/getParams";
import { getSortParam } from "@/helpers/getSortParam";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const season = searchParams.get("season");
  const sortBy = searchParams.get("sortBy");
  const sortParam = getSortParam(sortBy);
  try {
    await connectToDB();
    let result = {};
    if (page > 1) {
      const total = await Product.find({ season }).count();
      const products = await Product.find({ season })
        .sort(sortParam)
        .limit(limit)
        .skip((page - 1) * limit);
      result = { total, products };
    } else {
      const total = await Product.find({ season }).count();
      const products = await Product.find({ season })
        .sort(sortParam)
        .limit(limit);
      result = { total, products };
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const result = await request.json();
  try {
    await connectToDB();
    const product = await Product.find({
      gender: result?.gender,
      season: result?.season,
      view: result?.view,
    }).limit(36);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
