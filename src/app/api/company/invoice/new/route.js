import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Invoice from "@/models/invoice";
import Product from "@/models/product";

// ========================
// POST /api/invoice/new
// ========================
// export async function POST(req) {
//   try {
//     await connectToDB();
//     const body = await req.json();
//     console.log(body)
//     const invoice = await Invoice.create(body);
//     return NextResponse.json({invoice, status: "success"}, { status: 201 });
//   } catch (error) {
//     console.error("POST /api/invoice/new error:", error);
//     return NextResponse.json({ message: "Failed to add invoice" }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();

    // Создаем накладную
    const invoice = await Invoice.create(body);

    // Обрабатываем товары
    for (const item of body.items) {
      const product = await Product.findOne({
        code: item.productCode,
      });

      if (!product) {
        console.log(`Товар ${item.productCode} не найден`);
        continue;
      }

      // =========================
      // 1. totalCount
      // =========================

      product.totalCount =
        (product.totalCount || 0) + item.quantity;


      // =========================
      // 2. total
      // =========================
     if (!(product.total instanceof Map)) {
      product.total = new Map();
    }
      const INVOICE_SHOP_ID = 3; 

      let currentShop = product.total.find(element => element.shop === INVOICE_SHOP_ID);

      if (currentShop) {
        console.log('Обновляем существующий склад 3. Было:', currentShop.q);
        currentShop.q = (Number(currentShop.q) || 0) + Number(item.quantity);
      } else {
        // Если элемента со shop = 3 ещё нет в массиве — создаем его с начальным количеством
        console.log('Склад 3 не найден в массиве, создаем новую запись');
        
        product.total.push({
          shop: INVOICE_SHOP_ID,
          q: Number(item.quantity),
        });
      }


      // =========================
      // 3. sizes
      // =========================

      if (!Array.isArray(product.sizes)) {
        product.sizes = [];
      }

      for (const newSize of item.sizes) {
        const existingSize = product.sizes.find(
          (size) => size.size === newSize.size
        );

        if (existingSize) {
          existingSize.q =
            (existingSize.q || 0) + (newSize.q || 0);
        } else {
          product.sizes.push({
            size: newSize.size,
            q: newSize.q || 0,
          });
        }
      }


      // =========================
      // 4. sizes_all
      // =========================

      if (!product.sizes_all) {
        product.sizes_all = {};
      }

      if (!Array.isArray(product.sizes_all["3"])) {
        product.sizes_all["3"] = [];
      }

      for (const newSize of item.sizes) {
        const existingSize =
          product.sizes_all["3"].find(
            (size) => size.size === newSize.size
          );

        if (existingSize) {
          existingSize.q =
            (existingSize.q || 0) + (newSize.q || 0);
        } else {
          product.sizes_all["3"].push({
            size: newSize.size,
            q: newSize.q || 0,
          });
        }
      }


      // Mongoose
      product.markModified("total");
      product.markModified("sizes");
      product.markModified("sizes_all");

      await product.save();
    }

    return NextResponse.json(
      {
        invoice,
        status: "success",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST /api/invoice/new error:", error);

    return NextResponse.json(
      {
        message: "Failed to add invoice",
      },
      { status: 500 }
    );
  }
}