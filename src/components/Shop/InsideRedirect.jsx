"use client";
import { useState } from 'react';
import * as S from './styles'
import { useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '../ui';

const InsideRedirectPage = () => {
    const [productFrom, setProductFrom] = useState(null)
    const [productTo, setProductTo] = useState(null)
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
    const codeFrom = watch("codeFrom");
    const codeTo = watch("codeTo");

    console.log(e)

  try {
    const res = await fetch(`/api/product/${codeFrom}`);
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
        <S.Title>ПЕРЕКИДУВАННЯ МІЖ КОДАМИ</S.Title>
          <FormProvider {...methods}>
             <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <S.ProductConatiner>
                   <S.InfoContainer>
                     <Input
                          type="text"
                          placeholder="Код товару, з якого списуються залишки"
                          tabIndex={1}
                          onKeyDown={onChangeCode}
                          enterKeyHint="next"
                          label='Код товару'
                          on
                          isBorder
                        {...register("codeFrom", { required: true })}
                        />

                    <Input
                          type="text"
                          placeholder="Код товару, куди переміщаються залишки"
                          tabIndex={2}
                          onKeyDown={onChangeCode}
                          enterKeyHint="next"
                          label='Код товару'
                          on
                          isBorder
                        {...register("codeTo", { required: true })}
                        />
                  
                          {/* {!!product && <ShopCard item={product} setProduct={onSetProductFromList} isSelected type="decrease" shop={shop} comment={getDestinationName(destination)}/>} */}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default InsideRedirectPage