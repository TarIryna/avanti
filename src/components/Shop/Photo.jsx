"use client";
import { useState } from 'react';
import * as S from './styles'
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Input } from '../ui';
import ShopCard from './ShopCard/ShopCard';
import toast from 'react-hot-toast';
import ImageUploader from './ImageLoader/ImageLoader';
import ImageSorter from './ImageSortable';

const PhotoPage = () => {
   const [product, setProduct] = useState(null)
   const [images, setImages] = useState([])
   const [isDownloadingFirst, setIsDownloadingFirst] = useState(false);
   const [isDownloadingSecond, setIsDownloadingSecond] = useState(false);
   const methods = useForm({
      defaultValues: {
        code: "",
        video: ""
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
    if (!e) return;
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
      setImages(product.images)
    } catch (e) {
      console.error(e);
    }
};

const onUpload = (images) => {
  setImages(prevImages => [...prevImages, ...images]);
}

const onUploadFromServer = async () => {
   setIsDownloadingSecond(true);
  try {
    const res = await fetch(`/api/upload`);
    
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    // Читаем ответ как обычный текст (CSV), а не JSON!
    const csvContent = await res.text();
    
    // Создаем Blob из полученной CSV-строки
    const blob = new Blob([csvContent], { type: 'text/csv; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    // Автоматически скачиваем файл пользователю
    const link = document.createElement('a');
    link.href = url;
    
    // Имя файла можно достать из заголовков или задать вручную
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `cloudinary_report_${dateStr}.csv`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Успішно завантажено та збережено файл!");
  } catch (e) {
    console.error("Помилка завантажения:", e);
    toast.error("Помилка при загрузці фото");
  } finally {
      setIsDownloadingSecond(false);
    }
};

const onSetVideo = async() => {
  const video = watch("video")
  if (!video || !product) return
  try {
          const response = await fetch(`/api/product/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video,
              code: product.code
            }),
          });

          if (!response.ok) throw new Error("Server error");

          await response.json();
          toast.success("Відео успішно додано");
          
          // if (data && data.images) {
          //   setImages(data.images);
          //   toast.success("Порядок успішно збережено");
          // }
        } catch (error) {
          console.error(error);
          toast.error("Виникла помилка при додаванні відео");
        }
}

const onSuccess = () => {
  onChangeCode()
  // reset()
  // setProduct(null)
}

const getImagesData = (data) => {
  return data.map(item => {
    // 1. Создаем базовый объект с маленькой картинкой
    return {
      code: item.code,
      photo_small: item.small_image,
      Фото1: item.images[0] ?? "",
      Фото2: item.images[1] ?? "",  
      Фото3: item.images[2] ?? "",
      Фото4: item.images[3] ?? "",
      Фото5: item.images[4] ?? "",
      Фото6: item.images[5] ?? "",
      Фото7: item.images[6] ?? "",
      Фото8: item.images[7] ?? "",
      video1: item.video ?? ""
    };
  });
};

 const downloadProducts = async () => {
    setIsDownloadingFirst(true);
    try {
      // 1. Получаем данные с бэкенда
      const response = await fetch('/api/products/updated');
      const data = await response.json();
      const transformedData = getImagesData(data)

      // 2. Переводим данные в строку JSON с форматированием в 2 пробела
      const jsonString = JSON.stringify(transformedData, null, 2);
      
      // 3. Создаем Blob-объект с типом application/json
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // 4. Генерируем временную URL-ссылку для Blob
      const url = window.URL.createObjectURL(blob);
      
      // 5. Создаем невидимый элемент ссылки для скачивания
      const link = document.createElement('a');
      link.href = url;
      
      // Формируем имя файла с текущей датой (например, products_2026-07-22.json)
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `products_changed_${dateStr}.json`;
      
      // 6. Программно имитируем клик по ссылке для запуска скачивания
      document.body.appendChild(link);
      link.click();
      
      // 7. Удаляем ссылку и освобождаем выделенную память
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Не вдалося скачати файл:', error);
      alert('Помилка при вигрузці даних');
    } finally {
      setIsDownloadingFirst(false);
    }
  };

    return (
      <section className="container page">
        <S.Title>ФОТО</S.Title>
          <FormProvider {...methods}>
             <S.Form autoComplete="off">
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
                          name="code"
                        />
                
                          {!!product && 
                          <>
                          <ShopCard item={product} info hideImage/>
                         {product &&  <ImageUploader code={product.code} onUpload={(urls) => onUpload(urls)} onSuccess={onSuccess}/>}
                          </>}
                          {!!images?.length && product && <ImageSorter initialImages={images} code={product.code} setImages={setImages}/>}
                          {/* {!!images?.length && (
                            <S.ImagesList>
                              {images.map(image => <ImageBlock image={image}/>)}
                            </S.ImagesList>
                          )} */}
                   </S.InfoContainer>
                </S.ProductConatiner>
               {!!product && !product.video && <S.VideoContainer>
                         <Input
                          type="text"
                          placeholder="Вставте ссилку до відео"
                          tabIndex={2}
                          enterKeyHint="next"
                          label='Код товару'
                          isBorder
                          name="video"
                        />
                        <Button onClick={onSetVideo}>Відправити ссилку на відео</Button>
                </S.VideoContainer>}
             </S.Form>
          </FormProvider>
          <S.FlexLeft>
           <Button onClick={downloadProducts} disabled={isDownloadingFirst} style={{marginTop: "50px"}}>
            {isDownloadingFirst ? 'Формирование файла...' : 'Скачати JSON за сьогодні'}
          </Button>
             <Button onClick={onUploadFromServer} disabled={isDownloadingSecond} style={{marginTop: "50px"}}>
             {isDownloadingSecond ? 'Формирование файла...' : 'Скачати дані з Cloudinary'}
          </Button>
          </S.FlexLeft>
      </section>
    )
}

export default PhotoPage