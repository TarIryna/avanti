import Product from "@/models/product";
import Label from "@/models/label";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

// 1. Получение товаров, у которых есть лейблы
export const GET = async (request) => {
      try {
        await connectToDB();
      const url = new URL(request.url);
      const shopParam = url.searchParams.get("shop");
      const exactShop = url.searchParams.get("exact") === "1";
      const shopId = shopParam === null ? null : Number(shopParam);
      const filter = shopParam === null
        ? {}
        : exactShop && shopId !== 0
          ? { shop: shopId }
          : exactShop
            ? { $or: [{ shop: 0 }, { shop: { $exists: false } }, { shop: null }] }
            : { $or: [{ shop: shopId }, { shop: 0 }, { shop: { $exists: false } }, { shop: null }] };
      const labelRecords = await Label.find(filter, { code: 1, shop: 1, _id: 0 }).lean();
      const codes = labelRecords.map(({ code }) => String(code));
      const products = await Product.find({ code: { $in: codes.map(Number) } }).lean();
      const productsByCode = new Map(products.map((product) => [String(product.code), product]));
      const labels = labelRecords
        .map(({ code, shop }) => {
          const product = productsByCode.get(String(code));
          return product ? { ...product, labelShop: shop ?? 0 } : null;
        })
        .filter(Boolean);

            return new Response(JSON.stringify(labels), {
            status: 200,
            headers: { "Content-Type": "application/json" }
            });

      } catch (error) {
            console.error("❌ API labels error:", error);
            // Исправлено: возвращаем JSON даже в случае ошибки, чтобы фронтенд не ломался
            return new Response(JSON.stringify({ error: "Failed to fetch labels", message: error.message }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
            });
        }
}

export const POST = async (request) => {
  try {
    const { code, shop } = await request.json();
    const productCode = String(code ?? "").trim();
    const shopId = shop == null || shop === "" ? 0 : Number(shop);
    if (!productCode) {
      return Response.json({ error: "Product code is required" }, { status: 400 });
    }
    if (!Number.isInteger(shopId) || ![0, 1, 2].includes(shopId)) {
      return Response.json({ error: "Invalid shop" }, { status: 400 });
    }

    await connectToDB();
    const product = await Product.findOne({
      $or: [{ code: productCode }, { barcodes: { $in: [productCode] } }],
    }).select("code").lean();

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const label = await Label.create({ code: product.code, shop: shopId });
    return Response.json({ success: true, label: { code: label.code } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/shop/labels error:", error);
    return Response.json({ error: "Failed to add product label" }, { status: 500 });
  }
};

// 2. Удаление ВСЕХ записей из таблицы labels
export const DELETE = async (request) => {
  try {
    await connectToDB();

    const shopParam = new URL(request.url).searchParams.get("shop");
    let filter = {};
    if (shopParam !== null) {
      const shopId = Number(shopParam);
      if (!Number.isInteger(shopId) || ![0, 1, 2].includes(shopId)) {
        return Response.json({ error: "Invalid shop" }, { status: 400 });
      }
      const includeGlobal = new URL(request.url).searchParams.get("includeGlobal") === "1";
      if (shopId === 0 || includeGlobal) {
        const shops = shopId === 0 ? [0] : [shopId, 0];
        filter = { $or: [
          { shop: { $in: shops } },
          ...(shops.includes(0) ? [{ shop: { $exists: false } }, { shop: null }] : []),
        ] };
      } else {
        filter = { shop: shopId };
      }
    }

    const deleteResult = await Label.deleteMany(filter);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "All labels deleted successfully", 
      deletedCount: deleteResult.deletedCount 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API labels DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete labels", message: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
