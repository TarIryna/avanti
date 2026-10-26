import Barcodes from "@/models/barcodes";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectToDB();

    const shopParam = new URL(request.url).searchParams.get("shop");
    const filter = shopParam === null ? {} : { shop: Number(shopParam) };
    const barcodeRecords = await Barcodes.find(filter).lean();
    const codes = [...new Set(barcodeRecords.map(({ code }) => String(code)))];
    const products = await Product.find({ code: { $in: codes.map(Number) } }).lean();
    const productsByCode = new Map(products.map((product) => [String(product.code), product]));

    const labels = barcodeRecords.flatMap((record) => {
      const product = productsByCode.get(String(record.code));
      const amount = Math.max(0, Math.floor(Number(record.amount) || 0));
      return product ? Array.from({ length: amount }, () => product) : [];
    });

    return Response.json(labels);
  } catch (error) {
    console.error("GET /api/shop/barcodes error:", error);
    return Response.json({ error: "Failed to fetch barcodes", message: error.message }, { status: 500 });
  }
};
