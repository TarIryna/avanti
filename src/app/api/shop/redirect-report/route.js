import Product from '@/models/product';
import Operation from '@/models/operation';
import { connectToDB } from '@/utils/database';
import { OPERATION_TYPE } from '@/constants/constants';
import { getSeasonPriorityByDate } from '@/helpers/getSortParam';
import { buildRedirectReport, getRedirectReportRange } from '@/helpers/redirectReport';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'operations';
    if (!['operations', 'stock'].includes(mode)) {
      return Response.json({ error: 'Невідомий режим звіту' }, { status: 400 });
    }
    const now = new Date();
    let range;
    if (mode === 'operations') {
      try {
        range = getRedirectReportRange(searchParams.get('from'), searchParams.get('to'), now);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 400 });
      }
    }
    await connectToDB();
    let candidates = null;
    const seasons = mode === 'stock' ? getSeasonPriorityByDate(now) : [];
    const filter = {
      $or: [
        { 'sizes_all.1': { $elemMatch: { q: { $gt: 1 } } } },
        ...['2', '3'].map(shop => ({ [`sizes_all.${shop}`]: { $elemMatch: { q: { $gt: 0 } } } })),
      ],
    };
    if (mode === 'operations') {
      const operations = await Operation.find({
        type: { $in: [OPERATION_TYPE.SALE, OPERATION_TYPE.DECREASE, OPERATION_TYPE.TRANSIT] },
        shop: { $in: [1, 2] },
        createdAt: { $gte: range.start, $lt: range.end },
      }).select('code size').lean();
      candidates = new Map();
      for (const operation of operations) {
        const code = String(operation.code);
        if (!Array.isArray(operation.size)) continue;
        for (const item of operation.size) {
          if (!(Number(item.q) > 0) || item.size == null) continue;
          if (!candidates.has(code)) candidates.set(code, new Set());
          candidates.get(code).add(String(item.size));
        }
      }
      filter.code = { $in: [...candidates.keys()] };
    } else {
      filter.season = { $in: seasons };
    }
    const products = await Product.find(filter)
      .select('code model vendor gender season small_image images sizes_all').sort({ code: -1 }).lean();
    if (mode === 'stock') {
      products.sort((a, b) => seasons.indexOf(a.season) - seasons.indexOf(b.season));
    }
    const recommendations = buildRedirectReport(products, candidates);
    const sourceShop = Number(searchParams.get('shop'));
    const rows = [1, 2, 3].includes(sourceShop)
      ? recommendations.map(row => ({ ...row, transfers: row.transfers.filter(item => item.from === sourceShop) }))
          .filter(row => row.transfers.length > 0)
      : recommendations;
    return Response.json({
      mode, rows, seasons, generatedAt: now.toISOString(),
      from: range?.start.toISOString(), to: range?.end.toISOString(),
      totalPairs: rows.reduce((sum, row) => sum + row.transfers.reduce((q, item) => q + item.quantity, 0), 0),
    });
  } catch (error) {
    console.error('GET /api/shop/redirect-report:', error);
    return Response.json({ error: 'Не вдалося сформувати звіт' }, { status: 500 });
  }
};
