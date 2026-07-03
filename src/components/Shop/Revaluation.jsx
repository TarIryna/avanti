"use client";
import { useParams } from 'next/navigation';
import * as S from './styles'
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import ShopCard from './ShopCard/ShopCard';
import { Button, Input } from '../ui';

const RevaluationPage = () => {
     const params = useParams();
     const shop = params.shop;
     const [product, setProduct] = useState(null)

    const methods = useForm({
               defaultValues: {
                 code: "",
               },
             });
     
          const {
             handleSubmit,
             register,
             watch,
             reset
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
      } catch (e) {
        console.error(e);
      }
    };

      const onSubmit = async(data) => {
        const price = Number(data.price)
        if (!price ||  price <= 0 || !product ){ 
          toast.error("Заповніть всі поля!")
          return;
        }
        if (price === product.price){
          toast.error("Ціна має відрізнятись від поточної!")
          return;
        }
        try{
          const response = await fetch("/api/shop/revaluation", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  item: product,
                  newPrice: price,
                  shop
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
                          type="text"
                          tabIndex={2}
                          enterKeyHint={onSubmit}
                          label='Нова ціна'
                          isBorder
                        {...register("price", { required: true })}
                        rules={{ required: "Це поле є обов'язковим для заповнення" }}
                        />
                        <Button>Переоцінити</Button>
                
                      {!!product && <ShopCard item={product} isSelected shop={shop} type="revaluation" info/>}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default RevaluationPage