"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProducts } from "@/store/selectors";
import {
  fetchProductsByParams,
  fetchProductsByQuery,
  fetchProductsMain,
} from "@/helpers/useFetchProducts";
import {
  changeQueryAction,
  changeGenderAction,
  changeSeasonAction,
  changePageAction,
} from "@/store/actions/products";

import Loading from "@/app/loading";
import SeasonTabs from "./SeasonTabs";
import List from "./CardList";
import Filter from "./Filter";
import { Pagination } from "@mui/material";

const Collection = () => {
  const productsData = useProducts();
  const pathParams = useParams();
  if (!productsData.gender && pathParams?.gender?.length > 0)
    changeGenderAction(pathParams.gender);
  if (!productsData.season && pathParams?.season?.length > 0) {
    changeSeasonAction(pathParams.season);
  }

  const gender = productsData.gender ?? pathParams.gender ?? null;
  const view = productsData.view ?? pathParams.view ?? null;
  const season = productsData.season ?? pathParams.season ?? null;
  const size = productsData.size ?? null;
  const color = productsData.color ?? null;
  const material = productsData.material ?? null;
  const total = productsData.total;
  const nameGender = pathParams?.gender?.name;
  const sortBy = productsData.sortBy;

  const searchQuery = productsData.query;
  const pageSize = productsData.quantity;
  const page = productsData.page;
  const products = productsData.products;
  const pages = productsData.pages;
  const isLoading = productsData.isLoading;

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    if (searchQuery) {
      return;
    }
    if (
      !season &&
      !gender &&
      !view &&
      !size &&
      !color &&
      !material &&
      !sortBy
    ) {
      console.log("changed", page, searchQuery);
      fetchProductsMain({ pageSize, page });
    } else {
      fetchProductsByParams({
        season,
        gender,
        view,
        pageSize,
        page,
        color,
        material,
        size,
        sortBy,
        pageSize,
      });
    }
  }, [season, view, gender, page, size, pageSize, color, material, sortBy]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    clearTimeout(searchTimeout);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        fetchProductsByQuery({
          query: searchQuery,
          season,
          gender,
          view,
          color,
          material,
          pageSize,
          page,
          size,
          sortBy,
        });
      }, 500)
    );
  }, [searchQuery, page]);

  useEffect(() => {
    window &&
      window?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }, [products]);

  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
    changeQueryAction(e.target.value);
  };

  const handleTagClick = (tagName) => {
    changeQueryAction(tagName);
  };

  const handleChange = (e) => {
    const page = +e.target.innerText;
    changePageAction(page);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchProductsByQuery(searchQuery);
  };

  return (
    <section className="feed">
      <Filter />
      <form className="relative w-full flex-center" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Пошук по назві або коду"
          value={searchData}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
        <div className="flex-between"></div>
      </form>
      <h1>{nameGender}</h1>
      {gender && gender.query && <SeasonTabs gender={gender.query} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <List data={products} handleTagClick={handleTagClick} />
          {pages > 1 && (
            <Pagination
              count={pages}
              page={page}
              onChange={handleChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          )}
        </>
      )}
    </section>
  );
};

export default Collection;
