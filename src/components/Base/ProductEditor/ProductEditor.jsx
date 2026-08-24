"use client";
import { Input, Select } from '../../ui';
import * as S from './styles';
import { Title, Row, Flex } from '../styles';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { colors, years, seasonData, getDefaultYear, getCodePart, getYearById, types, genders, vendors, views, sizesLengths, getVendorCountry, countries, materialInside, materialsTop, getMaterialId, materialData, styles, heels, sizesGroup, facebookCategories, getNameTotal, categories } from '@/data';
import { useMemo, useState } from 'react';
import { accessoires } from '@/data/accesoires';
import toast from 'react-hot-toast';
import ShopCard from '../../Shop/ShopCard/ShopCard';
import Image from 'next/image';
import { companies } from '@/data/companies';

const ProductEditorPage = () => {
  const [list, setList ] = useState([]);
  const [image, setImage] = useState("");

  const defaultYear = getDefaultYear();

  const methods = useForm();
    const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
  } = methods;

const onChangeCode = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  
  // Берем текущее значение кода прямо из хука формы
  const code = watch("code");

  try {
    const res = await fetch(`/api/product/${code}`);
    
    // Если бэкенд возвращает 404 или null
    if (!res.ok) {
      toast.error("Товар не знайдено!");
      return;
    }

    const foundProduct = await res.json();
    
    if (!foundProduct) {
      toast.error("Товар не знайдено!");
      return;
    }

    setImage(foundProduct.small_image ?? foundProduct.images?.[0] ?? "")

    // Магическая строчка: обновляет ВСЕ поля формы значениями из объекта товара
    reset({
      code: foundProduct.code || "",
      year: foundProduct.year || defaultYear?.value || "",
      season: foundProduct.season || "", 
      type: foundProduct.type ?? 1,
      gender: foundProduct.gender || "",
      vendor: foundProduct.vendor || "",
      model: foundProduct.model || "",
      color: foundProduct.color || "",
      country: foundProduct.country || "",
      accessoires: foundProduct.accessoires || "",
      material_top: foundProduct.material_top || "",
      material_inside: foundProduct.material_inside || "",
      material: foundProduct.material || "",
      view: foundProduct.view || "",
      style: foundProduct.style || "",
      rozetka_id: foundProduct.rozetka_id || "",
      heel: foundProduct.heel || "",
      size_type: foundProduct.size_type || "",
      sizesGroup: foundProduct.sizesGroup || "",
      facebook: foundProduct.facebook || ""
    });

    toast.success("Товар успішно завантажено!");
  } catch (e) {
    console.error(e);
    toast.error("Помилка при завантаженні товару");
  }
};


const onChangeModel = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const model = watch("modelQuery");

  try {
    const params = { gender: "all", limit: 50, page: 1, query: model };
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`/api/products/filter?${queryString}`);
    const result = await res.json();
    if (!result){
      toast.error("Товар не знайдено!")
      return;
    }
    setList(result.products);
  } catch (e) {
    console.error(e);
  }
};
     
const type = watch('type');

const isVisibleAccessoires = useMemo(() => type === 9, [type])

const onSetProductFromList = (product) => {
   setImage(product.small_image ?? product.images?.[0] ?? "")
      reset({
      code: product.code || "",
      year: product.year || defaultYear?.value || "",
      season: product.season || "", 
      type: product.type ?? 1,
      gender: product.gender || "",
      vendor: product.vendor || "",
      model: product.model || "",
      color: product.color || "",
      country: product.country || "",
      accessoires: product.accessoires || "",
      material_top: product.material_top || "",
      material_inside: product.material_inside || "",
      material: product.material || "",
      view: product.view || "",
      style: product.style || "",
      rozetka_id: product.rozetka_id || "",
      heel: product.heel || "",
      size_type: product.size_type || "",
      sizesGroup: product.sizesGroup || "",
      facebook: product.facebook || ""
    });
  setList([])
}

  const onSubmit = async(data) => {
    const product = {...data}

    Object.keys(product).forEach(key => {
      if (product[key] === undefined) {
        product[key] = null;
      }
    });

    try{
      const response = await fetch(`/api/product/${product.code}`, {
          method: "PUT",
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
      <Title>РЕДАКТИРОВАНИЕ ТОВАРА</Title>
      {!!list?.length && 
        <S.List>
         {list.map(item => <ShopCard item={item} id={item.code} setProduct={onSetProductFromList} isList/>)}
        </S.List>}
      <Flex>
      <FormProvider {...methods}>
        <S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <S.Flex>
                <Input
                          type="text"
                          placeholder="Поиск по коду товара"
                          tabIndex={2}
                          onKeyDown={onChangeCode}
                          enterKeyHint="next"
                          label='Поиск по коду'
                          on
                          isBorder
                        {...register("code", { required: true })}
                        />
                         <Input
                          type="text"
                          placeholder="Поиск по модели"
                          tabIndex={3}
                          onKeyDown={onChangeModel}
                          enterKeyHint="next"
                          label='поиск по модели'
                          on
                          isBorder
                        {...register("modelQuery")}
                        />
                        </S.Flex>
          <Flex>
            <Row>

               <Controller
                  control={control}
                  name="company"
                  render={({ field }) => (
                    <Select 
                      options={companies} 
                      label="Поставщик"
                      placeholder="Поиск поставщика..."
                      isInput={true}
                      value={field.value} 
                      onChange={field.onChange} 
                      tabIndex={1}
                    />
                  )}
              />

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
            name="model"
            type="text"
            placeholder="Введіть номер моделі"
            tabIndex={7}
            label='Модель'
            isBorder
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

          </Row>
          <Row>       
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
            name="sizesGroup"
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
    
    
</Row>
</Flex>
          <button type="submit">Изменить товар</button>

        </S.Form>
      </FormProvider>
      {image && <S.ImageWrapper>
        <Image src={image} alt="image" fill/>
      </S.ImageWrapper>}
      </Flex>
    </section>
  );
};

export default ProductEditorPage;
