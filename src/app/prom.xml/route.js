import { NextResponse } from "next/server";
import { buildParams } from "@/helpers/buildParams";
import { categories } from "@/data/categories";
import { 
  getMaterialInside, 
  getMaterialTop, 
  getSeason, 
  getColor, 
  getDescription, 
  getStyle, 
  getVendor, 
  getHeels,
  getCountry,
  getName,
  escapeXML
 } from "../../data/getData";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
// export const revalidate = 1800;
export const dynamic = "force-dynamic";

export async function GET() {
  await connectToDB();
  const season = "summer,autumn"
 const products = await Product.find({
   rozetka_id: { $exists: true, $ne: null },
   type: 1,
   year: { $gt: 36 },
   season:  { $in: season.split(",") }
 }).limit(1000).lean()

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
    ${categories
      .map(
        (c) => `<category id="${c.category_id}">${escapeXML(c.name)}</category>`
      )
      .join("\n")}
    </categories>

    <offers>
${products
  ?.flatMap((p) => {
    if (!p.rozetka_id) return [];
    if (!p.price) return [];
    if (!Array.isArray(p.sizes) || p.sizes.length === 0) {
      return [];
    }
    if (!Array.isArray(p.images) || p.images.length === 0) {
      return [];
    }
    return p.sizes?.map((s) => {
      const available = (s.q ?? 0) > 0;

const buildPictures = (images) => {
  if (!images) return "";

  const arr = Array.isArray(images)
    ? images
    : String(images).split(";");

  return arr
    .map((img) => img?.trim())
    .filter(Boolean)
    .map((img) => `<picture>${escapeXML(img)}</picture>`)
    .join("\n");
};

const getPrice = (price, koef) => {
  const result = !!price ? (Math.ceil(price * koef / 10)) * 10 : 0
  return result
}

const mainImage = Array.isArray(p.images) ? p.images[0] : p.small_image;


      return `
      <offer id="${escapeXML(p.code + s.size)}" available="${available}">
        <price>${escapeXML(getPrice(p.price, 1.18) )}</price>
        ${p.price2 > 0 ? `<price_old>${getPrice(p.price2, 1.18)}</price_old>` : ""}
        ${p.price > 0 ? `<promo_price>${getPrice(p.price, 1.12)}</promo_price>` : ""}
        <currencyId>UAH</currencyId>
        <categoryId>${p.rozetka_id}</categoryId>
        <status>${s.q > 0 ? "available" : "not available"}</status>
        <vendor>${escapeXML(getVendor(p.vendor))}</vendor>
        <group_id>${p.code}</group_id>
        <name><![CDATA[${getName(p, s.size, 'ru', true)}]]></name>
        <name_ua><![CDATA[${getName(p, s.size, 'ua', true)}]]></name_ua>
        <description><![CDATA[${getDescription(p.vendor)}.]]></description>
        <description_ua><![CDATA[${getDescription(p.vendor, 'ua')}.]]></description_ua>
        <stock_quantity>${escapeXML(s.q ?? 0)}</stock_quantity>
        <active>${escapeXML(s.q > 0 ? "true" : "false")}</active>
        <image>${escapeXML(mainImage)}</image>

        ${buildPictures(p.images)}

        <param name="Размер">${escapeXML(s.size)}</param>
        <param name="Высота каблука">${getHeels(p.heel)}</param>
        <param name="Страна-производитель товара">${getCountry(p.country)}</param>
        <param name="Материал верха">${getMaterialTop(p.material_top) ?? ""}</param>
        <param name="Материал подкладки">${getMaterialInside(p.material_inside) ?? ""}</param>
        <param name="Сезон">${getSeason(p.season)}</param>
        <param name="Стиль обуви">${getStyle(p.style)}</param>
        <param name="Цвет">${getColor(p.color)}</param>

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
