import { create, useModal } from "@ebay/nice-modal-react";

import React from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Container, Content } from "../styles";
import { FormProvider, useForm } from "react-hook-form";
import Head from "../components/Head/Head";
import { Input, Button } from "@/components/ui";
import * as S from "./styles";

const ForgorPassword = create(({ id }) => {
  const { visible, hide } = useModal(id);

  const methods = useForm({ mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={hide} title="Відновлення паролю" />
          <Content>
            <S.Title>
              Введіть ваш email, з яким ви зареєструвались на сайті:
            </S.Title>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input
                  placeholder="email"
                  {...register("email", { required: true })}
                  tabIndex={1}
                  enterKeyHint="done"
                  type="email"
                />
                <Button type="submit">
                  Відправити запит на відновлення паролю
                </Button>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default ForgorPassword;
