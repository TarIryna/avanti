"use client";

import {
  tabsData,
  views,
  seasons,
  sizes,
  colorsList,
  materialList,
  sortList,
  limits,
} from "@/utils/data";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as S from "./styles";

const Filter = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // универсальная функция для изменения параметров в URL
  const updateParam = (key, value) => {
    const query = new URLSearchParams(searchParams.toString());
    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }
    query.set("page", "1"); // сброс страницы при смене фильтра

    router.push(`/${gender}?${query.toString()}`);
  };

  const gender = params.gender || "";
  const season = searchParams.get("season") || "";
  const view = searchParams.get("view") || "";
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";
  const material = searchParams.get("material") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "24";

  const viewList = views(season, gender);
  const sizesList = sizes();
  const sizesByGender = !gender
    ? sizesList
    : gender === "men"
    ? sizesList.filter((s) => +s > 38)
    : gender === "women"
    ? sizesList.filter((s) => +s > 32 && +s < 44)
    : sizesList.filter((s) => +s < 42);

  const renderOptions = (array, name, currentValue) => (
    <select
      id={name}
      className="filter__select"
      value={currentValue}
      onChange={(e) => updateParam(name, e.target.value)}
    >
      <option value="">
        {name === "season"
          ? "Сезон"
          : name === "gender"
          ? "Стать"
          : name === "color"
          ? "Колір"
          : name === "material"
          ? "Матеріал верху"
          : name === "sort"
          ? "Сортувати за"
          : name === "limits"
          ? "Кількість на сторінці"
          : "Вигляд"}
        :
      </option>
      {array.map((item, index) => (
        <option value={item.query ?? item} key={item.query ?? item ?? index}>
          {item.filterName ?? item.name ?? item}
        </option>
      ))}
    </select>
  );

  const renderSizes = (sizes) => (
    <select
      id="size"
      className="filter__select"
      value={size}
      onChange={(e) => updateParam("size", e.target.value)}
    >
      <option value="">Розмір:</option>
      {sizes.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );

  return (
    <S.FilterWrapper>
      <S.FilterTitle>Фільтри і сортування</S.FilterTitle>
      <div className="filter-wrapper">
        <S.FilterGrid>
          {tabsData && renderOptions(tabsData, "gender", gender)}
          {seasons && renderOptions(seasons, "season", season)}
          {viewList && renderOptions(viewList, "view", view)}
          {sizesByGender && renderSizes(sizesByGender)}
          {colorsList && renderOptions(colorsList, "color", color)}
          {materialList && renderOptions(materialList, "material", material)}
        </S.FilterGrid>
      </div>
      <S.LimitPageWrapper>
        {sortList && renderOptions(sortList, "sort", sort)}
        {limits && renderOptions(limits, "limit", limit)}
      </S.LimitPageWrapper>
    </S.FilterWrapper>
  );
};

export default Filter;
