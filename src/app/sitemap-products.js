import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic"; // важно!

export default async function sitemap() {
  await connectToDB();

  const products = await Product.find({}, "code updatedAt").lean();

  return products.map((p) => ({
    url: `https://avanti-shoes.com.ua/product/${p.code}`,
    lastModified: p.updatedAt || new Date(),
  }));
}
