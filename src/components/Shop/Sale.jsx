"use client";
import * as S from './styles'
import { Input } from '../ui';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, Controller } from "react-hook-form";
import ShopProduct from './ShopProduct';
import Image from "next/image";
import Description from './Description';
import Sizes from '../Product/Sizes'
import Check from './Check';
import { toast } from "react-hot-toast";

const SalePage = () => {
  const [check, setCheck] = useState({client: null, items: []})
  const [product, setProduct] = useState(null)
  const methods = useForm({
  defaultValues: {
    code: "",
  },
});


const salePrice = (product, client) => {
  const isSale = !!product?.price2 
  if (!product) {
    return null
  }
  return isSale ? product.price : client?.discount ? Math.ceil(product.price * (100 - client.discount) / 100) : product.price
}

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
  setCheck((prev) => {
    const existing = prev.items.find(
      (item) => item.code === product.code && item.size === size.size
    );

    if (existing) {
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.code === product.code && item.size === size.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

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
          size: size.size,
          price: product.price,
          price2: product.price2,
          salePrice: salePrice(product, check.client),
          quantity: 1,
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
            {!!product && <ShopProduct product={product}/>}
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
              {check?.client && <Description label="Клієнт" text={`${check.client.name} ${check.client.discount}% знижки`}/>}
                {product && <S.PriceContainer>
                {product.price2 && <S.Price red>{product.price2} грн</S.Price>}
                <S.Price>{product.price} грн</S.Price>
                </S.PriceContainer> }
             {check?.client && product && <S.SalePrice>{`Ціна продажу: ${salePrice(product, check.client)} грн`}</S.SalePrice>}
             {product && <Sizes sizes={product.sizes} item={product} isShop onSelect={addToCheck}/>}
            </S.InfoContainer>
            {product && <S.ImageWrapper>
                <Image src={product.images[0]} fill />
            </S.ImageWrapper>}
            {check.items.length > 0 && <Check check={check}/>}
            </S.ProductConatiner>
       
   
          </S.Form>
        </FormProvider>
    
      </section>
    )
}

export default SalePage 