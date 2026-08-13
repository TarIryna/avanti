import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Invoice from "@/models/invoice";

// ========================
// POST /api/invoice/new
// Добавление одного товара
// ========================
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();


    const invoice = await Invoice.create(body);
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("POST /api/invoice/new error:", error);
    return NextResponse.json({ message: "Failed to add invoice" }, { status: 500 });
  }
}
