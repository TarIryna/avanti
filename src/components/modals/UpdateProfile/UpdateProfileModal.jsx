import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import { LOGIN, MODALS } from "@/constants/constants";
import Head from "../components/Head/Head";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Container, Content } from "../styles";
import * as S from "./styles";

const UpdateProfileModal = create(({ id }) => {
  const { hide, args } = useModal(MODALS.UPDATE_PROFILE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = args;
  const userId = user?._id;

  const methods = useForm({ mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const updateProfile = async (data) => {
    setIsSubmitting(true);
    if (!userId) return alert("Missing Id!");
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          user: data,
        }),
      });

      if (response.ok) {
        console.log("updated");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    updateProfile(data);
  };

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={hide} title="Оновлення профілю" />
          <Content>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                <Input
                  placeholder="Ім'я"
                  {...register("name", { required: true })}
                  error={errors?.name}
                  tabIndex={1}
                  enterKeyHint="next"
                  defaultValue={user?.name}
                />
                <Input
                  placeholder="Прізвище"
                  {...register("surname", { required: true })}
                  error={errors?.surname}
                  tabIndex={2}
                  enterKeyHint="next"
                  defaultValue={user?.surname}
                />
                <Input
                  placeholder="Телефон"
                  {...register("phone", { required: true })}
                  error={errors?.phone}
                  tabIndex={3}
                  enterKeyHint="next"
                  defaultValue={user?.phone}
                />
                <Input
                  placeholder="Місто"
                  {...register("city", { required: true })}
                  error={errors?.city}
                  tabIndex={4}
                  enterKeyHint="next"
                  defaultValue={user?.city}
                />
                <Input
                  placeholder="Реквізити доставки"
                  {...register("adress", { required: true })}
                  error={errors?.adress}
                  tabIndex={1}
                  enterKeyHint="done"
                  defaultValue={user?.adress}
                />
                <Button type="submit">Оновити</Button>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default UpdateProfileModal;
