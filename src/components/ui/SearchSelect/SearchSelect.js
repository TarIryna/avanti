"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "debounce";
import * as S from "./styles";

const SearchSelect = ({
  defaultValue = { value: '', label: '' },
  fetchOptions, // async (query) => [{ value, label }]
  placeholder = "Введіть для пошуку...",
  name = "select",
  onChange,
  title
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [isVisibleInput, setIsVisibleInput] = useState(true);
  const isInitialized = useRef(false);

useEffect(() => {
  if (!isInitialized.current && defaultValue?.value) {
    setSelected(defaultValue);
    setQuery(defaultValue.label);
    setIsVisibleInput(false);
    isInitialized.current = true;
  }
}, [defaultValue]);
  // const [isLoading, setIsLoading] = useState(false);

  // дебаунс запросов
  const debouncedFetch = useMemo(
    () =>
      debounce(async (q) => {
        // setIsLoading(true);
        const data = await fetchOptions(q);
        // setIsLoading(false);
        setOptions(data);
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
  onChange?.(option);
  setIsVisibleInput(false);
  setQuery(option?.label || "");
};

const onClear = (e) => {
  setQuery("")
  onChange({value: '', label: ''})
}

  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
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
      <S.Clear onClick={onClear}>X</S.Clear>
    </S.Wrapper>
  );
};

export default SearchSelect;
