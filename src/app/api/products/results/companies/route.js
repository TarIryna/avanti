import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { baseEmails } from "@/data/emails";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim().toLowerCase();
  const isAllowed = email && baseEmails.some(
    (allowedEmail) => allowedEmail.trim().toLowerCase() === email
  );

  if (!isAllowed) {
    return Response.json({ message: "Доступ запрещен" }, { status: 403 });
  }

  try {
    const { year } = await request.json();
    const yearValue = Number(year);
    if (!Number.isFinite(yearValue)) {
      return Response.json({ message: "Укажите год-сезон" }, { status: 400 });
    }

    await connectToDB();
    const companies = await Product.aggregate([
      { $match: { year: yearValue, totalGot: { $gt: 0 } } },
      {
        $group: {
          _id: "$company",
          received: {
            $sum: { $convert: { input: "$totalGot", to: "double", onError: 0, onNull: 0 } },
          },
          sold: {
            $sum: { $convert: { input: "$pop", to: "double", onError: 0, onNull: 0 } },
          },
          revenue: {
            $sum: { $convert: { input: "$res", to: "double", onError: 0, onNull: 0 } },
          },
          cost: {
            $sum: { $convert: { input: "$start", to: "double", onError: 0, onNull: 0 } },
          },
        },
      },
      {
        $addFields: {
          company: "$_id",
          result: { $subtract: ["$revenue", "$cost"] },
        },
      },
      {
        $addFields: {
          profitability: {
            $cond: [
              { $ne: ["$cost", 0] },
              { $multiply: [{ $divide: ["$result", "$cost"] }, 100] },
              0,
            ],
          },
        },
      },
      { $sort: { profitability: -1, result: -1, company: 1 } },
      { $project: { _id: 0, company: 1, received: 1, sold: 1, revenue: 1, cost: 1, result: 1 } },
    ]);

    return Response.json({ companies });
  } catch (error) {
    console.error("POST /api/products/results/companies error:", error);
    return Response.json(
      { message: "Не удалось загрузить результаты", error: error.message },
      { status: 500 }
    );
  }
};
