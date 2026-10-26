import { OPERATION_TYPE } from "@/constants/constants";
import { getDestinationName } from "@/data/destination";
import Operation from "@/models/operation";
import { connectToDB } from "@/utils/database";

const kyivParts = (date) => Object.fromEntries(
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, value])
);

const kyivOffsetAt = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).filter(({ type }) => type !== "literal");
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second) - date.getTime();
};

const yesterdayRangeInKyiv = () => {
  const now = new Date();
  const today = kyivParts(now);
  const yesterday = new Date(Date.UTC(today.year, today.month - 1, today.day - 1));
  const dateKey = (date) => date.toISOString().slice(0, 10);
  const startWallTime = new Date(`${dateKey(yesterday)}T00:00:00.000Z`);
  const endWallTime = new Date(`${dateKey(new Date(Date.UTC(today.year, today.month - 1, today.day)))}T00:00:00.000Z`);
  return {
    date: dateKey(yesterday),
    start: new Date(startWallTime.getTime() - kyivOffsetAt(startWallTime)),
    end: new Date(endWallTime.getTime() - kyivOffsetAt(endWallTime)),
  };
};

export const GET = async (request) => {
  try {
    const shop = Number(new URL(request.url).searchParams.get("shop"));
    if (![1, 2].includes(shop)) {
      return Response.json({ error: "Автоматичне переміщення доступне лише для магазинів 1 і 2" }, { status: 400 });
    }
    const sourceShop = shop === 1 ? 2 : 1;
    const { date, start, end } = yesterdayRangeInKyiv();

    await connectToDB();
    const sourceOperations = await Operation.find({
      type: OPERATION_TYPE.DECREASE,
      shop: sourceShop,
      createdAt: { $gte: start, $lt: end },
    }).populate("product", "code name images sizesGroup").sort({ createdAt: 1 }).lean();
    const legacyDestinationName = getDestinationName(shop);
    const operations = sourceOperations.filter((operation) => {
      if (operation.destination !== undefined && operation.destination !== null) {
        return Number(operation.destination) === shop;
      }
      const comment = String(operation.comment || "").trim();
      return comment === legacyDestinationName
        || comment.startsWith(`${legacyDestinationName} `)
        || comment.startsWith(`${legacyDestinationName}(`);
    });

    const operationIds = operations.map(({ _id }) => String(_id));
    const alreadyArrived = operationIds.length
      ? await Operation.find({
          type: OPERATION_TYPE.ARRIVAL,
          shop,
          sourceOperationId: { $in: operationIds },
        }).distinct("sourceOperationId")
      : [];
    const arrivedSet = new Set(alreadyArrived);
    const items = operations
      .filter((operation) => !arrivedSet.has(String(operation._id)))
      .map((operation) => ({
        id: String(operation._id),
        code: operation.product?.code ?? operation.code,
        name: operation.product?.name ?? "Товар не знайдено в каталозі",
        image: operation.image || operation.product?.images?.[0] || "",
        size: operation.size || [],
        createdAt: operation.createdAt,
        comment: operation.comment || "",
        missingProduct: !operation.product,
      }));

    return Response.json({ shop, sourceShop, date, items });
  } catch (error) {
    console.error("GET /api/shop/arrival-auto error:", error);
    return Response.json({ error: "Не вдалося завантажити списання за вчора" }, { status: 500 });
  }
};
