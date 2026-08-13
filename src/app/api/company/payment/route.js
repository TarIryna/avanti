import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Payment from "@/models/payment";

// ========================
// POST /api/invoice/new
// Добавление одного товара
// ========================
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();


    const payment = await Payment.create(body);
    return NextResponse.json({success: true, payment}, { status: 201 });
  } catch (error) {
    console.error("POST /api/payment error:", error);
    return NextResponse.json({ message: "Failed to add invoice" }, { status: 500 });
  }
}
