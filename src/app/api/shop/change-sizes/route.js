import Operation from "@/models/operation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { item, type } = await request.json();

  try {
    await connectToDB();

    const product = await Product.findOne({ code: item.code });

      if (product) {
        const sizes = product.get("sizes");
       for (const itemSize of item.size) {
          let sizeObj = sizes.find(
            (s) => s.size === itemSize.size
          );

          // Добавление товара
          if (type === "return" || type === "arrival") {
            if (sizeObj) {
              sizeObj.q += itemSize.q;
            } else {
              sizes.push({
                size: itemSize.size,
                q: itemSize.q,
              })
            }
          }

          // Списание товара
          if (type === "sale" || type === "decrease" || type === "inside") {
            if (sizeObj) {
              sizeObj.q = Math.max(0, sizeObj.q - itemSize.q);
            }
            // если размера нет — ничего не делаем
            // либо можно залогировать ошибку
          }
          
        }
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
