"use client";
import { useEffect, useState } from 'react';
import * as S from '../Shop/styles'
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { Input, Select } from '../ui';
import { colors, years, seasonData, types, genders, vendors, views, sizesLengths, materialData } from '@/data';
import RevalueCard from './RevalueCard/RevalueCard';
import toast from 'react-hot-toast';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { MODALS } from '@/constants/constants';
import { useModal } from '@ebay/nice-modal-react';
import IconDelete from "@/assets/icons/delete.svg";
import Image from 'next/image';

registerDynamicModal(
  MODALS.LABELS_MODAL,
  import("@/components/modals/LabelsModal/LabelsModal")
);

const RevaluePage = () => {
   const [list, setList] = useState([])
   const [percent, setPercent] = useState("")
   const [price, setPrice] = useState("")
   const [filter, setFilter] = useState(null)
   const {show} = useModal(MODALS.LABELS_MODAL)

     const methods = useForm({
      defaultValues: {
         type: 1,
         season: [],      // для isMulti
         year: "",
         gender: [],      // для isMulti
         vendor: [],      // для isMulti
         color: [],       // для isMulti
         country: [],     // для isMulti
         material: "",
         view: "",
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

  const onSubmit = async(data) => {
   try {
    setFilter(data)
      const res = await fetch('/api/products/list', { 
        method: 'POST', // Переключаем на POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });

     const result = await res.json();
     if (result.products){
      setList(result.products);
     }
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (percent){
      setPrice(null)
    }
  }, [percent])

    useEffect(() => {
    if (price){
      setPercent(null)
    }
  }, [price])

 const onRevaluate = async() => {
  if (!filter && (!percent || !price)){
    return
  }
  try {
    const res = await fetch('/api/products/list-revaluation', { 
        method: 'POST', // Переключаем на POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({filter, percent, price}) 
      });
     const result = await res.json();
     if (result.success){
      toast.success(`Успішно переоцінено ${result.processedCount ? `${result.processedCount} пар` : ""}!`)
     }
  } catch (e) {
    console.log(e)
  }
 }

 const deleteLabels = async () => {
    try {
    const res = await fetch('/api/shop/labels', { 
        method: 'DELETE',
      });
     const result = await res.json();
     if (result.success){
      toast.success(`Успішно видалені цінники!`)
     }
  } catch (e) {
    console.log(e)
  }
 }

    return (
      <section className="container page">
        <S.Title>ПЕРЕОЦІНКА</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={(e) => {
                  e.preventDefault(); // Блокируем стандартную отправку браузера при Enter
                  handleSubmit(onSubmit)(e);
                }}>
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
                          value={field.value} 
                          isInput={true}
                          onChange={field.onChange} 
                          tabIndex={2}
                          isMulti
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

                    </S.Row>
                    <S.Row>
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
                          isMulti
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
                            isMulti
                          />
                        )}
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
                          isMulti
                        />
                      )}
                    />
                      
          </S.Row>
          <S.Row>
                       <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <Select 
                          options={vendors} 
                          label="Виробник"
                          placeholder="Пошук із списку..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={9}
                          isMulti
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
          
                </S.Row>
                 <S.CheckButton type="submit">
                  Подивитись результат
                </S.CheckButton>
             </S.Form>
          </FormProvider>
          <S.ListRevalue>
              {list && list.map(item => <RevalueCard item={item} percent={percent} price={price}/>)}
          </S.ListRevalue>
          <S.ButtonsConatainer>
            <S.Input     
              type="number"
              placeholder="% знижки"
              tabIndex={20}
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              />
            <S.CheckButton onClick={onRevaluate}>Уцінка на %</S.CheckButton>
           <S.Input     
              type="number"
              placeholder="Нова ціна"
              tabIndex={21}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
            <S.CheckButton onClick={() => show()}>Відкрити цінники</S.CheckButton>
            <S.CheckButton onClick={deleteLabels}>     
              <Image
                className="pointer"
                src={IconDelete.src}
                width={24}
                height={24}
                alt="delete"
              />
              Видалити цінники</S.CheckButton>
          </S.ButtonsConatainer>
      </section>
    )
}

export default RevaluePage