import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { item } = await request.json();

  try {
    await connectToDB();

    const product = await Product.findOne({ code: item.code });

      if (product) {
        const sizes = product.get("sizes");
        console.log('sizes', sizes, 'to decrease', item.size)
        sizes.sort((a, b) => Number(a.size) - Number(b.size));
        product.markModified("sizes");
        await product.save();
      }
   
    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
