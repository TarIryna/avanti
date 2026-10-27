"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useUserSession } from "@/fetchActions/user/useUser";
import { baseEmails, colors, genders, materialData, seasonData, types, vendors, views, years, getDefaultYear } from "@/data";
import { companies } from "@/data/companies";
import { Select } from "@/components/ui";
import { Title } from "../../styles";
import ImageWrapper from "@/components/Product/ImageWrapper";
import * as S from "./styles";

const filterFields = [
  { name: "type", label: "Тип товару", options: types },
  { name: "season", label: "Сезон", options: seasonData, isMulti: true },
  { name: "gender", label: "Стать", options: genders, isMulti: true },
  { name: "view", label: "Вид товару", options: views },
  { name: "vendor", label: "Марка", options: vendors, isMulti: true },
  { name: "color", label: "Колір", options: colors, isMulti: true },
  { name: "company", label: "Поставщик", options: companies, isMulti: true },
  { name: "material", label: "Матеріал", options: materialData },
  { name: "year", label: "Рік-сезон", options: years },
  { name: "yearMinus", label: "До року-сезону", options: years },
  { name: "yearPlus", label: "Від року-сезону", options: years },
];

const asNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const ProductsLidersPage = () => {
  const { data: user, isLoading: isUserLoading } = useUserSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const defaultYear = getDefaultYear();
  const methods = useForm({
    defaultValues: {
      type: 1,
      season: [],
      gender: [],
      view: "",
      vendor: [],
      color: [],
      company: [],
      material: "",
      year: defaultYear?.value ?? "",
      yearMinus: "",
      yearPlus: "",
    },
  });
  const getValues = methods.getValues;

  const loadResults = useCallback(async (filters) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/products/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || result.error || "Не вдалося завантажити результати");
      setProducts(result.products || []);
    } catch (requestError) {
      setError(requestError.message || "Не вдалося завантажити результати");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsAdmin(!!user && baseEmails.includes(user.email));
  }, [user]);

  useEffect(() => {
    if (isAdmin) loadResults(getValues());
  }, [isAdmin, loadResults, getValues]);

  const onSubmit = (data) => loadResults(data);

  if (isUserLoading) return null;
  if (!isAdmin) {
    return <section className="container page"><S.Status>Немає доступу до результатів.</S.Status></section>;
  }

  return (
    <section className="container page">
      <S.PrintGlobalStyles />
      <Title>Лідери продажу</Title>
      <FormProvider {...methods}>
        <S.Form onSubmit={methods.handleSubmit(onSubmit)}>
          {filterFields.map(({ name, label, options, isMulti }, index) => (
            <Controller
              key={name}
              name={name}
              control={methods.control}
              render={({ field }) => (
                <Select
                  options={options}
                  label={label}
                  placeholder={`Оберіть: ${label.toLowerCase()}`}
                  isInput
                  isMulti={isMulti}
                  value={field.value}
                  onChange={field.onChange}
                  tabIndex={index + 1}
                />
              )}
            />
          ))}
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Завантаження…" : "Показати результати"}
          </S.SubmitButton>
        </S.Form>
      </FormProvider>

      {error && <S.Status role="alert">{error}</S.Status>}
      {!error && !isLoading && <S.Status>Знайдено товарів: {products.length}</S.Status>}
      <S.PrintButton type="button" disabled={!products.length} onClick={() => window.print()}>
        Друк списку
      </S.PrintButton>
      <S.ResultsScroll className="results-print-root">
        <S.ResultsTable className="results-print-table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Код</th>
              <th>Марка</th>
              <th>Модель</th>
              <th>Витрати, USD</th>
              <th>Виручка, USD</th>
              <th>Отримано, пар</th>
              <th>Продано, пар</th>
              <th>Результат, USD</th>
              <th>Продажі, %</th>
              <th>Рентабельність, %</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const start = asNumber(product.start);
              const revenue = asNumber(product.res);
              const totalGot = asNumber(product.totalGot);
              const sold = asNumber(product.pop);
              const result = asNumber(product.activityResult ?? revenue - start);
              const sellThrough = totalGot ? (sold / totalGot) * 100 : 0;
              const profitability = start ? (result / start) * 100 : 0;
              const image = product.small_image || product.images?.[0];

              return (
                <tr key={product._id || product.code}>
                  <td>
                    <S.ResultImage className="results-print-image">
                      {image && <ImageWrapper src={image} alt={`Товар ${product.code}`} fill />}
                    </S.ResultImage>
                  </td>
                  <td>{product.code}</td>
                  <td>{vendors.find(({ id }) => Number(id) === Number(product.vendor))?.name || ""}</td>
                  <td>{product.model || product.name || ""}</td>
                  <td>{start.toFixed(2)}</td>
                  <td>{revenue.toFixed(2)}</td>
                  <td>{totalGot}</td>
                  <td>{sold}</td>
                  <td>{result.toFixed(2)}</td>
                  <td>{sellThrough.toFixed(2)}%</td>
                  <td>{profitability.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </S.ResultsTable>
      </S.ResultsScroll>
    </section>
  );
};

export default ProductsLidersPage;
