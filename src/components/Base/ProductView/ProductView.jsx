import * as S from './styles'
import { Title } from '../styles'
import { useState } from 'react';
import { Input } from '@/components/ui';
import ShopCard from '@/components/Shop/ShopCard/ShopCard';
import { useForm, FormProvider } from 'react-hook-form';

const ProductViewPage = () => {
    const [productData, setProductData] = useState(null)
    const [list, setList] = useState([])

       const methods = useForm({
              defaultValues: {
                code: "",
                model: ""
              },
            });
    
         const {
            handleSubmit,
            watch,
          } = methods;
    const onSubmit = async(data) => {
        console.log(data)
        }
    
  const onChangeCode = async (e) => {
    if (e.key !== "Enter") return;
    // e.preventDefault();
    const code = watch("code");

  try {
    const res = await fetch(`/api/product/info/${code}`);
    const product = await res.json();
    if (!product){
      toast.error("Товар не знайдено!")
      return;
    }
    setProductData(product);
  } catch (e) {
    console.error(e);
  }
};

const onChangeModel = async (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const model = watch("model")

  try {
    const params = { gender: "all", limit: 50, page: 1, query: model };
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`/api/products/filter?${queryString}`);
    const result = await res.json();
    if (!result){
      toast.error("Товар не знайдено!")
      return;
    }
    setList(result.products);
  } catch (e) {
    console.error(e);
  }
};

const onSetProductFromList = (data) => {
  setProduct(data)
  setList([])
}

console.log(productData)
  
    return (
             <section className="container page">
               <Title>ПРОСМОТР ТОВАРА</Title>
                   <FormProvider {...methods}>
                    <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                    <Input
                        type="text"
                        placeholder="Пошук по моделі"
                        tabIndex={2}
                        onKeyDown={onChangeModel}
                        enterKeyHint="next"
                        label='Модель'
                        isBorder
                        name="model"
                    />
               </S.Form>
               </FormProvider>
            {!!productData && <ShopCard item={productData.product} setProduct={onSetProductFromList} isSelected info/>}
            {!!list?.length && 
            <S.List>
                {list.map(item => <ShopCard item={item} id={item.code} setProduct={onSetProductFromList} isList shop={shop} type="arrival"/>)}
             </S.List>}
            </section>
    )
}

    export default ProductViewPage