import { NextResponse } from "next/server";
import { buildParams } from "./buildParams";

export async function GET() {
  const queryString = new URLSearchParams({
    limit: 3000,
    page: 1,
    gender: 'all',
  }).toString();

  const res = await fetch(
    `https://avanti-shoes.com.ua/api/products/filter?${queryString}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  console.log(data?.products[0]);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<offers>
${data?.products?.flatMap((p) => {
  // если sizes2 пустое или не массив — пропускаем
  if (!Array.isArray(p.sizes2) || p.sizes2.length === 0) {
    return [];
  }

  return p.sizes2.map((s) => `
  <offer id="${p.code}${s.size}">
    <price>${p.price}</price>
    <stock_quantity>${s.q ?? 0}</stock_quantity>
    <vendor>${p.vendor ?? 0}</vendor>

    <name><![CDATA[${p.name} ${s.size}]]></name>
    <description><![CDATA[${p.description ?? p.name}]]></description>

    <param name="Size">${s.size}</param>

    ${buildParams(p)}
  </offer>
  `);
}).join("")}
</offers>`;


  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
