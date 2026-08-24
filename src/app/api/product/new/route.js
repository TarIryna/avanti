import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  let { product } = await request.json();

  try {
    await connectToDB();

    await Product.create(product);

    return new Response(
      JSON.stringify('success'),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/product/new error:", error);
    return new Response("Failed to create a new product", { status: 500 });
  }
};
