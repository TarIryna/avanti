import { create, useModal } from "@ebay/nice-modal-react";

import React from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../components/Head/Head";
import { Input, Button } from "@/components/ui";
import * as S from "./styles";

const DeliveryTtn = create(({ id, order, createTTN }) => {
  const { visible, remove } = useModal(id);

  const methods = useForm({ mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const onSubmit = (formData) => {
    createTTN(order, formData.payment)
    remove()
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={remove} title="Формування ТТН" />
          <Content>
            <S.Title>
              Оберіть суму, яка буде накладеним платежем (по замовченню встановлюється сума замовлення - 100грн!).
              <br/>Якщо нема, то треба поставити 0
            </S.Title>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input
                  placeholder="Сума наложки"
                  {...register("payment", { required: true })}
                  tabIndex={1}
                  enterKeyHint="done"
                  defaultValue={order.totalPrice - 100}
                  type="number"
                />
                <Button type="submit" fullWidth={true}>
                  Згенерувати ТТН
                </Button>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default DeliveryTtn;
