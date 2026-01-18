import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

const DeliverySelect = ({
  value,
  onChange,
  title,
  defaultValue,
  fetchOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(defaultValue?.label ?? "");
  const [options, setOptions] = useState([]);
  const ref = useRef(null);

  // загрузка опций, 
  useEffect(() => {
    let active = true;

    const load = async () => {
      const data = await fetchOptions(query);
      if (active) setOptions(data);
    };

    if (open) load();
    return () => (active = false);
  }, [query, open]);

  // клик вне
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // если значение сбросили извне
  useEffect(() => {
    setQuery(value);
  }, [value]);

console.log(value, query)

  return (
    <S.Wrap ref={ref}>
      <S.Label>{title}</S.Label>

      <S.Input
        value={query}
        placeholder={title}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        autocomplete="off"
      />

      {open && (
        <S.Dropdown>
          {options.length === 0 && <S.Empty>Нічого не знайдено</S.Empty>}

          {options.map((opt) => (
            <S.Option
              key={opt.value}
              $selected={opt.label === value}
              onClick={() => {
                onChange(opt);
                setQuery(opt.label);
                setOpen(false);
              }}
            >
              <span>{opt.label}</span>
              {opt.label === value && <S.Check>✓</S.Check>}
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.Wrap>
  );
};

export default DeliverySelect;
