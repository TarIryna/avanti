import { FormProvider, Controller, useForm } from 'react-hook-form';
import { currencies } from '@/data/currencies';
import { Input, Select } from '../../ui';
import toast from 'react-hot-toast';
import { getCurrencyName } from '@/data';
import * as S from './styles'

const RateForm = () => {
  const methods = useForm({
        defaultValues: {
           currency: null,
           rate: null
        },
     });

     const {
    register,
    control,
    watch,
    reset,
  } = methods;

 const onSetRate = async() => {
  const rate = watch('rate')
  const currency = watch('currency')
  const data = {rate, currency}
  if (!rate){
    return
  }
  try {
    const res = await fetch('/api/rate', { 
        method: 'POST', // Переключаем на POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
     const result = await res.json();

     if (result.success){
      toast.success(`Задано курс ${result.newRate?.rate ?? ''} для валюты ${getCurrencyName(result.newRate?.currency ?? '')}`)
      reset()
    }
  } catch (e) {
    console.log(e)
  }
 }

    return (
         <FormProvider {...methods}>
            <S.Form>
                <Controller
                      control={control}
                      name="currency"
                      render={({ field }) => (
                        <Select 
                          options={currencies} 
                          label="Валюта"
                          placeholder="Выбери валюту..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange} 
                          tabIndex={1}
                        />
                      )}
                    />
                  <Input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    placeholder="Курс"
                    name="rate"
                    tabIndex={1}
                    enterKeyHint="next"
                    isBorder
                    label='Курс'
                  />
    
                <S.CheckButton type="button" onClick={onSetRate}>Задати курс</S.CheckButton>
            </S.Form>
        </FormProvider>
    )

}

export default RateForm