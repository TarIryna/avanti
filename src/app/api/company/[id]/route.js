import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Invoice from "@/models/invoice";
import Payment from "@/models/payment";
import { years } from "@/data";
import { lastSeasonValue } from "@/data";


export const GET = async (req, { params }) => {
    try {
  await connectToDB();

  const { id } = params;
  const invoices = await Invoice.find({company: id, season: lastSeasonValue})
  const payments = await Payment.find({company: id, season: lastSeasonValue})

 return NextResponse.json({invoices, payments}, { status: 200 });
} catch (error) {
    console.error("GET /api/company/[id] error:", error);
    return NextResponse.json({ invoices: [], payments: [] }, { status: 500 });
  }
};