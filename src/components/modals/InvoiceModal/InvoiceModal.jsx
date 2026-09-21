import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input, Select } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import { getRate, lastSeasonValue, years } from "@/data";
import { companies } from "@/data/companies";
import { currencies } from "@/data/currencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getVendor, getColorSimple } from "@/data";
import { getDate } from "@/helpers/getDate";
import InvoiceProduct from "./Product";
import InvoiceList from "./InvoiceList";

const InvoiceModal = create(({ id, company }) => {
  const { remove } = useModal(id);
  const [items, setItems] = useState([])
  const [product, setProductState] = useState(null);
  const [list, setList] = useState([])
  const [rateValue, setRateValue] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(""); 

    const queryClient = useQueryClient();

  const { data: rate } = useQuery({ 
    queryKey: ["rate"],
    staleTime: Infinity // Запрещает повторные сетевые запросы
  });

  const methods = useForm({
    mode: "onSubmit" ,
  defaultValues: {
    season: lastSeasonValue,
    currency: [
      {currency: "UAH", rate: 45},
      {currency: "EUR", rate: 0.88},
      {currency: "USD", rate: 1}
    ],
    comment: "",
    company,
    date: new Date().toLocaleDateString('ru-RU')
  },
});
 const {
  handleSubmit,
  register,
  formState: { errors },
  control,
  setValue,
  watch,
  reset
} = methods;

const currency = watch('currency');
const year = watch("season");
const companyData = watch("company");

useEffect(() => {
  if (currency){
    // Получаем чистый ID валюты (поддерживает и объект от Селекта, и просто число)
    const currencyValue = typeof currency === 'object' ? currency?.value : currency ? Number(currency) : null;
    const currentRate = Number(getRate(rate, currencyValue)?.rate) || 1; // Защита: дефолтный курс, если кэш пуст

    setRateValue(currentRate)
  }
}, [currency]);

useEffect(() => {
  if (companyData){
    getList()
  }
}, [companyData])


const handleUpdateProduct = (updatedProduct) => {
  // 1. Обновляем текущий активный продукт на экране
  setProductState(updatedProduct);

  // 2. Обновляем этот же продукт внутри общего списка list, 
  // чтобы при повторном поиске/выборе сетка оставалась новой
  setList(prevList => 
    prevList.map(item => item._id === updatedProduct._id ? updatedProduct : item)
  );
};

const addInvoiceMutation = useMutation({
  mutationFn: async (invoiceData) => {
    const res = await fetch('/api/company/invoice/new', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoiceData) 
    });

    if (!res.ok) {
      throw new Error('Ошибка при создании накладной');
    }

    return res.json();
  },
  onSuccess: (result) => {
    if (result.status === "success") {
      toast.success(`Успешно добавлена накладная!`);
      setItems([])
      setList([])  
      setSelectedProductId("")
      setProductState(null)
      
      // 🔥 Сбрасываем кэш компании, чтобы React Query сам перезапросил свежие данные
      // Замените 'id', на реальную переменную айдишника этой компании
      queryClient.invalidateQueries({ queryKey: ['company', companyData] }); 
    }
  },
  onError: (error) => {
    console.error(error);
    toast.error('Не получилось добавить накладную');
  }
});


const onSubmit = async (data) => {
  if (!rateValue || typeof currency !== "number"){
    toast.error("Необхідно проставити курс валюти!")
    return
  }
  if (!items?.length){
    toast.error("Необхідно додати хоч один товар!")
    return
  }
  if (!data.date){
    toast.error("Необхідно додати дату!")
    return
  }

   const date = getDate(data.date);
   data.rate = rateValue;
   data.items = items;
   data.total = items.reduce((sum, item) => sum + item.total, 0);
   data.totalUSD = Number((data.total / rateValue).toFixed(2));
   data.date = date
   
    try {
      await addInvoiceMutation.mutateAsync(data);
    } catch (e){
      console.log(e)
    }

};

const getList = async () => {
  const data = {company: companyData, year};
    try {
     const res = await fetch("/api/products/company", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
                  })
    const list = await res.json();
    if (!list){
      toast.error("Товар не знайдено!")
      return;
    }
    if (list.products){
    const newArray = list.products.map(item => {
        const newItem = { ...item }; // Создаем копию объекта
        
        newItem.name = `${item.model} ${getColorSimple(item.color)} ${getVendor(item.vendor) ?? ""}`;   // Записываем значение из model в name (старое name затрется)
        newItem.value = item._id
        delete newItem.model;        // Удаляем старое поле model
        
        return newItem;
      });
      setList(newArray);
    }
  } catch (e) {
    console.error(e);
  }
}

const setProductToItems = (id) => {
  setSelectedProductId(id);
  setProductState(list.find(i => i._id === id))
}

const addItemToInvoice = ({quantity, sizes, price, id}) => {
  const itemData = list.find(item => item._id === id)
  const item = {quantity, sizes, price, total: price * quantity, product: itemData, productCode: itemData.code}
  setItems(prevItems => [...prevItems, item]);
  setProductState(null)
  setSelectedProductId(""); 
}

const deleteItem = (id) => {
  const filteredArray = items.filter(item => item._id !== id)
  setItems(filteredArray)
}

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title="Нова накладна" />
          <Content>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <Controller
                      control={control}
                      name="company"
                      render={({ field }) => (
                        <Select 
                          options={companies} 
                          label="Поставщики"
                          placeholder="Поставщик..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={1}
                        />
                      )}
                    />
                <Controller
                      control={control}
                      name="season"
                      render={({ field }) => (
                        <Select 
                          options={years} 
                          label="Год сезон"
                          placeholder="Год сезон"
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={2}
                        />
                      )}
                    />
                <Controller
                      control={control}
                      name="currency"
                      render={({ field }) => (
                        <Select
                          options={currencies} 
                          label="Валюта"
                          placeholder="Валюта"
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={3}
                        />
                      )}
                    />

              <Input
                  name="date"
                  type="date"
                  placeholder="31.08.2026"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Дата оплаты'
                />

              <Input
                  name="comment"
                  type="text"
                  placeholder="Комментарий..."
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Комментарий'
                />

                <Select
                  options={list} 
                  label="Товари"
                  placeholder="Оберіть товар"
                  isInput={true}
                  onChange={(e) => setProductToItems(e)} 
                  tabIndex={3}
                  value={selectedProductId} 
               />
        
                <Button type="submit">Провести</Button>
              </S.Form>
            </FormProvider>
            {!!items?.length && <InvoiceList list={items} deleteItem={deleteItem}/>}
            {product && <InvoiceProduct product={product} addToInvoice={addItemToInvoice} setProduct={handleUpdateProduct}/>}
          </Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default InvoiceModal;
