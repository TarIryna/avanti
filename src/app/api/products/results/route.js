import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const dynamic = "force-dynamic";

const values = (value) => {
  if (Array.isArray(value)) return value.filter((item) => item !== "" && item != null);
  if (value == null || value === "") return [];
  return String(value).split(",").filter(Boolean);
};

export const POST = async (request) => {
  try {
    await connectToDB();
    const {
      type,
      season,
      gender,
      view,
      vendor,
      color,
      country,
      material,
      year,
      yearMinus,
      yearPlus,
      page = 1,
      limit = 2000,
    } = await request.json();

    const filter = { totalGot: { $gt: 0 } };
    if (type !== "" && type != null) filter.type = Number(type);

    const seasonValues = values(season).map(Number).filter(Number.isFinite);
    if (seasonValues.length) filter.season = { $in: seasonValues };

    const genderValues = values(gender).map(Number).filter(Number.isFinite);
    if (genderValues.length) filter.gender = { $in: genderValues };

    const vendorValues = values(vendor).map(Number).filter(Number.isFinite);
    if (vendorValues.length) filter.vendor = { $in: vendorValues };

    const colorValues = values(color).map(Number).filter(Number.isFinite);
    if (colorValues.length) filter.color = { $in: colorValues };

    const countryValues = values(country).map(Number).filter(Number.isFinite);
    if (countryValues.length) filter.country = { $in: countryValues };

    if (view) filter.view = view;
    if (material !== "" && material != null) filter.material = Number(material);

    if (yearPlus || yearMinus) {
      filter.year = {};
      if (yearPlus) filter.year.$gte = Number(yearPlus);
      if (yearMinus) filter.year.$lte = Number(yearMinus);
    } else if (year !== "" && year != null) {
      filter.year = Number(year);
    }

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(2000, Math.max(1, Number(limit) || 2000));

    const [result] = await Product.aggregate([
      { $match: filter },
      {
        $addFields: {
          activityResult: {
            $subtract: [
              { $convert: { input: "$res", to: "double", onError: 0, onNull: 0 } },
              { $convert: { input: "$start", to: "double", onError: 0, onNull: 0 } },
            ],
          },
        },
      },
      {
        $facet: {
          products: [
            { $sort: { activityResult: -1, res: -1, code: 1 } },
            { $skip: (safePage - 1) * safeLimit },
            { $limit: safeLimit },
          ],
          meta: [{ $count: "total" }],
        },
      },
    ]);

    const products = result?.products ?? [];
    const total = result?.meta?.[0]?.total ?? 0;

    return Response.json({ products, total, pages: Math.ceil(total / safeLimit) });
  } catch (error) {
    console.error("POST /api/products/results error:", error);
    return Response.json({ error: "Failed to fetch product results", message: error.message }, { status: 500 });
  }
};
