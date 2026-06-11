"use client";
import { useState } from 'react';
import * as S from './styles'
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';
import { useParams } from 'next/navigation';

const ArrivalPage = () => {
   const params = useParams();
   const shop = params.shop;
   const [product, setProduct] = useState(null)
   const [list, setList] = useState([])

     const methods = useForm({
          defaultValues: {
            code: "",
          },
        });

     const {
        handleSubmit,
        register,
        watch,
      } = methods;

      const onSubmit = async(data) => {
        console.log(data)
        }

  const onChangeCode = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const code = watch("code");

  try {
    const res = await fetch(`/api/product/${code}`);
    const product = await res.json();
    if (!product){
      toast.error("Товар не знайдено!")
      return;
    }
    setProduct(product);
  } catch (e) {
    console.error(e);
  }
};

const onChangeModel = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  setProduct(null)
  const model = watch("model");

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

const onSetProductFromList = (data) => {
  console.log(data)
  setProduct(data)
  setList([])
}

    return (
      <section className="container page">
        <S.Title>ПРИХІД</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <S.ProductConatiner>
                   <S.InfoContainer>
                       <Input
                          type="text"
                          placeholder="Введіть код товару"
                          tabIndex={1}
                          onKeyDown={onChangeCode}
                          enterKeyHint="next"
                          label='Код товару'
                          on
                          isBorder
                        {...register("code", { required: true })}
                        />
                         <Input
                          type="text"
                          placeholder="Пошук по моделі"
                          tabIndex={1}
                          onKeyDown={onChangeModel}
                          enterKeyHint="next"
                          label='Модель'
                          on
                          isBorder
                        {...register("model", { required: true })}
                        />
                          {!!product && <ShopCard item={product} setProduct={onSetProductFromList} isSelected shop={shop} type="arrival"/>}
                          {!!list?.length && 
                          <S.List>
                            {list.map(item => <ShopCard item={item} id={item.code} setProduct={onSetProductFromList} isList shop={shop} type="arrival"/>)}
                            </S.List>}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default ArrivalPage 