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
import { FilterSelect } from "./FilterSelect";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import * as S from "./styles";

const Filter = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

    // универсальная функция для изменения параметров в URL
    const updateParam = (key, value) => {
      const query = new URLSearchParams(searchParams.toString());
      let genderValue = gender;
      if (value) {
        switch (key) {
          case "gender":
            genderValue = value;
            break;
          default:
            query.set(key, value);
        }
      } else {
        query.delete(key);
      }
      query.set("page", "1"); // сброс страницы при смене фильтра
  
      router.push(`/${genderValue}?${query.toString()}`);
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
          {tabsData && <FilterSelect options={tabsData} label="gender" currentValue={gender} updateParam={updateParam}/>}
          {seasons && <FilterSelect options={seasons} label="season" currentValue={season} updateParam={updateParam}/>}
          {viewList && <FilterSelect options={viewList} label="view" currentValue={view} updateParam={updateParam}/> }
          {sizesByGender && renderSizes(sizesByGender)}
          {colorsList && <FilterSelect options={colorsList} label="color" currentValue={color} updateParam={updateParam}/>}
          {materialList && <FilterSelect options={materialList} label="material" currentValue={material} updateParam={updateParam}/> }
        </S.FilterGrid>
      </div>
      <S.LimitPageWrapper>
        {sortList && <FilterSelect options={sortList} label="sort" currentValue={sort} updateParam={updateParam}/>}
        {limits &&  <FilterSelect options={limits} label="limit" currentValue={limit} updateParam={updateParam}/> }
      </S.LimitPageWrapper>
    </S.FilterWrapper>
  );
};

export default Filter;
