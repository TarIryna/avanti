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

export async function PUT(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { _id, ...paymentData } = body;

    if (!_id) {
      return NextResponse.json({ message: "Payment id is required" }, { status: 400 });
    }

    const payment = await Payment.findByIdAndUpdate(_id, paymentData, {
      new: true,
      runValidators: true,
    });

    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, payment }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/company/payment error:", error);
    return NextResponse.json({ message: "Failed to update payment" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Payment id is required" }, { status: 400 });
    }

    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/company/payment error:", error);
    return NextResponse.json({ message: "Failed to delete payment" }, { status: 500 });
  }
}
