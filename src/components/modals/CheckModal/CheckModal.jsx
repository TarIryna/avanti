import { create, useModal } from "@ebay/nice-modal-react";
import React, {useMemo} from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../components/Head/Head";
import { Input, Button } from "@/components/ui";
import CheckProductInfo from "@/components/Shop/CheckProductInfo";
import * as S from "./styles";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS, OPERATION_TYPE } from "@/constants/constants";

registerDynamicModal(
  MODALS.CHECK_PRINT,
  import("@/components/modals/CheckModal/CheckPrint")
);

const CheckModal = create(({ id, check, type, resetCheck }) => {
  const { remove } = useModal(id);
  const { show: showPrint } = useModal(MODALS.CHECK_PRINT);

  const title = type === OPERATION_TYPE.SALE ? "Чек продажу" : "Чек повернення";
  const buttonText = type === OPERATION_TYPE.SALE ? "Провести продаж з чеком" : "Провести повернення з чеком";

  // 1. Инициализируем форму. Сумма по умолчанию идет в наличку (или как вам удобно)
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      terminal: 0,
    }
  });

  const { setValue, handleSubmit, watch } = methods;

  const terminal = Number(watch('terminal') ?? 0)

  const cash = useMemo(() => {
    const total = check.total ?? 0;
    return total - terminal;
  }, [terminal])

  const handleTerminalChange = (e) => {
    const value = Number(e.target.value);
    setValue("terminal", value);
};


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

  const onTerminalButton = () => {
    setValue("terminal", check.total);
    onSubmit(check.total, true)
  }

  const onTerminalNoPrintButton = () => {
    setValue("terminal", check.total);
    onSubmit(check.total, false)
  }

  const onPrintButton = () => {
    onSubmit(terminal, true)
  }

  const onNoPrintButton = () => {
    onSubmit(terminal, false)
  }

  // 3. Отправка формы через стандартный onSubmit в react-hook-form
  const onSubmit = async (terminal, isPrint) => {
    const payload = {
      client: check.client,
      items: check.items,
      total: check.total,
      shop: check.shop,
      terminal,
      type
    };

    await sendOperation(payload);
    if (isPrint){
      showPrint({ data: payload, type, resetCheck });
    }
    remove();
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={remove} title={title} />
          <Content>
            <FormProvider {...methods}>
              {/* Стандартный сабмит формы */}
              <S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {check.client && (
                  <S.Text>{`КЛІЄНТ: ${check.client.phone} ${check.client.discount}%`}</S.Text>
                )}
                
                {!!check.items?.length && 
                  check.items.map(item => <CheckProductInfo key={item.code} data={item}/>)
                }
                
                {!!check.items?.length && (
                  <S.Total>До сплати готівкою: {cash} грн</S.Total>
                )}

                {/* 4. Возвращаем стандартный register и обрабатываем изменение */}
                <Input 
                  name="terminal"
                  placeholder="термінал" 
                  type="number" 
                  label="Термінал"
                  onChange={(e) => handleTerminalChange(e)}
                />
                <S.Grid>
            
                <Button type="button" onClick={onPrintButton}>
                  {buttonText}
                </Button>
                <Button type="button" onClick={onNoPrintButton}>
                  Провести без чека
                </Button>
                <Button type="button" onClick={onTerminalButton}>
                  Провести терміналом з чеком
                </Button>
                <Button type="button" onClick={onTerminalNoPrintButton}>
                  Провести терміналом без чека
                </Button>
                </S.Grid>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default CheckModal;
