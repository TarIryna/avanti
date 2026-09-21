import { useState, useEffect, useRef, useMemo } from 'react';
import * as S from './styles';

const Select = ({ 
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
  lang = "ukr"
}) => {
  // 1. Создаем внутренний стейт, который инициализируется из defaultValue или пустой структуры
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return isMulti ? [] : "";
  });

  // Определяем, какое значение сейчас главное (внешнее или внутреннее)
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Функция для безопасного обновления значения в обоих режимах
  const triggerChange = (nextValue) => {
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
      value: item.value || item.id || ""
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

  return (
    <S.SelectContainer ref={containerRef} className={className}>
      {label && <S.Label>{label}</S.Label>}
      
      <S.SelectWrapper onClick={() => isInput && inputRef.current?.focus()}>
        {isMulti && selectedOptions?.length > 0 && (
          <S.TagsContainer>
            {selectedOptions?.map(item => (
              <S.Tag key={item.value}>
                {item.name}
                <S.RemoveTagBtn onClick={(e) => removeMultiValue(e, item.value)}>×</S.RemoveTagBtn>
              </S.Tag>
            ))}
          </S.TagsContainer>
        )}

        {isInput ? (
          <S.Input 
            ref={inputRef}
            type="text" 
            placeholder={isMulti && selectedOptions?.length > 0 ? "" : placeholder} 
            value={query} 
            onChange={onChangeInput}
            onFocus={() => setIsOpen(true)}
            isOpenList={isOpen}
            tabIndex={tabIndex}
          />
        ) : (
          <S.SelectButton isOpenList={isOpen} onClick={() => setIsOpen(!isOpen)}>
            {isMulti 
              ? (selectedOptions?.length > 5 ? `Обрано: ${selectedOptions.length}` : "")
              : (!selectedOptions ? placeholder : selectedOptions.name) // Исправили отображение текста кнопки при одиночном выборе
            }
          </S.SelectButton>
        )}
      </S.SelectWrapper>

      {isOpen && (
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

export default Select;



// import { useState, useEffect, useRef, useMemo } from 'react';
// import * as S from './styles';

// const Select = ({ 
//   options = [], 
//   label, 
//   placeholder, 
//   onChange, 
//   value, // Теперь может быть строкой или массивом ['val1', 'val2'] при isMulti
//   isInput, 
//   tabIndex,
//   isMulti = false // Новый параметр для множественного выбора
// }) => {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   // Нормализация опций
//   const normalizedOptions = useMemo(() => {
//     return options.map(item => ({
//       ...item,
//       name:  item.name || item.ukr || "",
//       value: item.value || item.id || ""
//     }));
//   }, [options]);

//   // Находим выбранные опции (массив для isMulti, объект или null для обычного)
//   const selectedOptions = useMemo(() => {
//     if (isMulti) {
//       return Array.isArray(value) 
//         ? normalizedOptions.filter(i => value.includes(i.value)) 
//         : [];
//     }
//     return normalizedOptions.find(i => i.value === value) || null;
//   }, [value, normalizedOptions, isMulti]);

//   // Проверка, выбран ли конкретный элемент (для подсветки в списке)
//   const isSelected = (itemValue) => {
//     if (isMulti) {
//       return Array.isArray(value) && value.includes(itemValue);
//     }
//     return value === itemValue;
//   };

//   // 1. Фильтрация списка при вводе текста
//   const visibleOptions = useMemo(() => {
//     let list = normalizedOptions;
    
//     // Для обычного инпута скрываем поиск, если элемент уже жестко выбран
//     if (!isMulti && !isInput && selectedOptions) return list;

//     // Фильтруем по тексту
//     if (query) {
//       list = list.filter(i => i?.name?.toLowerCase().includes(query.toLowerCase()));
//     }
    
//     return list;
//   }, [normalizedOptions, query, isMulti, isInput, selectedOptions]);

//   // 2. Синхронизация текста в инпуте
//   useEffect(() => {
//     if (isMulti) {
//       // В режиме isMulti текст внутри инпута очищается после выбора, 
//       // так как выбранные элементы превращаются в теги (бейджи)
//       if (!isOpen) setQuery(""); 
//     } else {
//       if (selectedOptions) {
//         setQuery(selectedOptions.name);
//       } else if (!value) {
//         setQuery("");
//       }
//     }
//   }, [value, selectedOptions, isMulti, isOpen]);

//   // 3. Автовыбор (работает ТОЛЬКО для одиночного выбора)
//   useEffect(() => {
//     if (!isMulti && isInput && isOpen && visibleOptions.length === 1) {
//       const singleMatch = visibleOptions[0];
//       if (value !== singleMatch.value) {
//         onChange(singleMatch.value);
//         setIsOpen(false);
//       }
//     }
//   }, [visibleOptions, isInput, isOpen, onChange, value, isMulti]);

//   // 4. Закрытие списка при клике вне компонента
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 5. Обработчик ввода текста в инпут
//   const onChangeInput = (e) => {
//     const inputQuery = e.target.value;
//     setQuery(inputQuery);
//     setIsOpen(true);

//     if (!isMulti) {
//       if (inputQuery === "" || (selectedOptions && inputQuery !== selectedOptions?.[0]?.name)) {
//         onChange(""); 
//       }
//     }
//   };

//   // 6. Клик по элементу из выпадающего списка
//   const handleSelectOption = (item) => {
//     if (isMulti) {
//       const currentValues = Array.isArray(value) ? value : [];
//       let nextValues;
      
//       if (currentValues.includes(item.value)) {
//         // Если уже выбран — удаляем из массива (toggle-эффект)
//         nextValues = currentValues.filter(v => v !== item.value);
//       } else {
//         // Если не выбран — добавляем в массив
//         nextValues = [...currentValues, item.value];
//       }
      
//       onChange(nextValues);
//       setQuery(""); // Очищаем поле ввода для поиска следующего тега
//       inputRef.current?.focus(); // Возвращаем фокус на инпут
//     } else {
//       onChange(item.value);
//       setIsOpen(false);
//     }
//   };

//   // Удаление конкретного тега по кнопке "х"
//   const removeMultiValue = (e, itemValue) => {
//     e.stopPropagation(); // Чтобы не открывался/закрывался список
//     const currentValues = Array.isArray(value) ? value : [];
//     onChange(currentValues.filter(v => v !== itemValue));
//   };

//   return (
//     <S.SelectContainer ref={containerRef}>
//       {label && <S.Label>{label}</S.Label>}
      
//       <S.SelectWrapper onClick={() => isInput && inputRef.current?.focus()}>
//         {/* Рендерим теги (бейджи) выбранных элементов при мульти-выборе */}
//         {isMulti && selectedOptions?.length > 0 && (
//           <S.TagsContainer>
//             {selectedOptions?.map(item => (
//               <S.Tag key={item.value}>
//                 {item.name}
//                 <S.RemoveTagBtn onClick={(e) => removeMultiValue(e, item.value)}>×</S.RemoveTagBtn>
//               </S.Tag>
//             ))}
//           </S.TagsContainer>
//         )}

//         {isInput ? (
//           <S.Input 
//             ref={inputRef}
//             type="text" 
//             placeholder={isMulti && selectedOptions?.length > 0 ? "" : placeholder} 
//             value={query} 
//             onChange={onChangeInput}
//             onFocus={() => setIsOpen(true)}
//             isOpenList={isOpen}
//             tabIndex={tabIndex}
//           />
//         ) : (
//           <S.SelectButton isOpenList={isOpen} onClick={() => setIsOpen(!isOpen)}>
//             {isMulti 
//               ? (selectedOptions?.length > 5 ? `Обрано: ${selectedOptions.length}` : "")
//               : (selectedOptions?.length === 0 ? placeholder : "")
//             }
//           </S.SelectButton>
//         )}
//       </S.SelectWrapper>

//       {isOpen && (
//         <S.OptionsList>
//           {visibleOptions.length > 0 ? (
//             visibleOptions.map((item) => (
//               <S.Option 
//                 key={item.value} 
//                 className={isSelected(item.value) ? 'selected' : ''}
//                 onClick={() => handleSelectOption(item)}
//               >
//                 {item.name}
//                 {isMulti && isSelected(item.value) && <S.CheckIcon>✓</S.CheckIcon>}
//               </S.Option>
//             ))
//           ) : (
//             <S.NoOptions>Нічого не знайдено</S.NoOptions>
//           )}
//         </S.OptionsList>
//       )}
//     </S.SelectContainer>
//   );
// };

// export default Select;
