"use client";
import * as S from './styles'
import { Input } from '../ui';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { salePrice } from '@/utils/salePrice';

import Check from './Check';
import { toast } from "react-hot-toast";

import { useParams } from 'next/navigation';
import SaleCard from './ShopCard/SaleCard';
import Description from './Description';

const SalePage = () => {
  const params = useParams();
  const shop = params.shop;
  const [check, setCheck] = useState({client: null, items: []})
  const [product, setProduct] = useState(null)
  const methods = useForm({
  defaultValues: {
    code: "",
  },
});



useEffect(() => {
  if (check.client){
    check.items.map(item => item.salePrice = salePrice(item, check.client))
  }
}, [check.client])

 const {
  handleSubmit,
  register,
  control,
  setValue,
  watch,
} = methods;


const onSubmit = async(data) => {
console.log(data)
}

const addToCheck = (size) => {
  const quantity = size.reduce((sum, item) => {
      return sum + (Number(item.q) || 0);
    }, 0);
  setCheck((prev) => {
    return {
      ...prev,
      items: [
        ...prev.items,
        {
          code: product.code,
          images: product.images,
          name: product.name,
          vendor: product.vendor,
          model: product.model,
          size: size,
          price: product.price,
          price2: product.price2,
          salePrice: salePrice(product, check.client),
          quantity,
        },
      ],
    };
  });
  setProduct(null);
  setValue('code', "");
};


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

const onChangeClient = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const number = watch("client");
if (!number) {
  setCheck(prev => ({
    ...prev,
    client: null,
    items: prev.items.map(item => ({
      ...item,
      salePrice: item.price
    }))
  }));
  return
}
  try {
    const res = await fetch(`/api/client/${number}`);
    const client = await res.json();

 setCheck(prev => ({
  ...prev,
  client,
  items: prev.items.map(item => ({
    ...item,
    salePrice: Math.ceil(
  item.price2 
    ? item.price 
    : item.price * (100 - client.discount) / 100
)

  }))
}));

  } catch (e) {
    console.error(e);
  }
};

    return (
      <section className="container page">
        <S.Title>ПРОДАЖ</S.Title>
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
            {/* {!!product && <ShopProduct product={product}/>} */}
             {<Input
                type="text"
                placeholder="Номер телефона клієнта"
                tabIndex={1}
                onKeyDown={onChangeClient}
                enterKeyHint="next"
                label='Телефон'
                on
                isBorder
              {...register("client", { required: true })}
              />}
            {check?.client && <Description label="Клієнт" text={`${check?.client.name} ${check?.client.discount}% знижки`}/>}
              </S.InfoContainer>
             
            {product &&  <SaleCard client={check?.client} product={product} addToCheck={addToCheck} shop={shop} type="sale"/>}
            {check.items.length > 0 && <Check check={check} type="sale"/>}
            </S.ProductConatiner>
       
          </S.Form>
        </FormProvider>
    
      </section>
    )
}

export default SalePage 