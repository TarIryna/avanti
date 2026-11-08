import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const query = new URL(request.url).searchParams.get("query")?.trim();
  if (!query) return Response.json({ products: [] });

  try {
    await connectToDB();

    // Codes and barcodes can contain letters as well as digits.
    const exact = await Product.findOne({
      $or: [{ code: query }, { barcodes: query }],
    }).lean();
    if (exact) return Response.json({ products: [exact] });

    const words = query.split(/\s+/).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const products = await Product.find({
      $and: words.map((word) => ({
        $or: ["code", "barcodes", "model", "name"].map((field) => ({
          [field]: { $regex: word, $options: "i" },
        })),
      })),
    }).sort({ code: 1, _id: 1 }).limit(50).lean();

    return Response.json({ products });
  } catch (error) {
    console.error("Shop product search failed:", error);
    return Response.json({ error: "Failed to search products" }, { status: 500 });
  }
};
