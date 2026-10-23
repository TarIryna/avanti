import Price from "@/models/price";
import Label from "@/models/label"
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    const data = await request.json();
    const firstPrice = Number(data.firstPrice);
    const secondPrice = data.secondPrice == null || data.secondPrice === ""
      ? null
      : Number(data.secondPrice);

    if (!data.code || !Number.isFinite(firstPrice) || firstPrice <= 0 ||
      (secondPrice !== null && (!Number.isFinite(secondPrice) || secondPrice <= 0 || secondPrice >= firstPrice))) {
      return new Response(JSON.stringify({ error: "Invalid prices or product code" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDB();

    const product = await Product.findOne({
      $or: [{ code: data.code }, { barcodes: { $in: [data.code] } }],
    });
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Price.create({
      ...data,
      firstPrice,
      secondPrice,
    });
    await Label.create({ code: data.code });

    // `price` is the active price. With a second price, keep the first in `price2`.
    product.price = secondPrice ?? firstPrice;
    if (secondPrice !== null) {
      product.price2 = firstPrice;
    } else {
      product.price2 = undefined;
    }
    await product.save();
    
    
    return new Response(JSON.stringify('success'), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
