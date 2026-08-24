"use client";
import { useMemo } from 'react';
import * as S from './styles';
import { companies } from '@/data/companies';
import { Button, Select } from '../../ui';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { Title } from '../styles';
import { MODALS } from '@/constants/constants';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { useModal } from '@ebay/nice-modal-react';
import Invoices from './Invoices';
import Payments from './Payments';
import Results from './Results';
import { useQuery } from '@tanstack/react-query';

// Регистрация модалок остается на месте
registerDynamicModal(MODALS.PAYMENT, import("@/components/modals/PaymentModal/PaymentModal"));
registerDynamicModal(MODALS.INVOICE, import("@/components/modals/InvoiceModal/InvoiceModal"));
registerDynamicModal(MODALS.CURRENCY, import("@/components/modals/CurrencyModal/CurrencyModal"));

// 1. Выносим чистую функцию запроса ЗА ПРЕДЕЛЫ компонента
// Теперь она не пересоздается при ререндерах и не образует лишних замыканий
const fetchCompanyData = async (id) => {
  if (!id) return null;
  const res = await fetch(`/api/company/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных компании');
  }
  return res.json();
};

const CompaniesPage = () => {
  const { show: showPaymentModal } = useModal(MODALS.PAYMENT);
  const { show: showInvoiceModal } = useModal(MODALS.INVOICE);
  const { show: showCurrency } = useModal(MODALS.CURRENCY);

  const methods = useForm({
    defaultValues: { company: null },
  });

  const { control } = methods;

  // 2. Используем useWatch вместо watch. 
  // Передаем control, чтобы изолировать подписку на изменение конкретного поля 'company'
  const currentCompany = useWatch({
    control,
    name: 'company',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['company', currentCompany],
    queryFn: () => fetchCompanyData(currentCompany),
    enabled: !!currentCompany,
  });

  // Пересчет данных через useMemo (остается без изменений, так как зависит только от data)
  const results = useMemo(() => {
    if (!data || !Array.isArray(data.payments) || !Array.isArray(data.invoices)) {
      return { company: {}, payments: [], invoices: [] };
    }

    const paymentsResults = data.payments.reduce((acc, item) => {
      const { season, currency, amount, amountUSD } = item;
      if (!acc[season]) acc[season] = {};
      if (!acc[season][currency]) {
        acc[season][currency] = { amount: 0, amountUSD: 0 };
      }
      acc[season][currency].amount += amount || 0;
      acc[season][currency].amountUSD += amountUSD || 0;
      return acc;
    }, {});

    const invoicesResults = data.invoices.reduce((acc, item) => {
      const { season, currency, total, totalUSD } = item;
      if (!acc[season]) acc[season] = {};
      if (!acc[season][currency]) {
        acc[season][currency] = { total: 0, totalUSD: 0 };
      }
      acc[season][currency].total += total || 0;
      acc[season][currency].totalUSD += totalUSD || 0;
      return acc;
    }, {});

    return { payments: paymentsResults, invoices: invoicesResults };
  }, [data]);

   return (
      <section className="container page">
        <Title>{ data?.company?.name ? data.company.name : 'ПОСТАВЩИКИ'}</Title>
          <FormProvider {...methods}>
            <S.Form onSubmit={(e) => {
                  e.preventDefault(); // Блокируем стандартную отправку браузера при Enter
                  handleSubmit(onSubmit)(e);
                }}>
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
                <Button type="button" onClick={() => showPaymentModal({company: currentCompany})}>Новий платіж</Button>
                <Button type="button" onClick={() => showInvoiceModal({company: currentCompany})}>Нова накладна</Button>
                <Button type="button" onClick={() => showCurrency()}>Внести новий курс</Button>
            </S.Form>
      </FormProvider>
      {data && 
        <>
        {results && <Results results={results}/>}
        <S.Grid>
          {!!data.payments?.length && !isLoading && !isError && <Payments payments={data.payments} />}
          {!!data.invoices?.length && !isLoading &&  !isError && <Invoices invoices={data.invoices} />}
        </S.Grid>
        </>}
      </section>
    )
};

export default CompaniesPage;



