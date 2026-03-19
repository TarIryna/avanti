import { NextResponse } from "next/server";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export async function GET() {
  await connectToDB();

  const products = await Product.find({}, "code updatedAt").lean();

  const urls = products.map(
    (p) => `
      <url>
        <loc>https://avanti-shoes.com.ua/product/${p.code}</loc>
        <lastmod>${(p.updatedAt || new Date()).toISOString()}</lastmod>
      </url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
