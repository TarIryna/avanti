"use client";
import { useParams } from 'next/navigation';
import * as S from './styles'
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import ShopCard from './ShopCard/ShopCard';
import { Button, Input } from '../ui';
import HeadButtons from './HeadButtons';

const RevaluationPage = () => {
     const params = useParams();
     const shop = params.shop;
     const [product, setProduct] = useState(null)

    const methods = useForm({
               defaultValues: {
                 code: "",
                 first_price: null,
                 second_price: null,
                 staff: null
               },
             });
     
          const {
             handleSubmit,
             register,
             watch,
             reset,
             setValue
           } = methods;

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
        setValue('first_price', product.price2 ?? product.price ?? null)
        setValue('second_price', product.price2 != null ? product.price : null)
      } catch (e) {
        console.error(e);
      }
    };

      const onSubmit = async(data) => {
        const {code} = data
        const firstPrice = Number(data.first_price);
        const secondPrice = data.second_price === '' || data.second_price == null
          ? null
          : Number(data.second_price);
        if (!firstPrice || firstPrice <= 0 || !code || (secondPrice !== null && (!Number.isFinite(secondPrice) || secondPrice <= 0))) {
          toast.error("Заповніть всі поля!")
          return;
        }
        if (secondPrice !== null && firstPrice <= secondPrice){
          toast.error("Друга ціна має бути нижча за першу!")
          return;
        }
        try{
          const response = await fetch("/api/shop/revaluation", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  code: product.code,
                  firstPrice,
                  secondPrice,
                  shop,
                  staff: null
            }),
              });
         const result = await response.json();
         if (result === 'success'){
          toast.success("Успішно здіснена переоцінка")
          setProduct(null)
          reset()
         }

        }catch(e){
          console.error(e)
        }
      
      }
    

    return (
      <section className="container page">
        <S.Title>ПЕРЕОЦІНКА</S.Title>
        <HeadButtons/>
          <FormProvider {...methods}>
             <S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <S.ProductConatiner>
                   <S.InfoContainer>
                       <Input
                          type="text"
                          placeholder="Введіть код товару"
                          tabIndex={1}
                          onKeyDown={onChangeCode}
                          enterKeyHint="next"
                          label='Код товару'
                          isBorder
                        {...register("code", { required: true })}
                        rules={{ required: "Це поле є обов'язковим для заповнення" }}
                        />
                      <Input
                          type="number"
                          step="0.01"
                          tabIndex={2}
                          enterKeyHint={onSubmit}
                          label='Перша ціна'
                          isBorder
                          name="first_price"
                          rules={{ required: true, valueAsNumber: true }}
                        />
                        <Input
                          type="number"
                          step="0.01"
                          tabIndex={2}
                          enterKeyHint={onSubmit}
                          label='Друга ціна'
                          isBorder
                          name="second_price"
                          rules={{ setValueAs: value => value === "" ? null : Number(value) }}
                        />
                        <Button type="submit">Переоцінити</Button>
                
                      {!!product && <ShopCard item={product} isSelected shop={shop} type="revaluation" info/>}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default RevaluationPage
