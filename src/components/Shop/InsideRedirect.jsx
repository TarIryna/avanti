"use client";
import { useEffect, useState } from 'react';
import * as S from './styles'
import { useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';
import toast from 'react-hot-toast';

const InsideRedirectPage = () => {
    const [productFrom, setProductFrom] = useState(null)
    const [productTo, setProductTo] = useState(null)
    const params = useParams();
    const shop = params.shop;
    
        const methods = useForm({
              defaultValues: {
                codeFrom: "",
                codeTo: ""
              },
            });
    
         const {
            handleSubmit,
            register,
            watch,
            reset
          } = methods;
    
    
  const onChangeCode = async (name, e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const code = watch(name);
    if (code === ""){
       if (name === 'codeFrom') {
      setProductFrom(null) 
      } else {
        setProductTo(null);
      } 
      return
    }

  try {
    const res = await fetch(`/api/product/${code}`);
    const product = await res.json();
    if (!product){
      toast.error("Товар не знайдено!")
      return;
    }
    if (name === 'codeFrom') {
      setProductFrom(product) 
    } else {
      setProductTo(product);
    } 
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = async() => {
  if (!productFrom || !productTo){
    toast.error("Треба заповнити обивда коди");
    return
  } else if (productFrom.code === productTo.code){
    toast.error("Код вже об'єднаний");
    return
  } else {
    try {
     const response = await fetch("/api/shop/inside-redirect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemFrom: productFrom.code,
        itemTo: productTo.code
   }),
    });
      const result = await response.json();
      if (result?.success){
        toast.success("Товар успішно перенесено");
        setProductFrom(null)
        setProductTo(null)
        reset()
      }
    }catch (e) {
      console.error(e)
    }
  }
}

    return (
         <section className="container page">
        <S.Title>ПЕРЕКИДУВАННЯ МІЖ КОДАМИ</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <S.ProductConatiner>
                   <S.InfoContainer>
                     <Input
                          type="text"
                          placeholder="Код товару, з якого списуються залишки"
                          tabIndex={1}
                          onKeyDown={(e) => onChangeCode('codeFrom', e)}
                          enterKeyHint="next"
                          label='Код товару'
                          isBorder
                          onBlurHandler={(e) => onChangeCode('codeFrom', e)}
                        {...register("codeFrom", { required: true })}
                        />

                    <Input
                          type="text"
                          placeholder="Код товару, куди переміщаються залишки"
                          tabIndex={2}
                          onKeyDown={(e) => onChangeCode('codeTo', e)}
                          enterKeyHint="next"
                          label='Код товару'
                          onBlurHandler={(e) => onChangeCode('codeFrom', e)}
                          isBorder
                        {...register("codeTo", { required: true })}
                        />
                    <S.Flex>
                          {!!productFrom && <ShopCard item={productFrom} isSelected type="inside-redirect" shop={shop}/>}
                          {!!productTo && <ShopCard item={productTo} isSelected type="inside-redirect" shop={shop}/>}
                    </S.Flex>
                    <Button type="submit">Об'єднати</Button>
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default InsideRedirectPage