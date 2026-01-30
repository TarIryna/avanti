import { NextResponse } from "next/server";
import { fetchProductsByParams } from "@/helpers/useFetchProducts";

export async function GET() {
  const queryString = new URLSearchParams({
    limit: 3000,
    page: 1,
    gender: 'all',
  }).toString();
  const res = await fetch(
      `https://avanti-shoes.com.ua/api/products/filter?${queryString}`,
      { cache: "no-store" }
    );// твои товары,
  const data =  await res.json();
  console.log('length', data?.products?.length)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Avanti catalog</title>
<link>https://avanti-shoes.com.ua</link>
<description>Каталог товарів Avanti</description>

${data?.products?.map(
    (p) => `
<item>
  <g:id>${p.code}</g:id>
  <g:title><![CDATA[${p.name}]]></g:title>
  <g:description><![CDATA[${p.name}]]></g:description>
  <g:link>https://avanti-shoes.com.ua/product/${p.code}</g:link>
  <g:image_link>${p.image1 ?? p.image ?? p.image2 ?? p.image3 ?? p.small_image}</g:image_link>
  <g:price>${p.price} UAH</g:price>
  <g:gender>${p.gender}</g:gender>
  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>Avanti</g:brand>
  <g:google_product_category><![CDATA[${ p.facebook || "Clothing & Accessories > Shoes & Footwear > Shoes"}]]></g:google_product_category>
</item>
`
  )
  ?.join("")}

</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
