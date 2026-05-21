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
import { MODALS } from "@/constants/constants";

registerDynamicModal(
  MODALS.CHECK_PRINT,
  import("@/components/modals/CheckModal/CheckPrint")
);

const CheckModal = create(({ id, check }) => {
  const { visible, hide } = useModal(id);
  const [terminal, setTerminal] = useState(0)
  const [cash, setCash] = useState(0)

  const {show: showPrint} = useModal(MODALS.CHECK_PRINT)


  const methods = useForm({ mode: "onSubmit" });
  const {
    register,
    formState: { errors },
    setError,
    reset,
    watch,
    setValue
  } = methods;



const onChangeTerminal = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const terminal = watch("terminal");
  const cash = check.total - terminal

  try {
    setTerminal(terminal)
    setCash(cash)
    setValue('cash', cash)
  } catch (e) {
    console.error(e);
  }
}

const onChangeCash = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const cash = watch("cash");
  const terminal = check.total - cash

  try {
    setCash(cash)
    setTerminal(terminal)
    setValue('terminal', terminal)
  } catch (e) {
    console.error(e);
  }
}

const sendOperation = async(params) => {
      const res = await fetch("/api/shop/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const result = res.json();
      console.log(result)
      return result
}

const onPrint = () => {
  const cashData = cash === 0 && terminal === 0 ? check.total : cash
  const data = {...check, cash: cashData, terminal}
  sendOperation(data)
  showPrint({data})
}

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={hide} title="Чек продажу" />
          <Content>
            <FormProvider {...methods}>
              <S.Form autoComplete="off">
                {check.client && <S.Text>{`КЛІЄНТ: ${check.client.phone} ${check.client.discount}%`}</S.Text>}
                {!!check.items?.length && check.items.map(item => <CheckProductInfo data={item}/>)}
                {!!check.items?.length && <S.Total>До сплати: {check.total} грн</S.Total>}
                <Input
                  placeholder="термінал"
                  {...register("terminal")}
                  onKeyDown={onChangeTerminal}
                  tabIndex={1}
                  type="text"
                  label="Термінал"
                />
                <Input
                  placeholder="готівка"
                  {...register("cash")}
                  onKeyDown={onChangeCash}
                  tabIndex={1}
                  type="text"
                  label="Готівка"
                />
                <Button onClick={onPrint}>
                  Провести продаж
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
