"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDefaultYear, years } from "@/data";
import { companies } from "@/data/companies";
import { Select } from "@/components/ui";
import { Title } from "@/components/Base/styles";
import * as S from "./styles";

const asNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const ResultsCompanies = () => {
  const defaultYear = getDefaultYear();
  const methods = useForm({ defaultValues: { year: defaultYear?.value ?? "" } });
  const [companiesResults, setCompaniesResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportYear, setReportYear] = useState(defaultYear?.value ?? "");

  const loadResults = useCallback(async ({ year }) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products/results/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось загрузить результаты");
      setCompaniesResults(result.companies || []);
      setReportYear(year);
    } catch (requestError) {
      setError(requestError.message || "Не удалось загрузить результаты");
      setCompaniesResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (defaultYear?.value != null) loadResults({ year: defaultYear.value });
  }, [defaultYear?.value, loadResults]);

  const totals = companiesResults.reduce((sum, company) => {
    sum.received += asNumber(company.received);
    sum.sold += asNumber(company.sold);
    sum.revenue += asNumber(company.revenue);
    sum.cost += asNumber(company.cost);
    sum.result += asNumber(company.result);
    return sum;
  }, { received: 0, sold: 0, revenue: 0, cost: 0, result: 0 });

  const sellThrough = totals.received ? (totals.sold / totals.received) * 100 : 0;
  const profitability = totals.cost ? (totals.result / totals.cost) * 100 : 0;
  const reportYearName = years.find(({ value }) => String(value) === String(reportYear))?.name || "";

  return (
    <section className="container page">
      <S.PrintGlobalStyles />
      <Title>Итоги по поставщикам</Title>
      <S.FilterForm onSubmit={methods.handleSubmit(loadResults)}>
        <Controller
          name="year"
          control={methods.control}
          render={({ field }) => (
            <Select
              options={years}
              label="Год-сезон"
              placeholder="Выберите год-сезон"
              lang="ru"
              isInput
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <S.SubmitButton type="submit" disabled={isLoading || !methods.watch("year")}>
          {isLoading ? "Загрузка…" : "Показать результаты"}
        </S.SubmitButton>
      </S.FilterForm>

      {error && <S.Status role="alert">{error}</S.Status>}
      {!error && <S.Status>Поставщиков в отчете: {companiesResults.length}</S.Status>}

      <S.PrintButton type="button" disabled={!companiesResults.length} onClick={() => window.print()}>
        Печать
      </S.PrintButton>

      <S.PrintArea className="supplier-print-root">
        <S.PrintHeading>Результаты по поставщикам — {reportYearName}</S.PrintHeading>
        <S.TableWrapper className="supplier-print-table-wrapper">
          <S.ResultsTable className="supplier-print-table">
          <thead>
            <tr>
              <th>Поставщик</th>
              <th>Получено, пар</th>
              <th>Продано, пар</th>
              <th>Выручка, USD</th>
              <th>Затраты, USD</th>
              <th>Прибыль, USD</th>
              <th>Продажи, %</th>
              <th>Рентабельность, %</th>
            </tr>
          </thead>
          <tbody>
            {companiesResults.map((company) => {
              const received = asNumber(company.received);
              const sold = asNumber(company.sold);
              const revenue = asNumber(company.revenue);
              const cost = asNumber(company.cost);
              const result = asNumber(company.result);
              const companyName = companies.find(({ id }) => Number(id) === Number(company.company))?.name
                || "Без поставщика";

              return (
                <tr key={company.company ?? "without-company"}>
                  <td>{companyName}</td>
                  <td>{received}</td>
                  <td>{sold}</td>
                  <td>{revenue.toFixed(2)}</td>
                  <td>{cost.toFixed(2)}</td>
                  <S.ProfitCell $value={result}>{result.toFixed(2)}</S.ProfitCell>
                  <td>{(received ? (sold / received) * 100 : 0).toFixed(2)}%</td>
                  <td>{(cost ? (result / cost) * 100 : 0).toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Итого за сезон</td>
              <td>{totals.received}</td>
              <td>{totals.sold}</td>
              <td>{totals.revenue.toFixed(2)}</td>
              <td>{totals.cost.toFixed(2)}</td>
              <S.ProfitCell $value={totals.result}>{totals.result.toFixed(2)}</S.ProfitCell>
              <td>{sellThrough.toFixed(2)}%</td>
              <td>{profitability.toFixed(2)}%</td>
            </tr>
          </tfoot>
          </S.ResultsTable>
        </S.TableWrapper>
      </S.PrintArea>
    </section>
  );
};

export default ResultsCompanies;
