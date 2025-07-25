import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { getSortParam } from "@/helpers/getSortParam";

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const season = searchParams.get("season").toString();
  const gender = searchParams.get("gender").toString();
  const view = searchParams.get("view").toString();
  const size = searchParams.get("size").toString();
  const color = searchParams.get("color").toString();
  const material = searchParams.get("material").toString();
  const pageSize = searchParams.get("pagesize");
  const page = searchParams.get("page");
  const sortBy = searchParams.get("sortBy");
  const sortParam = getSortParam(sortBy);

  const queryParams = { view, season, gender, color, material };
  const filterParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value != null && value !== "" && value !== "null"
    )
  );
  try {
    await connectToDB();
    let result = {};
    if (size === "null" || size?.length === 0) {
      if (+page > 1) {
        const total = await Product.find(filterParams).count();
        const response = await Product.find(filterParams)
          .sort(sortParam)
          .limit(pageSize)
          .skip((page - 1) * pageSize);
        result = { total, products: response };
      } else {
        const total = await Product.find(filterParams).count();
        const response = await Product.find(filterParams)
          .sort(sortParam)
          .limit(pageSize);
        if (response) result = { total, products: response };
      }
    } else {
      if (+page > 1) {
        const total = await Product.find({
          $or: [{ sizes: { $regex: size } }],
          filterParams,
        }).count();
        const response = await Product.find({
          $or: [{ sizes: { $regex: size } }],
          filterParams,
        })
          .sort(sortParam)
          .limit(pageSize)
          .skip((page - 1) * pageSize);
        result = { total, products: response };
      } else {
        const total = await Product.find({
          $or: [{ sizes: { $regex: size } }],
          filterParams,
        }).count();
        const response = await Product.find({
          $or: [{ sizes: { $regex: size } }],
          filterParams,
        })
          .sort(sortParam)
          .limit(pageSize);
        result = { total, products: response };
      }
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
