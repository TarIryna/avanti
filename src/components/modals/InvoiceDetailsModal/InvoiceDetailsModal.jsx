import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../styles";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { getCompanyName } from "@/data/companies";
import * as S from './styles';
import { getCurrencyName } from "@/data";
import { Button, Input, Select } from "@/components/ui"; // Предполагаю, что у вас есть компонент Button
import toast from "react-hot-toast";
import InvoiceProduct from "../InvoiceModal/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InvoiceList from "../InvoiceModal/InvoiceList";

const InvoiceModal = create(({ item, id }) => {
  const { remove } = useModal(id);
  const queryClient = useQueryClient();
  // 1. Создаем локальный стейт для редактируемых товаров накладной
  const [invoiceItems, setInvoiceItems] = useState(item.items || []);
  const [rateValue, setRateValue] = useState(Number(item.rate) || 1);
  const [invoiceDate, setInvoiceDate] = useState(
    item.date ? new Date(item.date).toISOString().slice(0, 10) : ""
  );
  const [comment, setComment] = useState(item.comment || "");
  const [isSaving, setIsSaving] = useState(false);
  const [list, setList] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(""); 
  const [product, setProductState] = useState(null);

  // Вычисляем общую сумму и количество на лету на основе измененных инпутов
  const currentTotalQuantity = invoiceItems.reduce((acc, current) => acc + Number(current.quantity || 0), 0);
  const currentTotalSum = invoiceItems.reduce((acc, current) => acc + (Number(current.price || 0) * Number(current.quantity || 0)), 0);
  const currentTotalUSD = item.currency !== 1
    ? (currentTotalSum / (Number(rateValue) || 1)).toFixed(2)
    : currentTotalSum.toFixed(2);

 const getList = async () => {
  const data = {company: item.company, year: item.season};
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
      const newArray = list.products.map(i => {
      const newItem = { ...i }; // Создаем копию объекта
       // Безопасно получаем цвет и вендора (если функции вернут ошибку или параметров нет)
        const colorText = typeof getColorSimple === 'function' && i.color !== undefined ? getColorSimple(i.color) : "";
        const vendorText = typeof getVendor === 'function' && i.vendor !== undefined ? (getVendor(i.vendor) ?? "") : "";
        newItem.name = `${i.model || ""} ${i.code ?? ""} ${colorText} ${vendorText}`.trim();
        newItem.value = i._id;
        // delete newItem.model;
        return newItem;
      });
      setList(newArray);
    }
  } catch (e) {
    console.error(e);
  }
}


  useEffect(() => {
    getList()
  }, [])

  const setProductToItems = (id) => {
  setSelectedProductId(id);
  setProductState(list.find(i => i._id === id))
}

const addItemToInvoice = ({quantity, sizes, price, id}) => {
  const itemData = list.find(item => item._id === id)
  const item = {quantity, sizes, price, total: price * quantity, product: itemData, productCode: itemData.code}
  setInvoiceItems(prevItems => [...prevItems, item]);
  setProductState(null)
  setSelectedProductId(""); 
}

  // 2. Функция для сохранения изменений на бэкенд
  const handleSaveChanges = async () => {
    if (!invoiceDate) {
      toast.error("Укажите дату инвойса");
      return;
    }

    if (!Number.isFinite(Number(rateValue)) || Number(rateValue) <= 0) {
      toast.error("Курс должен быть больше нуля");
      return;
    }

    try {
      setIsSaving(true);
      await updateInvoiceMutation.mutateAsync({     
        invoiceId: item._id, // или item.id, в зависимости от вашей БД
          items: invoiceItems,
          total: currentTotalSum,
          totalQuantity: currentTotalQuantity,
          totalUSD: currentTotalUSD,
          rate: Number(rateValue),
          date: invoiceDate,
          comment,
        });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  
const handleUpdateProduct = (updatedProduct) => {
  // 1. Обновляем текущий активный продукт на экране
  setProductState(updatedProduct);

  // 2. Обновляем этот же продукт внутри общего списка list, 
  // чтобы при повторном поиске/выборе сетка оставалась новой
  setList(prevList => 
    prevList.map(item => item._id === updatedProduct._id ? updatedProduct : item)
  );
};

const updateInvoiceMutation = useMutation({
  mutationFn: async (invoiceData) => {
    const res = await fetch('/api/company/invoice/update', { 
      method: 'PUT',
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
      toast.success(`Успешно изменена накладная!`);
      queryClient.invalidateQueries({ queryKey: ['company', item.company] });
      remove();
    }
  },
  onError: (error) => {
    console.error("=== КРИТИЧЕСКАЯ ОШИБКА GETLIST ===");
    console.error(e); 
    
    // 2. Вывод стек-трейса (покажет точную строку, где упал map)
    console.log(e.stack); 
    
    // 3. Вывод текстового сообщения
    console.log("Сообщение ошибки:", e.message); 
    toast.error(error?.message);
  }
});

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title="Редагування накладної" />
          <S.Content>
              <S.Flex>
                <S.Title>Дата: </S.Title>
                <Input
                  type="date"
                  value={invoiceDate}
                  onValueChange={(event) => setInvoiceDate(event.target.value)}
                  className="rate_input"
                />
              </S.Flex>
              <S.Flex>
                <S.Title>Номер: </S.Title>
                <Input
                  type="text"
                  value={comment}
                  onValueChange={(event) => setComment(event.target.value)}
                  className="rate_input"
                />
              </S.Flex>
              <S.Flex>
                <S.Title>Компанія: </S.Title>
                <S.Text>{getCompanyName(item.company)} </S.Text>
              </S.Flex>
              <S.Flex>
                <S.Title>Сума: </S.Title>
                <S.Text>{`${currentTotalSum?.toFixed(2)} ${getCurrencyName(item.currency)}`}</S.Text>
              </S.Flex>
              <S.Flex>
                <S.Title>Пар: </S.Title>
                <S.Text>{currentTotalQuantity}</S.Text>
              </S.Flex>
              <S.Flex>
                <S.Title>Курс: </S.Title>
                <Input
                    type="number"
                    min="0.000001"
                    step="any"
                    value={rateValue}
                    onValueChange={(event) => setRateValue(event.target.value)}
                    aria-label="Курс валюты"
                    className="rate_input"
                /> 
              </S.Flex>
              
              {item.currency !== 1 && (
                <S.Flex>
                  <S.Title>Сума USD: </S.Title>
                  <S.Text>{currentTotalUSD}</S.Text>
                </S.Flex>
              )}

              {!!invoiceItems.length && (
                <InvoiceList
                  items={invoiceItems} 
                  setItems={setInvoiceItems} 
                  rate={rateValue}
                />
              )}
               <Select
                  options={list} 
                  onFocus={() => getList()}
                  label="Товари"
                  placeholder="Оберіть товар"
                  isInput={true}
                  onChange={(e) => setProductToItems(e)} 
                  tabIndex={3}
                  value={selectedProductId} 
               />
               {product && <InvoiceProduct product={product} addToInvoice={addItemToInvoice} setProduct={handleUpdateProduct}/>}

              <S.ButtonsWrapper>
                <Button variant="outline" onClick={remove} disabled={isSaving}>
                  Скасувати
                </Button>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? "Збереження..." : "Зберегти зміни"}
                </Button>
              </S.ButtonsWrapper>
          </S.Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default InvoiceModal;
