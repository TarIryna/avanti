"use client";
import { Input, Select } from '../ui';
import * as S from './styles';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { colors, years, seasonData, getDefaultYear, getCodePart, getYearById, types, genders, vendors, views, sizesLengths, getVendorCountry, countries, materialInside, materialsTop, getMaterialId, materialData, styles, heels, sizesGroup, facebookCategories, getNameTotal, categories } from '@/data';
import { useEffect, useMemo } from 'react';
import { accessoires } from '@/data/accesoires';
import toast from 'react-hot-toast';

const NewProductPage = () => {
  const defaultYear = getDefaultYear();
  const methods = useForm({
    defaultValues: {
      code: "",
      year: defaultYear?.value || "",
      season: "", // Добавили дефолтное значение для контролируемого инпута
      type: 1
    },
  });
     
  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    setValue // Нужен для динамической записи кода в инпут
  } = methods;

  const season = watch('season');
  const year = watch('year');
  const vendor = watch('vendor');
  const materialTop = watch('material_top');
  const type = watch('type');

  const isVisibleAccessoires = useMemo(() => type === 9, [type])

  // Перенесли функцию внутрь или обернули бы в useCallback, но для useEffect можно оставить так
  const generateAndCheckCode = async () => {
    if (!year || !season) return;

    const yearLabel = getYearById(year); // Получаем строку (например, "2026")
    if (!yearLabel) return;

    const yearPart = yearLabel.slice(2, 4); // Вырезаем последние 2 цифры
    const seasonPart = getCodePart(season);
    const firstPart = `${yearPart}${seasonPart}`; 

    if (firstPart?.length === 3) {
      try {
        const response = await fetch(`/api/products/code?query=${firstPart}`);
        if (!response.ok) throw new Error("Ошибка при запросе к API");
        
        const existingProducts = await response.json();
        if (existingProducts?.maxCode){
          setValue('code', Number(existingProducts?.maxCode) + 1, { shouldValidate: true })
        }

      } catch (e) {
        console.error("Ошибка при генерации кода:", e);
      }
    }
  };

  useEffect(() => {
    if (season && year) {
      generateAndCheckCode();
    }
  }, [season, year]); // Срабатывает каждый раз при изменении сезона или года

   useEffect(() => {
    if (vendor) {
      const conuntryId = getVendorCountry();
      if (conuntryId){
        setValue('country', conuntryId, { shouldValidate: true })
      }
    }
  }, [vendor]); 

  useEffect(() => {
    if (materialTop) {
      const material = getMaterialId();
      if (material){
        setValue('material', material, { shouldValidate: true })
      }
    }
  }, [materialTop]); 

  const onSubmit = async(data) => {
    const name = getNameTotal(data)
    const code = Number(data.code)
    const product = {...data, name, code, barcodes: [code]}

    Object.keys(product).forEach(key => {
      if (product[key] === undefined) {
        product[key] = null;
      }
    });

    try{
      const response = await fetch("/api/product/new", {
          method: "POST",
          headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      product,
                }),
                  });
        const result = await response.json();
        if (result === 'success'){
          toast.success("Успішно додано товар")
          reset()
        }
    }catch(e){
         console.error(e)
      }
  }

  return (
    <section className="container page">
      <S.Title>НОВИЙ ТОВАР</S.Title>
      <FormProvider {...methods}>
        <S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <S.Flex>
            <S.Row>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select 
                options={types} 
                label="Тип товару"
                placeholder="Пошук типу..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange} 
                tabIndex={1}
              />
            )}
          />
          
          <Controller
            control={control}
            name="season"
            render={({ field }) => (
              <Select 
                options={seasonData} 
                label="Сезон"
                placeholder="Пошук сезону..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange} 
                tabIndex={2}
              />
            )}
          />

          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <Select 
                options={years} 
                label="Рік-сезон"
                placeholder="Пошук періоду..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={3}
              />
            )}
          />

          <Input
            type="number"
            placeholder="Введіть код товару"
            tabIndex={4}
            label='Код товару'
            isBorder
            {...register("code", { 
              required: "Це поле є обов'язковим для заповнення" 
            })}
          />

  
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select 
                options={genders} 
                label="Стать"
                placeholder="Пошук варіантів..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={5}
              />
            )}
          />

        <Controller
            control={control}
            name="vendor"
            render={({ field }) => (
              <Select 
                options={vendors} 
                label="Марка"
                placeholder="Пошук із списку марок..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={6}
              />
            )}
          />

          <Input
            type="text"
            placeholder="Введіть номер моделі"
            tabIndex={7}
            label='Модель'
            isBorder
            {...register("model", { 
              required: "Це поле є обов'язковим для заповнення" 
            })}
          />


        <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <Select 
                options={colors} 
                label="Колір"
                placeholder="Пошук із списку кольорів..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={8}
              />
            )}
          />

                  <Controller
            control={control}
            name="vendor"
            render={({ field }) => (
              <Select 
                options={vendors} 
                label="Виробник"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={9}
              />
            )}
          />

          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select 
                options={countries} 
                label="Країна виробник"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={10}
              />
            )}
          />
          </S.Row>
          <S.Row>       
        {isVisibleAccessoires && <Controller
            control={control}
            name="accessoires"
            render={({ field }) => (
              <Select 
                options={accessoires} 
                label="Тип аксесуару"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={11}
              />
            )}
          />}

        <Controller
            control={control}
            name="material_top"
            render={({ field }) => (
              <Select 
                options={materialsTop} 
                label="Матеріал верху"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={12}
              />
            )}
          />

          <Controller
            control={control}
            name="material_inside"
            render={({ field }) => (
              <Select 
                options={materialInside} 
                label="Матеріал всередині"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={13}
              />
            )}
          />

        <Controller
            control={control}
            name="material"
            render={({ field }) => (
              <Select 
                options={materialData} 
                label="Матеріал для фільтру"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={14}
              />
            )}
          />

        <Controller
            control={control}
            name="view"
            render={({ field }) => (
              <Select 
                options={views} 
                label="Вигляд товару"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={15}
              />
            )}
          />

          <Controller
            control={control}
            name="rozetka_id"
            render={({ field }) => (
              <Select 
                options={categories} 
                label="Категорія для розетки"
                placeholder="Пошук періоду..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={16}
              />
            )}
          />

          <Controller
            control={control}
            name="style"
            render={({ field }) => (
              <Select 
                options={styles} 
                label="Стиль взуття"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={17}
              />
            )}
          />

        <Controller
            control={control}
            name="heel"
            render={({ field }) => (
              <Select 
                options={heels} 
                label="Висота каблука"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={18}
              />
            )}
          />

          <Controller
            control={control}
            name="size_type"
            render={({ field }) => (
              <Select 
                options={sizesLengths} 
                label="Розміровка"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={19}
              />
            )}
          />

        <Controller
            control={control}
            name="size_type"
            render={({ field }) => (
              <Select 
                options={sizesGroup} 
                label="Розмірна сітка"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={20}
              />
            )}
          />

        <Controller
            control={control}
            name="facebook"
            render={({ field }) => (
              <Select 
                options={facebookCategories} 
                label="Категорія для facebook"
                placeholder="Пошук із списку..."
                isInput={true}
                value={field.value} 
                onChange={field.onChange}
                tabIndex={21}
              />
            )}
          />
    
    
</S.Row>
</S.Flex>
          <button type="submit">Создать товар</button>

        </S.Form>
      </FormProvider>
    </section>
  );
};

export default NewProductPage;
