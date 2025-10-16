"use client";
import { useEffect, useMemo, useState } from "react";
import debounce from "debounce";
import * as S from "./styles";

const SearchSelect = ({
  defaultValue = "",
  fetchOptions, // async (query) => [{ value, label }]
  placeholder = "Введіть для пошуку...",
  name = "select",
  onChange,
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [isVisibleInput, setIsVisibleInput] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  // дебаунс запросов
  const debouncedFetch = useMemo(
    () =>
      debounce(async (q) => {
        // setIsLoading(true);
        const data = await fetchOptions(q);
        // setIsLoading(false);
        setOptions(data);

        // если передан дефолт и мы ещё не выбрали
        // if (defaultValue && !selected) {
        //   const defaultSelected = data.find(
        //     (item) => item.label === defaultValue
        //   );
        //   if (defaultSelected) {
        //     setSelected(defaultSelected);
        //     onChange?.(defaultSelected.value);
        //     setShowSearch(false);
        //   }
        // }
      }, 400),
    [defaultValue, selected]
  );

  // // первый запрос (пустой, чтобы загрузить список)
  useEffect(() => {
    debouncedFetch("");
  }, [debouncedFetch]);

  // поиск при изменении query
  useEffect(() => {
    if (query) debouncedFetch(query);
  }, [query, debouncedFetch]);

  const handleSelect = (e) => {
    const value = e.target.value;
    const option = options.find((opt) => opt.value === value) || null;
    setSelected(option);
    onChange?.(value);
    setIsVisibleInput(false);
    setQuery(option.label);
  };

  return (
    <S.Wrapper>
      {showSearch && (
        <S.Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          isVisible={isVisibleInput}
          onClick={() => setIsVisibleInput(true)}
        />
      )}
      <S.Select
        name={name}
        value={selected?.value || ""}
        onChange={handleSelect}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="">Выберите...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </S.Select>
      <S.Clear onClick={() => setQuery("")}>X</S.Clear>
    </S.Wrapper>
  );
};

export default SearchSelect;
