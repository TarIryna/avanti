import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { item, redirectSizes, shop } = await request.json();
  const quantity = arrivalSizes.reduce((a, b) => a + (+b.q || 0), 0);

  try {
    await connectToDB();

    const operationId = `op_${Date.now()}`;

    // 1. создаём операцию прихода
    await Operation.create({
      operationId,
      type: "arrival",
      shop,
      product: item._id,
      code: item.code,
      size: redirectSizes,
      createdAt: new Date(),
      image: item.small_image ?? item.images[0],
      quantity
    });

    await Product.updateOne(
      { _id: item._id },
      { $set: { sizes_all: item.sizes_all } }
    );


    return new Response(
      JSON.stringify({ success: true }),
      { status: 201 }
    );

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};