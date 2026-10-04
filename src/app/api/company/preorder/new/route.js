import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Preorder from "@/models/preorder";
import Product from "@/models/product";


export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    console.log('body', body)

    // Создаем накладную
    const order = await Preorder.create(body);

    // Обрабатываем товары
    for (const item of body.items) {
      const product = await Product.findOne({
        code: item.productCode,
      });

      if (!product) {
        console.log(`Товар ${item.productCode} не найден`);
        continue;
      }
    }

    return NextResponse.json(
      {
        order,
        status: "success",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST /api/preorder/new error:", error);

    return NextResponse.json(
      {
        message: "Failed to add preorder",
      },
      { status: 500 }
    );
  }
}