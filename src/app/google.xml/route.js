import { getStyle, getDescription, getVendor, getName,getGoogleGender, escapeXML, getColor, getMaterialTop } from "@/data/getData";
import { NextResponse } from "next/server";

export async function GET() {
  const queryString = new URLSearchParams({
    limit: 3000,
    page: 1,
    gender: "all",
  }).toString();

  const res = await fetch(
    `https://avanti-shoes.com.ua/api/products/filter?${queryString}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Avanti</title>
    <link>https://avanti-shoes.com.ua</link>
    <description>Интернет-магазин обуви</description>

${data?.products
  ?.flatMap((p) => {
    if (!p.price || !p.images?.length || !p.sizes?.length) return [];

    return p.sizes.map((s) => {
      const available = (s.q ?? 0) > 0;

      const getPrice = (price, koef) =>
        price ? (Math.ceil(price * koef / 10)) * 10 : 0;

      const mainImage = Array.isArray(p.images)
        ? p.images[0]
        : p.small_image;

      return `
      <item>
        <g:id>${escapeXML(p.code + s.size)}</g:id>

        <title><![CDATA[${getName(p, s.size)}]]></title>
        <description><![CDATA[${getDescription(p.vendor, "ukr")}]]></description>

        <link>https://avanti-shoes.com.ua/product/${p.slug}</link>

        <g:image_link>${escapeXML(mainImage)}</g:image_link>

        <g:price>${p.price} UAH</g:price>
        ${
          p.price2 > 0
            ? `<g:sale_price>${p.price2} UAH</g:sale_price>`
            : ""
        }

        <g:availability>${available ? "in_stock" : "out_of_stock"}</g:availability>

        <g:brand>${escapeXML(getVendor(p.vendor))}</g:brand>

        <g:product_type>${escapeXML(getStyle(p.style))}</g:product_type>

        <g:color>${escapeXML(getColor(p.color))}</g:color>

        <g:size>${escapeXML(s.size)}</g:size>

        <g:material>${escapeXML(getMaterialTop(p.material_top) ?? "")}</g:material>

        <g:condition>new</g:condition>

        <g:gender>${escapeXML(getGoogleGender(s.gender))}</g:gender>
        <g:age_group>${s.gender === 1 || s.gender === 2 ? 'adult' : 'kids'}</g:age_group>

        <g:google_product_category>187</g:google_product_category>

      </item>
      `;
    });
  })
  .join("")}

  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
