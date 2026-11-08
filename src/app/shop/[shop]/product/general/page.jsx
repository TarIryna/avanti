import Link from "next/link";
import { notFound } from "next/navigation";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import styles from "./styles.module.css";

export const dynamic = "force-dynamic";

const number = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 2 });

export default async function GeneralStockPage({ params }) {
  const shop = Number(params.shop);
  if (!Number.isInteger(shop) || shop < 1) notFound();

  let rows;
  try {
    await connectToDB();
    rows = await Product.aggregate([
      { $unwind: "$total" },
      { $match: { "total.shop": { $in: [shop, String(shop)] } } },
      {
        $group: {
          _id: { $convert: { input: "$price", to: "double", onError: null, onNull: null } },
          quantity: {
            $sum: { $convert: { input: "$total.q", to: "double", onError: 0, onNull: 0 } },
          },
        },
      },
      { $match: { quantity: { $ne: 0 } } },
      { $sort: { _id: 1 } },
    ]);
  } catch (error) {
    console.error("General shop stock report failed:", error);
    return (
      <section className={`container page ${styles.report}`}>
        <Link href={`/shop/${shop}/product`}>← До товарів</Link>
        <h1>Залишки за цінами · Магазин {shop}</h1>
        <p role="alert">Не вдалося завантажити звіт. Оновіть сторінку.</p>
      </section>
    );
  }

  const total = rows.reduce((sum, row) => sum + row.quantity, 0);

  return (
    <section className={`container page ${styles.report}`}>
      <Link href={`/shop/${shop}/product`}>← До товарів</Link>
      <h1>Залишки за цінами · Магазин {shop}</h1>
      <p>Поточні залишки всіх товарів за ціною продажу (price).</p>
      {rows.length ? (
        <table className={styles.table}>
          <caption className={styles.caption}>Залишки магазину {shop}</caption>
          <thead><tr><th scope="col">Ціна</th><th scope="col">Кількість пар</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id ?? "no-price"}>
                <td>{row._id === null ? "Без ціни" : `${number.format(row._id)} грн`}</td>
                <td>{number.format(row.quantity)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><th scope="row">Всього</th><td>{number.format(total)}</td></tr></tfoot>
        </table>
      ) : <p>Немає даних про залишки цього магазину.</p>}
    </section>
  );
}
