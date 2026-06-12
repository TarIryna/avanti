"use client";
import { useState } from 'react';
import * as S from './styles'
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';


const OrdersIncreasePage = () => {
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

    return (
      <section className="container page">
        <S.Title>ДОДАВАННЯ ТОВАРІВ ІЗ ПОВЕРНЕНЬ</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <S.ProductConatiner>
                   <S.InfoContainer>
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
                          {!!product && <ShopCard item={product} onSucces={() => setProduct(null)} setProduct={() => {}} isSelected type="arrival" isOrder/>}
                   </S.InfoContainer>
              </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default OrdersIncreasePage