"use client";
import {
  tabsData,
  views,
  seasons,
  sizes,
  colorsList,
  materialList,
  sortList,
  pageSizes,
} from "@/utils/data";
import { useState } from "react";
import {
  changeFilterAction,
  changeQauntityAction,
} from "@/store/actions/products";

const Filter = () => {
  const [season, setSeason] = useState("");
  const [gender, setGender] = useState("");
  const [view, setView] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [pageSize, setPageSize] = useState(24);

  const viewList = views(season, gender);
  const sizesList = sizes();
  const sizesByGender = !gender
    ? sizesList
    : gender === "men"
    ? sizesList.filter((size) => +size > 38)
    : gender === "women"
    ? sizesList.filter((size) => +size > 32 && +size < 44)
    : sizesList.filter((size) => +size < 42);

  const selectSeason = (e) => {
    setSeason(e.target.value);
    setView("");
  };
  const selectGender = (e) => {
    setGender(e.target.value);
    setView("");
  };
  const selectView = (e) => {
    setView(e.target.value);
  };
  const selectSize = (e) => {
    setSize(e.target.value);
  };
  const selectColor = (e) => {
    setColor(e.target.value);
  };
  const selectMaterial = (e) => {
    setMaterial(e.target.value);
  };
  const selectSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const selectPageSize = (e) => {
    setPageSize(+e.target.value);
    changeQauntityAction(+e.target.value);
  };

  const setFilter = () => {
    changeFilterAction({
      season,
      view,
      size,
      gender,
      color,
      material,
      sortBy,
      pageSize,
    });
  };

  const renderOptions = (array, name) => (
    <select
      id={name}
      className="filter__select"
      onChange={
        name === "season"
          ? selectSeason
          : name === "gender"
          ? selectGender
          : name === "color"
          ? selectColor
          : name === "material"
          ? selectMaterial
          : name === "sortBy"
          ? selectSortBy
          : name === "pageSizes"
          ? selectPageSize
          : selectView
      }
    >
      <option value="" key="0">
        {name === "season"
          ? "Сезон"
          : name === "gender"
          ? "Стать"
          : name === "color"
          ? "Колір"
          : name === "material"
          ? "Матеріал верху"
          : name === "sortBy"
          ? "Сортувати за"
          : name === "pageSizes"
          ? "Кількість на сторінці"
          : "Вигляд"}
        :
      </option>
      {array.length > 0 &&
        array.map((item, index) => (
          <option value={item.query} id={item.query} key={item.query}>
            {item.filterName ?? item.name}
          </option>
        ))}
    </select>
  );

  const renderSizes = (sizes) => (
    <select id={size} className="filter__select" onChange={selectSize}>
      <option value="">Розмір:</option>
      {sizes.length > 0 &&
        sizes.map((item) => (
          <option value={item} id={item}>
            {item}
          </option>
        ))}
    </select>
  );

  return (
    <div className="filter__container w-full">
      <h3 className="text-center">Фільтри і сортування</h3>
      <div className="filter-wrapper">
        <div className="filter-grid">
          {tabsData && renderOptions(tabsData, "gender")}
          {seasons && renderOptions(seasons, "season")}
          {viewList && renderOptions(viewList, "view")}
          {sizesByGender && renderSizes(sizesByGender)}
          {colorsList && renderOptions(colorsList, "color")}
          {materialList && renderOptions(materialList, "material")}
        </div>
        <button className="filter-button" onClick={setFilter}>
          Застосувати фільтри
        </button>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        {sortList && renderOptions(sortList, "sortBy")}
        {pageSizes && renderOptions(pageSizes, "pageSizes")}
      </div>
    </div>
  );
};

export default Filter;
