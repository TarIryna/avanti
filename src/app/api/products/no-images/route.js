import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { shopEmails } from "@/data/emails";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim().toLowerCase();
  const isAllowed = email && shopEmails.some(
    (allowedEmail) => allowedEmail.trim().toLowerCase() === email
  );

  if (!isAllowed) {
    return Response.json({ message: "Доступ запрещен" }, { status: 403 });
  }

  try {
    await connectToDB();
    const products = await Product.aggregate([
      {
        $match: {
          type: { $in: [1, 3] },
          $expr: {
            $eq: [
              {
                $size: {
                  $filter: {
                    input: { $cond: [{ $isArray: "$images" }, "$images", []] },
                    as: "image",
                    cond: {
                      $and: [
                        { $eq: [{ $type: "$$image" }, "string"] },
                        {
                          $ne: [
                            {
                              $trim: {
                                input: {
                                  $convert: {
                                    input: "$$image",
                                    to: "string",
                                    onError: "",
                                    onNull: "",
                                  },
                                },
                              },
                            },
                            "",
                          ],
                        },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      },
      { $project: { _id: 0, code: 1 } },
      { $sort: { code: 1 } },
    ]);

    return Response.json({ codes: products.map(({ code }) => code) });
  } catch (error) {
    console.error("GET /api/products/no-images error:", error);
    return Response.json({ message: "Не удалось загрузить список товаров" }, { status: 500 });
  }
};
