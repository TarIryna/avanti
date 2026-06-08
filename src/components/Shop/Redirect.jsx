"use client";
import { useState } from 'react';
import * as S from './styles'
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';
import Select from '../ui/Select/Select';
import { destinations } from '@/data/destination';
import { useParams } from 'next/navigation';


const RedirectPage = () => {
   const [product, setProduct] = useState(null)
   const [list, setList] = useState([])
   const [destination, setDestination] = useState(null)
   const params = useParams();
   const shop = params.shop;

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

const onChangeDestination = (e) => {
  setDestination(e.target?.value)
}

const onSetProductFromList = (product) => {
  setProduct(product)
  setList([])
}

    return (
      <section className="container page">
        <S.Title>СПИСАННЯ</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <S.ProductConatiner>
                   <S.InfoContainer>
                    <Select options={destinations} label="Куди списуэться" value={destination} onChange={onChangeDestination}/>
                 
                       <Input
                          type="text"
                          placeholder="Введіть код товару"
                          tabIndex={2}
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
                          tabIndex={3}
                          onKeyDown={onChangeModel}
                          enterKeyHint="next"
                          label='Модель'
                          on
                          isBorder
                        {...register("model")}
                        />
                          {!!product && <ShopCard item={product} setProduct={onSetProductFromList} isSelected type="redirect" shop={shop}/>}
                          {!!list?.length && 
                          <S.List>
                            {list.map(item => <ShopCard item={item} id={item.code} setProduct={onSetProductFromList} isList/>)}
                            </S.List>}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default RedirectPage 