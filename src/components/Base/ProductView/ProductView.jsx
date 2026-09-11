import * as S from './styles'
import { Title } from '../styles'
import { useState } from 'react';
import { Input } from '@/components/ui';
import ShopCard from '@/components/Shop/ShopCard/ShopCard';
import { useForm, FormProvider } from 'react-hook-form';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductOperations from './ProductOperations/ProductOperations';
import ProductInvoices from './ProductInvoices/ProductInvoices';
import ProductResult from './ProductResult/ProductResult';

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

    const getTotalOperations = (operations) => {
      if (!operations) return { totalUAH: 0, totalUSD: 0, totalCount: 0 }
      return operations.reduce((acc, operation) => {
      const isSalePrice = !!operation.salePrice
      const totalLocal = isSalePrice ? operation.salePrice : 0;
      const rate = operation.rate || 45;
      const totalUSD = isSalePrice ? (totalLocal / rate) : 0;
      const totalCount = isSalePrice ? operation.quantity : 0;
      acc.totalUAH += totalLocal;
      acc.totalUSD += totalUSD;
      acc.totalCount += totalCount;
      return acc;
  }, { totalUAH: 0, totalUSD: 0, totalCount: 0 });
}

  const getTotalInvoices = (invoices) => {
    if (!invoices) return { byCurrency: {}, totalUSD: 0, totalCount: 0 }
    return invoices.reduce((acc, invoice) => {
      const currency = invoice.currency;
      const rate = invoice.rate || 1;

      let localItemTotal = 0;
      let localItemCount = 0;
      
      if (invoice.items && Array.isArray(invoice.items)) {
        invoice.items.forEach(item => {
          localItemTotal += item.total || 0;
          localItemCount += item.quantity || 0; // или item.totalCount, в зависимости от имени поля в item
        });
      }
      // Считаем сумму в USD для текущего инвойса
      const totalUSD = localItemTotal / rate;

      // Инициализируем валюту в аккумуляторе, если её еще нет
      if (!acc.byCurrency[currency]) {
        acc.byCurrency[currency] = 0;
      }

      // Суммируем в локальной валюте и общую сумму в USD
      acc.byCurrency[currency] += localItemTotal;
      acc.totalUSD += totalUSD;
      acc.totalCount += localItemCount;

      return acc;
  }, { byCurrency: {}, totalUSD: 0, totalCount: 0 });
}

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
             {!!productData?.product &&  <S.Wrapper>
                <ShopCard item={productData.product} setProduct={onSetProductFromList} isSelected info/>
                <ProductInfo product={productData.product}/>
              </S.Wrapper>}
              {!!productData?.operations && !!productData?.invoices && <ProductResult operations={getTotalOperations(productData.operations)} invoices={getTotalInvoices(productData.invoices)}/>}
              {!!productData && <S.Grid>
                  <ProductOperations operations={productData.operations ?? []} total={getTotalOperations(productData.operations)}/>
                  <ProductInvoices invoices={productData.invoices ?? []} code={productData?.product?.code} total={getTotalInvoices(productData.invoices)}/>
              </S.Grid>}
            {!!list?.length && 
            <S.List>
                {list.map(item => <ShopCard item={item} id={item.code} setProduct={onSetProductFromList} isList shop={shop} type="arrival"/>)}
             </S.List>}

            </section>
    )
}

    export default ProductViewPage