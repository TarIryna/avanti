import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect, useState } from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input, Select } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import { staffList } from "@/data";
import { spendings } from "@/data/spendings";
import toast from "react-hot-toast";


const SpendingsModal = create(({ id, shop}) => {
  const { remove } = useModal(id);
  const spendingList = spendings.filter(item => item.isShop && item.id !== 13)

  const methods = useForm({
    mode: "onSubmit" ,
    defaultValues: {
      staff: null,
      comment: "",
      type: null,
      amount: null
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

const onSubmit = async(data) => {
  try {
    const res = await fetch('/api/shop/spending', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
      const result = await res.json()
      if (result.success){
        toast.success("Успішно додано витрати!")
        reset()
      }
  } catch (e) {
    toast.error("Виникла помилка при відправці витрат!")
  } 
};

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
                  name="staff"
                  render={({ field }) => (
                   <Select 
                     options={staffList} 
                     label="Ім'я"
                     placeholder="Пошук..."
                     value={field.value} 
                     isInput={true}
                     onChange={field.onChange} 
                     tabIndex={1}
                  />
               )}
              />

              <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                   <Select 
                     options={spendingList} 
                     label="Тип витрат"
                     placeholder="Пошук..."
                     value={field.value} 
                     isInput={true}
                     onChange={field.onChange} 
                     tabIndex={2}
                  />
               )}
              />

                <Input
                  name="amount"
                  type="number"
                  tabIndex={3}
                  enterKeyHint="next"
                  isBorder
                  label='Сума'
                />

              <Input
                  name="comment"
                  type="text"
                  placeholder="Коментар"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Коментар'
                />
                <Button type="submit">Провести</Button>
              </S.Form>
            </FormProvider>
          </Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default SpendingsModal;

