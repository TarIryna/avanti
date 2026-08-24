import { create, useModal } from "@ebay/nice-modal-react";
import React, { useEffect } from "react";
import ReactModal from "../ReactModal";
import Head from "../components/Head/Head";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Input, Select } from "@/components/ui";
import { Button } from "@mui/material";
import { Wrapper, Container, Content } from "../styles";
import * as S from "./styles";
import { getRate, lastSeasonValue, years } from "@/data";
import { companies } from "@/data/companies";
import { currencies } from "@/data/currencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PaymentModal = create(({ id, company }) => {
  const { remove } = useModal(id);
  const queryClient = useQueryClient();

    const { data: rate } = useQuery({ 
    queryKey: ["rate"],
    staleTime: Infinity // Запрещает повторные сетевые запросы
  });

  const methods = useForm({
    mode: "onSubmit" ,
  defaultValues: {
    season: lastSeasonValue,
    currency: [
      {currency: "UAH", rate: 45},
      {currency: "EUR", rate: 0.88},
      {currency: "USD", rate: 1}
    ],
    amount: null,
    comment: "",
    company,
    date: new Date().toLocaleDateString('ru-RU')
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

const currency = watch('currency');
const amount = watch('amount');
const companyData = watch('company');

useEffect(() => {
  // Получаем чистый ID валюты (поддерживает и объект от Селекта, и просто число)
  const currencyValue = typeof currency === 'object' ? currency?.value : currency ? Number(currency) : null;
  const currentAmount = Number(amount || 0);
  const currentRate = Number(getRate(rate, currencyValue)?.rate) || 1; // Защита: дефолтный курс, если кэш пуст

  // 🌟 Если сумма не введена — очищаем поле USD
  if (!currentAmount) {
    setValue('amountUSD', "");
    return;
  }

  // 🌟 Если выбраны USD (ID равен 2) — сумма дублируется 1 в 1
  if (currencyValue === 1) {
    setValue('amountUSD', currentAmount);
  } 
  // 🌟 Если выбрана грн (ID равен 1) — делим на курс и округляем до 2 знаков
  else {
    const calculatedUSD = (currentAmount / currentRate).toFixed(2);
    setValue('amountUSD', Number(calculatedUSD));
  }
}, [currency, amount, rate, setValue]);

const addPaymentMutation = useMutation({
  mutationFn: async (paymentData) => {
    const res = await fetch('/api/company/payment', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData) 
    });

    if (!res.ok) {
      throw new Error('Помилка при додаванні оплати');
    }

    return res.json();
  },
  onSuccess: (result) => {
    if (result.success) {
      toast.success(`Успішно додано оплату!`);
      
      // 🔥 Сбрасываем кэш компании, чтобы React Query сам перезапросил свежие данные
      // Замените 'id', на реальную переменную айдишника этой компании
      queryClient.invalidateQueries({ queryKey: ['company', companyData] }); 
    }
  },
  onError: (error) => {
    console.error(error);
    toast.error('Не вдалося додати оплату');
  }
});



  const onSubmit = async (formData) => {
    formData.rate = (formData.amount / formData.amountUSD).toFixed(2);
    try {
     await addPaymentMutation.mutateAsync(formData);
     reset()
  } catch (e) {
    console.log(e)
  }
  };


  return (
    <ReactModal id={id} closeOnClickOutside={false}>
      <Wrapper>
        <Container>
          <Head close={remove} title="Новый платеж" />
          <Content>
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <Controller
                      control={control}
                      name="company"
                      render={({ field }) => (
                        <Select 
                          options={companies} 
                          label="Поставщики"
                          placeholder="Поставщик..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={1}
                        />
                      )}
                    />
                <Controller
                      control={control}
                      name="season"
                      render={({ field }) => (
                        <Select 
                          options={years} 
                          label="Год сезон"
                          placeholder="Год сезон"
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={2}
                        />
                      )}
                    />
                <Controller
                      control={control}
                      name="currency"
                      render={({ field }) => (
                        <Select
                          options={currencies} 
                          label="Валюта"
                          placeholder="Валюта"
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={3}
                        />
                      )}
                    />
                <Input
                  name="amount"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="Сума оригінал"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Сума оригінал'
                />

                <Input
                  name="amountUSD"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="Сума в USD"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Сума в USD'
                />

              <Input
                  name="date"
                  type="date"
                  placeholder="31.08.2026"
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Дата оплаты'
                />

              <Input
                  name="comment"
                  type="text"
                  placeholder="Комментарий..."
                  tabIndex={4}
                  enterKeyHint="next"
                  isBorder
                  label='Комментарий'
                />
        
                <Button type="submit">Провести</Button>
              </S.Form>
            </FormProvider>
          </Content>
        </Container>
      </Wrapper>
    </ReactModal>
  );
});

export default PaymentModal;
