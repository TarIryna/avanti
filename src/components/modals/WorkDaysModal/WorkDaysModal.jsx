'use client';
import { create, useModal } from "@ebay/nice-modal-react";
import React from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input, Select, Button } from "@/components/ui";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import { staffList } from "@/data";
import { spendings } from "@/data/spendings";
import toast from "react-hot-toast";
import { calculateWorkHours } from '@/utils/workHours';


const WorkDaysModal = create(({ id, shop}) => {
  const { remove } = useModal(id);
  const spendingList = spendings.filter(item => item.isShop && item.id === 13)

  const methods = useForm({
    mode: "onSubmit" ,
    defaultValues: {
      staff: null,
      type: 13,
      startHour: '',
      endHour: '',
    },
  });
 const {
  handleSubmit,
  formState: { errors, isSubmitting },
  control,
  watch,
  reset
} = methods;
const [startHour, endHour] = watch(['startHour', 'endHour']);
const hours = calculateWorkHours(startHour, endHour);

const onSubmit = async(data) => {
  const hours = calculateWorkHours(data.startHour, data.endHour);
  if (hours === null) return toast.error('Кінець робочого дня має бути пізніше початку. Введіть цілі години.');
  try {
    const res = await fetch('/api/shop/spending', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ staff: data.staff, type: 13, shop, startHour: data.startHour, endHour: data.endHour, hours })
      });
      const result = await res.json()
      if (!res.ok || !result.success) throw new Error(result.error || 'Не вдалося зберегти робочий день');
      if (result.success){
        toast.success("Робочий день збережено!")
        reset()
      }
  } catch (e) {
    toast.error(e.message || "Не вдалося зберегти робочий день")
  } 
};

  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <S.Container>
          <Head close={remove} title="Робочі дні" />
          <Content>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="on">

               <Controller
                  control={control}
                  name="staff"
                  rules={{ required: 'Оберіть працівника' }}
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
              {errors.staff && <S.Text role="alert">{errors.staff.message}</S.Text>}

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
                     disabled
                  />
               )}
              />

                <Input
                  name="startHour"
                  type="number"
                  min={0}
                  max={23}
                  step={1}
                  rules={{ required: 'Вкажіть початок дня', valueAsNumber: true, min: 0, max: 23, validate: value => Number.isInteger(value) || 'Введіть цілу годину' }}
                  tabIndex={3}
                  enterKeyHint="next"
                  isBorder
                  label='Початок дня'
                  placeholder="9"
                />

              <Input
                  name="endHour"
                  type="number"
                  min={1}
                  max={24}
                  step={1}
                  rules={{ required: 'Вкажіть кінець дня', valueAsNumber: true, min: 1, max: 24, validate: value => Number.isInteger(value) || 'Введіть цілу годину' }}
                  placeholder="19"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Кінець дня'
                />
                <S.Text aria-live="polite">Відпрацьовано: {hours ?? '—'} год.</S.Text>
                <Button type="submit" disabled={isSubmitting || hours === null}>{isSubmitting ? 'Збереження…' : 'Провести'}</Button>
              </S.Form>
            </FormProvider>
          </Content>
        </S.Container>
      </Wrapper>
    </ReactModal>
  );
});

export default WorkDaysModal;

