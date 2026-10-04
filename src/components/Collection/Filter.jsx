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
  bagsData
} from "@/utils/data";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import * as S from "./styles";
import { Select } from "../ui";
import { FormProvider, useForm, Controller, useWatch } from 'react-hook-form';
import { useMemo } from "react";

const Filter = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

const currentFormValues = useMemo(() => {
  return {
    gender: params.gender || "all",
    season: searchParams.get("season") || null,     
    color: searchParams.get("color") || null,    
    // Превращаем "35,36" из URL в ["35", "36"], а если в URL пусто — в []
    size: searchParams.get("size") ? searchParams.get("size").split(',') : [],  
    material: searchParams.get("material") || null,
    view: searchParams.get("view") || null,
    sort: searchParams.get("sort") || "new",
    limit: searchParams.get("limit") || "24",
    type: searchParams.get("type") || "shoes"
  };
}, [params.gender, searchParams]);

    const methods = useForm({
      defaultValues: currentFormValues
   });

const watchedValues = useWatch({ control: methods.control });

const {gender, season, size, type } = currentFormValues



    // универсальная функция для изменения параметров в URL
const updateParam = (key, value) => {
  console.log(key, value)
  const query = new URLSearchParams(searchParams.toString());
  let genderValue = key === "gender" ? "all" : gender;

  // 1. Нормализуем значение, если пришел массив (для мультиселекта)
  let normalizedValue = value;
  if (Array.isArray(value)) {
    // Склеиваем массив в строку "38,39,40". Если массив пустой, будет ""
    normalizedValue = value.join(','); 
  }

  // 2. Проверяем наличие значения (теперь проверяем нормализованную строку)
  if (normalizedValue && normalizedValue !== "") {
    switch (key) {
      case "gender":
        genderValue = normalizedValue;
        break;

      case "view":
        console.log(normalizedValue)
        const hasNoBoots = !normalizedValue.includes('boots') && 
                     !normalizedValue.includes('high') && 
                     !normalizedValue.includes('botforts');
       if (hasNoBoots) {
        query.delete("season"); 
      }
        // if (type === "bags"){
        //   console.log('сбить все фильтры')
        // }
        query.set("view", normalizedValue);
        break;
      
      // case "season":
      //   query.set("season", normalizedValue);
      //   query.delete("view"); 
      //   break;

      default:
        // Все остальные параметры, включая новые мульти-размеры
        query.set(key, normalizedValue);
    }
  } else {
    // Если массив пустой или строка пустая — полностью удаляем ключ из URL
    query.delete(key);
  }

  query.set("page", "1");
  router.push(`/${genderValue}?${query.toString()}`);
};

  const viewList = views(season, gender, type);
  const sizesList = sizes();

  const sizesByGender = !gender
    ? sizesList
    : gender === "men"
    ? sizesList.filter((s) => +s.id > 38)
    : gender === "women"
    ? sizesList.filter((s) => +s.id > 31 && +s.id < 44)
    : sizesList.filter((s) => +s.id < 42);


const renderSizes = (sizes = []) => {
  // 1. Извлекаем массив выбранных строк из URL ("38,39" -> ["38", "39"])
  const currentSizesArray = size && typeof size === 'string' 
    ? size.split(',') 
    : size && Array.isArray(size)
    ? size 
    : [];

  // Подсвечиваем селект, если выбран хотя бы один размер
  const isCurrent = currentSizesArray.length > 0;

  return (
    <Select
      className={`filter__select ${isCurrent ? 'filter__select_current' : ''}`}
      placeholder="Розмір:"
      label="Розміри"
      options={sizes}
      value={currentSizesArray} 
      onChange={(nextValues) => updateParam("size", nextValues)}
      isMulti={true}
      lang="ukr"
    />
  );
};



  return (
    <S.FilterWrapper>
      <S.FilterTitle>Фільтри і сортування</S.FilterTitle>
       <FormProvider {...methods}>
        <form onSubmit={(e) => {
                  e.preventDefault(); // Блокируем стандартную отправку браузера при Enter
                  handleSubmit(onSubmit)(e);
                }}>
        <S.FilterGrid>
          {tabsData && <Select options={tabsData} label="Стать" value={watchedValues.gender} onChange={(nextValues) => updateParam("gender", nextValues)} isResetButton />}
          {seasons && <Select options={seasons} label="Сезон" value={watchedValues.season} onChange={(nextValues) => updateParam("season", nextValues)} isResetButton />}
          {viewList && <Select options={viewList} label="Вигляд" value={watchedValues.view} onChange={(nextValues) => updateParam("view", nextValues)} isResetButton /> }
          {sizesByGender && renderSizes(sizesByGender)}
          {colorsList && <Select options={colorsList} label="Колір" value={watchedValues.color} onChange={(nextValues) => updateParam("color", nextValues)} isResetButton />}
          {materialList && <Select options={materialList} label="Матеріал" value={watchedValues.material} onChange={(nextValues) => updateParam("material", nextValues)} isResetButton /> }
          {sortList && <Select options={sortList} label="Сортування" value={watchedValues.sort} onChange={(nextValues) => updateParam("sort", nextValues)} />}
          {limits &&  <Select options={limits} label="Кількість на сторінці" value={watchedValues.limit} onChange={(nextValues) => updateParam("limit", nextValues)}/> }
        </S.FilterGrid>
      </form>
      </FormProvider>
    </S.FilterWrapper>
  );
};

export default Filter;
