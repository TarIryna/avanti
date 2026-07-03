"use client";
import { useState } from 'react';
import * as S from './styles'
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';
import toast from 'react-hot-toast';
import ImageUploader from './ImageLoader/ImageLoader';
import ImageBlock from './ImageLoader/ImageBlock';

const PhotoPage = () => {
   const [product, setProduct] = useState(null)
   const [images, setImages] = useState([])
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

  const onSubmit = async(data) => {
    console.log('onSubmit', data)
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

const onUpload = (images) => {
  setImages(prevImages => [...prevImages, ...images]);
}



    return (
      <section className="container page">
        <S.Title>ФОТО</S.Title>
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
                          isBorder
                        {...register("code", { required: true })}
                        />
                
                          {!!product && 
                          <>
                          <ShopCard item={product} info />
                         {product &&  <ImageUploader code={product.code} onUpload={(urls) => onUpload(urls)} onSuccess={reset}/>}
                          </>}
                          {!!images?.length && images.map(image => <ImageBlock image={image}/>)}
                   </S.InfoContainer>
                </S.ProductConatiner>
             </S.Form>
          </FormProvider>
      </section>
    )
}

export default PhotoPage