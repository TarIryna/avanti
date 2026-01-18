import { create, useModal } from "@ebay/nice-modal-react";

import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import { LOGIN, MODALS } from "@/constants/constants";
import Head from "../components/Head/Head";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Container, Content } from "../styles";
import { toast } from "react-hot-toast";
import { useUpdateUser } from "@/fetchActions/user/useUpdateUser";
import * as S from "./styles";
import DeliverySelect from "@/components/Cart/DeliverySelect/DeliverySelect";
import { useUserSession } from "@/fetchActions/user/useUser";

const UpdateProfileModal = create(({ id }) => {
  const { hide } = useModal(MODALS.UPDATE_PROFILE);
  const { data: user } = useUserSession();
  const { mutate: updateUser, isPending } = useUpdateUser(hide);
  const userId = user?.id;

  const methods = useForm({
    mode: "onSubmit" ,
  defaultValues: {
    city: "",
    cityDescription: "",

    address: "",
    addressDescription: "",
  },
});
 const {
  handleSubmit,
  register,
  formState: { errors },
  control,
  setValue,
  watch,
} = methods;

const updateProfile = (formData) => {
  if (!user?._id) return;

  updateUser({
    id: user._id,
    user: {
      ...formData,
      city: formData.city,
      cityDescription: formData.cityDescription,
      address: formData.address,
      addressDescription: formData.addressDescription,
    },
  });
};


  const onSubmit = (data) => {
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
                  {...register("username", { required: true })}
                  error={errors?.name}
                  tabIndex={1}
                  enterKeyHint="next"
                  defaultValue={user?.name}
                  isBorder
                  label="Ім'я"
                />
                <Input
                  placeholder="Прізвище"
                  {...register("surname", { required: true })}
                  error={errors?.surname}
                  tabIndex={2}
                  enterKeyHint="next"
                  defaultValue={user?.surname}
                  isBorder
                  label="Прізвище"
                />
                <Input
                  placeholder="Телефон"
                  {...register("phone", { required: true })}
                  error={errors?.phone}
                  tabIndex={3}
                  enterKeyHint="next"
                  defaultValue={user?.phone}
                  isBorder
                  label="Телефон"
                />
             <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DeliverySelect
                    title="Місто"
                    value={field.value}
                    onChange={(option) => {
                      field.onChange(option.label);     // то, что хранится в RHF
                      setValue("city", option.value);
                      setValue("cityDescription", option.label) // если нужен Ref
                      setValue("address", "");           // сброс адреса
                    }}
                    fetchOptions={async (query) => {
                      const res = await fetch(
                        `/api/shipping/novaposhta/cities?query=${query}`
                      );
                      const json = await res.json();
                      return json.data.map((c) => ({
                        value: c.Ref,
                        label: c.Description,
                      }));
                    }}
                  />
                )}
              />

          <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DeliverySelect
                  title="Адреса доставки"
                  value={field.value}
                  onChange={(option) => {
                    setValue("address", option.value);
                    setValue("addressDescription", option.label)
                  }}
                  fetchOptions={async () => {
                    const res = await fetch(
                      `/api/shipping/novaposhta/adress?query=${methods.watch("city")}`
                    );
                    const json = await res.json();
                    return json.data.map((a) => ({
                      value: a.Ref,
                      label: a.Description,
                    }));
                  }}
                />
              )}
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
