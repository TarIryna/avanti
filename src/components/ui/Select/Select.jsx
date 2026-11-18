'use client';
import { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import * as S from './styles';
import Image from "next/image";
import CloseIcon from "@/assets/icons/close2.svg";
import AsyncSelect from './AsyncSelect';

const CustomSelect = ({
  options = [],
  label,
  placeholder,
  onChange,
  value: externalValue, // Переименовали внешний проп
  defaultValue,        // Новый проп для дефолтного значения
  isInput,
  tabIndex,
  className,
  isMulti = false,
  disabled = false,
  name,
  lang = "ukr"
}) => {
  // 1. Создаем внутренний стейт, который инициализируется из defaultValue или пустой структуры
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return isMulti ? [] : "";
  });

  const isNullValue = externalValue === "all" || externalValue === null || externalValue?.length === 0 || !externalValue

  // Определяем, какое значение сейчас главное (внешнее или внутреннее)
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Функция для безопасного обновления значения в обоих режимах
  const triggerChange = (nextValue) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    if (typeof onChange === "function") {
      onChange(nextValue);
    }
  };

  // Нормализация опций
const normalizedOptions = useMemo(() => {
  return options
    .map(item => ({
      ...item,
      name: item.name || (lang === "ukr" ? item.ukr : item.ru) || "",
      value: item.value ?? item.id ?? ""
    }))
    // Правильно: сортировка по алфавиту от А до Я (или от меньшего года к большему)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [options, lang]); // Добавили lang в зависимости, чтобы сортировка обновлялась при смене языка


  // Находим выбранные опции
  const selectedOptions = useMemo(() => {
    if (isMulti) {
      return Array.isArray(value)
        ? normalizedOptions.filter(i => value.includes(i.value))
        : [];
    }
    return normalizedOptions.find(i => i.value === value) || null;
  }, [value, normalizedOptions, isMulti]);

  // Проверка, выбран ли конкретный элемент
  const isSelected = (itemValue) => {
    if (isMulti) {
      return Array.isArray(value) && value.includes(itemValue);
    }
    return value === itemValue;
  };

  // Фильтрация списка при вводе текста
  const visibleOptions = useMemo(() => {
    let list = normalizedOptions;
    if (!isMulti && !isInput && selectedOptions) return list;
    if (query) {
      list = list.filter(i => i?.name?.toLowerCase().startsWith(query.toLowerCase()));
    }
    return list;
  }, [normalizedOptions, query, isMulti, isInput, selectedOptions]);

  // Синхронизация текста в инпуте
  useEffect(() => {
    if (isMulti) {
      if (!isOpen) setQuery("");
    } else {
      if (selectedOptions) {
        setQuery(selectedOptions.name);
      } else if (!value) {
        setQuery("");
      }
    }
  }, [value, selectedOptions, isMulti, isOpen]);

  // Автовыбор (работает ТОЛЬКО для одиночного выбора)
  useEffect(() => {
    if (!isMulti && isInput && isOpen && visibleOptions.length === 1) {
      const singleMatch = visibleOptions[0];
      if (value !== singleMatch.value) {
        triggerChange(singleMatch.value); // Используем единый триггер
        setIsOpen(false);
      }
    }
  }, [visibleOptions, isInput, isOpen, value, isMulti]);

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Обработчик ввода текста в инпут
  const onChangeInput = (e) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);
    setIsOpen(true);

    if (!isMulti) {
      if (inputQuery === "" || (selectedOptions && inputQuery !== selectedOptions.name)) {
        triggerChange(""); // Используем единый триггер
      }
    }
  };

  // Клик по элементу из выпадающего списка
  const handleSelectOption = (item) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      let nextValues;

      if (currentValues.includes(item.value)) {
        nextValues = currentValues.filter(v => v !== item.value);
      } else {
        nextValues = [...currentValues, item.value];
      }

      triggerChange(nextValues); // Используем единый триггер
      setQuery("");
      inputRef.current?.focus();
    } else {
      triggerChange(item.value); // Используем единый триггер
      setIsOpen(false);
    }
  };

  // Удаление конкретного тега по кнопке "х"
  const removeMultiValue = (e, itemValue) => {
    e.stopPropagation();
    const currentValues = Array.isArray(value) ? value : [];
    triggerChange(currentValues.filter(v => v !== itemValue)); // Используем единый триггер
  };

  const onReset = (e) => {
    e.stopPropagation(); // Чтобы при клике на крестик не открывался/закрывался выпадающий список

    // Если это мультиселект — сбрасываем в пустой массив, иначе — в пустую строку
    const resetValue = isMulti ? [] : null;

    triggerChange(resetValue);
    setQuery(""); // Очищаем текст в инпуте, если он был
  }

  return (
    <S.SelectContainer ref={containerRef} className={className}>
      {label && <S.Label>{label}</S.Label>}

      <S.SelectWrapper onClick={() => !disabled && isInput && inputRef.current?.focus()}>
        {!disabled && !isNullValue && <S.Reset onClick={(e) => onReset(e)}>
            <Image src={CloseIcon} alt="close" width="20" height="20" />
          </S.Reset>}
        {isMulti && selectedOptions?.length > 0 && (
          <S.TagsContainer>
            {selectedOptions?.map(item => (
              <S.Tag key={item.value}>
                {item.name}
                <S.RemoveTagBtn type="button" disabled={disabled} onClick={(e) => removeMultiValue(e, item.value)}>×</S.RemoveTagBtn>
              </S.Tag>
            ))}
          </S.TagsContainer>
        )}

        {isInput ? (
          <S.Input
            ref={inputRef}
            type="text"
            name={name}
            disabled={disabled}
            placeholder={isMulti && selectedOptions?.length > 0 ? "" : placeholder}
            value={query}
            onChange={onChangeInput}
            onFocus={() => setIsOpen(true)}
            isOpenList={isOpen}
            tabIndex={tabIndex}
          />
        ) : (
          <S.SelectButton type="button" disabled={disabled} isOpenList={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <div>
            {isMulti
              ? (selectedOptions?.length > 5 ? `Обрано: ${selectedOptions.length}` : "")
              : (!selectedOptions ? placeholder : selectedOptions.name) // Исправили отображение текста кнопки при одиночном выборе
            }
            </div>
          </S.SelectButton>
        )}
      </S.SelectWrapper>

      {isOpen && !disabled && (
        <S.OptionsList>
          {visibleOptions.length > 0 ? (
            visibleOptions.map((item) => (
              <S.Option
                key={item.value}
                className={isSelected(item.value) ? 'selected' : ''}
                onClick={() => handleSelectOption(item)}
              >
                {item.name}
                {isMulti && isSelected(item.value) && <S.CheckIcon>✓</S.CheckIcon>}
              </S.Option>
            ))
          ) : (
            <S.NoOptions>Нічого не знайдено</S.NoOptions>
          )}
        </S.OptionsList>
      )}
    </S.SelectContainer>
  );
};

const Select = forwardRef(function Select({ variant, ...props }, ref) {
  if (variant === 'native') return <select {...props} ref={ref} />;
  if (variant === 'async') return <AsyncSelect {...props} />;
  return <CustomSelect {...props} />;
});

export const SelectControl = forwardRef(function SelectControl(props, ref) {
  return <Select {...props} ref={ref} variant="native" />;
});

export default Select;
