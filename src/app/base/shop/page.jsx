"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import Operations from "@/components/modals/ReportsModal/Operations";
import ButtonArrival from "@/components/Shop/ButtonArrival";
import { spendings as spendingTypes } from "@/data/spendings";
import * as S from "./styles";

const getTodayInKyiv = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date()).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

const formatMoney = (value) => new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH",
  maximumFractionDigits: 2,
}).format(Number(value) || 0);

const ShopReportPage = () => {
  const [date, setDate] = useState(getTodayInKyiv);
  const [shop, setShop] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadReport = async (event) => {
    event.preventDefault();
    if (!date || !shop || Number(shop) <= 0) {
      setError("Вкажіть дату та коректний номер магазину.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);
    try {
      const response = await fetch(`/api/shop/day/${encodeURIComponent(shop)}?start=${date}&end=${date}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не вдалося отримати звіт");
      setReport(result);
    } catch (requestError) {
      setError(requestError.message || "Не вдалося отримати звіт");
    } finally {
      setLoading(false);
    }
  };

  const operations = report?.operations || [];
  const netQuantity = operations.reduce((total, operation) => total + Number(operation.quantity || 0), 0);
  const salesTotal = operations.reduce((total, operation) => total - Number(operation.quantity || 0) * Number(operation.salePrice || 0), 0);
  const terminalTotal = operations.reduce((total, operation) => total - Number(operation.quantity || 0) * Number(operation.terminal || 0), 0);
  const totalSpendings = (report?.spendings || []).reduce((total, spending) => total + Number(spending.amount || 0), 0);
  const getSpendingName = (type) => spendingTypes.find((item) => item.id === Number(type))?.ukr || `Тип ${type}`;

  return (
    <section className="container page">
      <S.Title>Звіт магазину за день</S.Title>
      <S.Form onSubmit={loadReport}>
        <S.Field>
          <span>Дата</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </S.Field>
        <S.Field>
          <span>Номер магазину</span>
          <input type="number" min="1" step="1" value={shop} onChange={(event) => setShop(event.target.value)} placeholder="Наприклад, 1" required />
        </S.Field>
        <Button type="submit" disabled={loading}>{loading ? "Завантаження…" : "Показати звіт"}</Button>
      </S.Form>
      {[1, 2].includes(Number(shop)) && (
        <S.ArrivalAction>
          <ButtonArrival shop={shop} label="Прихід зі списань за вчора" />
          <span>Для магазину {shop} будуть запропоновані списання магазину {Number(shop) === 1 ? 2 : 1}.</span>
        </S.ArrivalAction>
      )}

      {error && <S.Error role="alert">{error}</S.Error>}

      {report && (
        <S.Report>
          <S.ReportTitle>Магазин {report.shop} · {date}</S.ReportTitle>
          <S.Metrics>
            <S.Metric><span>Залишок товару</span><strong>{report.total ?? 0} пар</strong></S.Metric>
            <S.Metric><span>Зміна кількості за день</span><strong>{netQuantity} пар</strong></S.Metric>
            <S.Metric><span>Продажі / повернення</span><strong>{formatMoney(salesTotal)}</strong></S.Metric>
            <S.Metric><span>Оплата терміналом</span><strong>{formatMoney(terminalTotal)}</strong></S.Metric>
            <S.Metric><span>Готівка</span><strong>{formatMoney(salesTotal - terminalTotal)}</strong></S.Metric>
            <S.Metric><span>Витрати</span><strong>{formatMoney(totalSpendings)}</strong></S.Metric>
          </S.Metrics>

          <S.SectionTitle>Операції ({operations.length})</S.SectionTitle>
          <S.TableScroll><Operations operations={operations} /></S.TableScroll>

          <S.SectionTitle>Витрати ({report.spendings?.length || 0})</S.SectionTitle>
          {report.spendings?.length ? (
            <S.TableScroll>
              <S.Table>
                <thead><tr><th>Тип</th><th>Сума</th><th>Коментар</th><th>Час</th></tr></thead>
                <tbody>
                  {report.spendings.map((spending) => (
                    <tr key={spending._id}>
                      <td>{getSpendingName(spending.type)}</td>
                      <td>{formatMoney(spending.amount)}</td>
                      <td>{spending.comment || "—"}</td>
                      <td>{new Date(spending.createdAt).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Kyiv" })}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TableScroll>
          ) : <S.Empty>Витрат за цей день немає.</S.Empty>}
        </S.Report>
      )}
    </section>
  );
};

export default ShopReportPage;
