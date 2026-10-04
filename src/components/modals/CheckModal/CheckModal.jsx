import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../components/Head/Head";
import { Input, Button } from "@/components/ui";
import CheckProductInfo from "@/components/Shop/CheckProductInfo";
import * as S from "./styles";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, OPERATION_TYPE } from "@/constants/constants";
import toast from "react-hot-toast";

registerDynamicModal(
  MODALS.CHECK_PRINT,
  import("@/components/modals/CheckModal/CheckPrint")
);

const CheckModal = create(({ id, check, type, resetCheck }) => {
  const { visible, hide } = useModal(id);

  const { show: showPrint } = useModal(MODALS.CHECK_PRINT);
  const title = type === OPERATION_TYPE.SALE ? "Чек продажу" : "Чек повернення";
  const buttonText = type === OPERATION_TYPE.SALE ? "Провести продаж" : "Провести повернення";

  const methods = useForm({ 
    mode: "onSubmit",
    defaultValues: {
      terminal: "",
      cash: ""
    }
  });
  
  const {
    watch,
    setValue
  } = methods;

  const terminal = watch('terminal')
  const cash = watch('cash')

  useEffect(() => {
    const terminalValue = Math.max(0, Number(check.total) - Number(cash))
    setValue('terminal', terminalValue, { shouldValidate: true, shouldDirty: true });
  }, [cash])
  
  useEffect(() => {
    const cashValue = Math.max(0, Number(check.total) - Number(terminal))
    setValue('cash', cashValue, { shouldValidate: true, shouldDirty: true })
  }, [terminal])

// // Изменение терминала меняет наличку
// const onChangeTerminal = (e) => {
//   if (e.key !== "Enter") return;
//   e.preventDefault();

//   // 🌟 Читаем значение НАПРЯМУЮ из инпута, минуя watch()
//   const inputValue = e.target.value; 

//   const terminalValue = Number(inputValue || 0);
//   const cashValue = Math.max(0, Number(check.total) - terminalValue);
//   setCash(cashValue);
  
//   // Принудительно прописываем значение во второй инпут и обновляем состояние формы
//   setValue('cash', cashValue, { shouldValidate: true, shouldDirty: true });
// };


// // Изменение налички меняет терминал
// const onChangeCash = (e) => {
//   if (e.key !== "Enter") return;
//   e.preventDefault();

//   // 🌟 Читаем значение НАПРЯМУЮ из инпута, минуя watch()
//   const inputValue = e.target.value;

//   const cashValue = Number(inputValue || 0);
//   const terminalValue = Math.max(0, Number(check.total) - cashValue);
  
//   // Принудительно прописываем значение в первый инпут и обновляем состояние формы
//   setValue('terminal', terminalValue, { shouldValidate: true, shouldDirty: true });
// };


  const sendOperation = async (params) => {
    try {
      const res = await fetch("/api/shop/operation/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err) {
      console.error("Ошибка отправки операции:", err);
    }
  };

  const onPrint = () => {
    // Если менеджер ничего не вводил, то вся сумма идет в наличку по умолчанию
    const cashData = cash === 0 && terminal === 0 ? check.total : cash;
    
    const data = {
      client: check.client, 
      items: check.items, 
      total: check.total, 
      shop: check.shop, 
      cash: cashData, 
      terminal, 
      type
    };
    
    sendOperation(data);
    showPrint({ data, type, resetCheck });
    hide(); // Закрываем модальное окно после проведения операции
  };


  console.log(term)

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={hide} title={title} />
          <Content>
            <FormProvider {...methods}>
              <S.Form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                {check.client && <S.Text>{`КЛІЄНТ: ${check.client.phone} ${check.client.discount}%`}</S.Text>}
                {!!check.items?.length && check.items.map(item => <CheckProductInfo key={item.code} data={item}/>)}
                {!!check.items?.length && <S.Total>До сплати: {check.total} грн</S.Total>}
                
                {/* 🌟 ИСПРАВЛЕНО: Используем name вместо ...register */}
                <Input
                  name="terminal"
                  placeholder="термінал"
                  onKeyDown={onChangeTerminal}
                  tabIndex={1}
                  type="text"
                  label="Термінал"
                  onBlurHandler={onChangeTerminal}
                />
                
                {/* 🌟 ИСПРАВЛЕНО: Используем name вместо ...register */}
                <Input
                  name="cash"
                  placeholder="готівка"
                  onKeyDown={onChangeCash}
                  tabIndex={2}
                  type="text"
                  label="Готівка"
                />
                
                <Button type="button" onClick={onPrint}>
                  {buttonText}
                </Button>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default CheckModal;
