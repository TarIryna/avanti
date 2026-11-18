"use client";
import useShopProductSearch from "@/hooks/useShopProductSearch";
import * as S from './styles'
import { Input } from '../ui';
import { useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { salePrice } from '@/utils/salePrice';
import { changeSaleClient, priceSaleItem } from '@/utils/saleCheck';

import Check from './Check';
import { toast } from "react-hot-toast";

import { useParams } from 'next/navigation';
import SaleCard from './ShopCard/SaleCard';
import Description from './Description';
import { OPERATION_TYPE } from '@/constants/constants';
import HeadButtons from './HeadButtons';

const SalePage = () => {
  const params = useParams();
  const shop = params.shop;
  const searchProduct = useShopProductSearch();
  const [check, setCheck] = useState({client: null, items: []})
  const [product, setProduct] = useState(null)

  const methods = useForm({
  defaultValues: {
    code: "",
  },
});



 const {
  handleSubmit,
  register,
  control,
  setValue,
  watch,
  reset
} = methods;


const onSubmit = async(data) => {
console.log(data)
}

const onReset = () => {
  setProduct(null)
  setCheck({client: null, items: []})
  reset()
} 

const onResetCheck = () => {
  setCheck(null)
}



const removeFromCheck = (index) => {
  setCheck(prev => ({
    ...prev,
    items: prev.items.filter((_, itemIndex) => itemIndex !== index),
  }));
};

const addToCheck = (size) => {
  const quantity = size.reduce((sum, item) => {
      return sum + (Number(item.q) || 0);
    }, 0);
    if (!salePrice(product, check.client)){
      toast.error("Відсутня ціна товару!")
      return
    }
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
    await searchProduct({ value: watch("code"),
      onClear: () => { setProduct(null); }, onResult: setProduct });
  };

const onChangeClient = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const number = (watch("client") || '').trim();
if (!number) {
  setCheck(prev => changeSaleClient(prev, null));
  return
}
  try {
    const res = await fetch(`/api/client/${encodeURIComponent(number)}`);
    const client = await res.json();
    if (!res.ok) throw new Error(client?.error || 'Помилка пошуку клієнта');
    if (!client?.phone) throw new Error('Клієнта не знайдено');
    setCheck(prev => changeSaleClient(prev, client));

  } catch (e) {
    toast.error(e.message || 'Помилка пошуку клієнта');
  }
};

const setDiscountToProduct = (discount, index) => {
  setCheck(prev => ({
    ...prev,
    items: prev.items.map((item, idx) => {
      if (idx !== index) return item;

      return priceSaleItem(item, prev.client, discount);
    })
  }));
};

const setProductComment = (comment, index) => {
  setCheck(prev => ({
    ...prev,
    items: prev.items.map((item, idx) => idx === index ? { ...item, comment } : item),
  }));
};


    return (
      <section className="container page">
        <S.Title>ПРОДАЖ</S.Title>
        <HeadButtons shop={shop} isSale/>
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
                name="code"
              />
            {/* {!!product && <ShopProduct product={product}/>} */}
             {<Input
                type="text"
                placeholder="Номер телефона клієнта"
                tabIndex={2}
                onKeyDown={onChangeClient}
                enterKeyHint="next"
                label='Телефон'
                on
                isBorder
                name="client"
              />}
            {check?.client && <Description label="Клієнт" text={`${check?.client.name} ${check?.client.discount}% знижки`}/>}
            {product &&  <SaleCard client={check?.client} product={product} addToCheck={addToCheck} shop={shop} type={OPERATION_TYPE.SALE}/>}
           </S.InfoContainer>
             
            {check?.items?.length > 0 && <Check check={check} onRemove={removeFromCheck} type={OPERATION_TYPE.SALE} setDiscount={setDiscountToProduct} setComment={setProductComment} reset={onReset} resetCheck={onResetCheck}/>}
            </S.ProductConatiner>
       
          </S.Form>
        </FormProvider>
    
      </section>
    )
}

export default SalePage
