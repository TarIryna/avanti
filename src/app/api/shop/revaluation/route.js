import Price from "@/models/price";
import Label from "@/models/label"
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { item, newPrice, shop } = await request.json();

  try {
    await connectToDB();

        // Добавляем новую запись в переоценку
    await Price.create({
      product: item,
      firstPrice: item.price2 ?? null,
      secondPrice: item.price,
      newPrice,
      code: item.code,
      shop,
    });

    await Label.create({
        product: item,
    });

    const product = await Product.findById(item._id);
    product.price = newPrice;
    product.markModified("price");
    await product.save();
    
    
    return new Response(JSON.stringify('success'), { status: 201 });

  } catch (error) {
    console.error("POST /api/operation error:", error);
    return new Response("Failed to create operations", { status: 500 });
  }
};
