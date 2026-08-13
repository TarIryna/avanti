"use client";
import { useEffect, useState } from 'react';
import * as S from './styles'
import { companies } from '@/data/companies';
import { Button, Select } from '../../ui';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Title } from '../styles';
import { MODALS } from '@/constants/constants';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { useModal } from '@ebay/nice-modal-react';

registerDynamicModal(
  MODALS.PAYMENT,
  import("@/components/modals/PaymentModal/PaymentModal")
);

registerDynamicModal(
  MODALS.INVOICE,
  import("@/components/modals/InvoiceModal/InvoiceModal")
);

registerDynamicModal(
  MODALS.CURRENCY,
  import("@/components/modals/CurrencyModal/CurrencyModal")
);

const CompaniesPage = () => {
  const [data, setData] = useState(null)
  const {show: showPaymentModal} = useModal(MODALS.PAYMENT)
  const {show: showInvoiceModal} = useModal(MODALS.INVOICE)
  const {show: showCurrency} = useModal(MODALS.CURRENCY)

     const methods = useForm({
      defaultValues: {
         company: null
      },
   });

  const {
    control,
    watch,
    reset,
  } = methods;

const currentCompany = watch('company')

useEffect(() => {
  if (currentCompany){
    getCompanyData(currentCompany)
  }
}, [currentCompany])

const getCompanyData = async(id) => {
   try {
      const res = await fetch(`/api/company/${id}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

     const result = await res.json();
     if (result){
      console.log(result)
      setData(result)
     }
    } catch (e) {
      console.log(e)
    }
} 


    return (
      <section className="container page">
        <Title>ПОСТАВЩИКИ</Title>
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
      </section>
    )
}

export default CompaniesPage