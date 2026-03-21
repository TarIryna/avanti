import { NextResponse } from "next/server";
import { buildParams } from "./buildParams";

const escapeXML = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

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
  data.products.forEach(p => {
  Object.entries(p).forEach(([key, value]) => {
    if (typeof value === "string" && value.includes("&")) {
      console.log("BAD FIELD:", key, value);
    }
  });
});


  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>Avanti</name>
    <company>Avanti</company>
    <url>https://avanti-shoes.com.ua</url>

    <currencies>
      <currency id="UAH" rate="1"/>
    </currencies>

    <categories>
      <category id="1">Взуття</category>
      <category id="2">Сумки</category>
    </categories>

    <offers>
${data?.products
  ?.flatMap((p) => {
    if (!Array.isArray(p.sizes2) || p.sizes2.length === 0) {
      return [];
    }

    return p.sizes2.map((s) => {
      const available = (s.q ?? 0) > 0;

      return `
      <offer id="${escapeXML(p.code + s.size)}" available="${available}">
        <price>${escapeXML(p.price)}</price>
        <currencyId>UAH</currencyId>
        <categoryId>${p.type === "bags" ? 2 : 1}</categoryId>

        <picture>${escapeXML(p.image1)}</picture>

        <vendor>${escapeXML(p.vendor ?? "")}</vendor>

        <name><![CDATA[${p.name} ${s.size}]]></name>
        <description><![CDATA[${p.description ?? p.name}]]></description>

        <stock_quantity>${escapeXML(s.q ?? 0)}</stock_quantity>

        <param name="Розмір">${escapeXML(s.size)}</param>

       ${buildParams(p, escapeXML)}
      </offer>
      `;
    });
  })
  .join("")}
    </offers>
  </shop>
</yml_catalog>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
