"use client";
import { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { Select } from '../../ui';
import { colors, years, seasonData, types, genders, vendors, views, materialData, countries } from '@/data';
import toast from 'react-hot-toast';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { MODALS } from '@/constants/constants';
import { useModal } from '@ebay/nice-modal-react';
import CatalogCard from '../CatalogCard/CatalogCard';
import { Form, Row, ListRevalue } from './styles';
import { Title, ButtonsConatainer, CheckButton } from '../styles';

registerDynamicModal(
  MODALS.CATALOG_MODAL,
  import("@/components/modals/CatalogModal/CatalogModal")
);

const CatalogPage = () => {
   const [list, setList] = useState([])
   const {show} = useModal(MODALS.CATALOG_MODAL)

     const methods = useForm({
      defaultValues: {
         type: 1,
         season: [],      // для isMulti
         year: "",
         yearMinus: "",
         yearPlus: "",
         gender: [],      // для isMulti
         vendor: [],      // для isMulti
         color: [],       // для isMulti
         country: [],     // для isMulti
         material: "",
         view: "",
      },
   });

   const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    setValue // Нужен для динамической записи кода в инпут
  } = methods;

  const onSubmit = async(data) => {
   try {
      const res = await fetch('/api/products/list', { 
        method: 'POST', // Переключаем на POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });

     const result = await res.json();
     if (result.products){
      setList(result.products);
      toast.success(`Знайдено ${result.total} товарів`)
     }
    } catch (e) {
      console.log(e)
    }
  }

    return (
      <section className="container page">
        <Title>КАТАЛОГ</Title>
          <FormProvider {...methods}>
             <Form onSubmit={(e) => {
                  e.preventDefault(); // Блокируем стандартную отправку браузера при Enter
                  handleSubmit(onSubmit)(e);
                }}>
              <Row>
            <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select 
                          options={types} 
                          label="Тип товару"
                          placeholder="Пошук типу..."
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
                          options={seasonData} 
                          label="Сезон"
                          placeholder="Пошук сезону..."
                          value={field.value} 
                          isInput={true}
                          onChange={field.onChange} 
                          tabIndex={2}
                          isMulti
                          lang="ru"
                        />
                      )}
                    />

                 <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select 
                          options={genders} 
                          label="Стать"
                          placeholder="Пошук варіантів..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={5}
                          isMulti
                        />
                      )}
                    />

                  <Controller
                      control={control}
                      name="view"
                      render={({ field }) => (
                        <Select 
                          options={views} 
                          label="Вигляд товару"
                          placeholder="Пошук із списку..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={10}
                        />
                      )}
                    />   
          

                    </Row>
                    <Row>
                

                      <Controller
                        control={control}
                        name="vendor"
                        render={({ field }) => (
                          <Select 
                            options={vendors} 
                            label="Марка"
                            placeholder="Пошук із списку марок..."
                            isInput={true}
                            value={field.value} 
                            onChange={field.onChange}
                            tabIndex={6}
                            isMulti
                          />
                        )}
                      />
                    
                  <Controller
                      control={control}
                      name="color"
                      render={({ field }) => (
                        <Select 
                          options={colors} 
                          label="Колір"
                          placeholder="Пошук із списку кольорів..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={7}
                          isMulti
                        />
                      )}
                    />

                                   <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <Select 
                          options={countries} 
                          label="Виробник"
                          placeholder="Пошук із списку..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={8}
                          isMulti
                        />
                      )}
                    />
          
          
                  <Controller
                      control={control}
                      name="material"
                      render={({ field }) => (
                        <Select 
                          options={materialData} 
                          label="Матеріал для фільтру"
                          placeholder="Пошук із списку..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={9}
                        />
                      )}
                    />
                      
          </Row>
          <Row>

            
                    <Controller
                      control={control}
                      name="year"
                      render={({ field }) => (
                        <Select 
                          options={years} 
                          label="Рік-сезон"
                          placeholder="Пошук періоду..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={3}
                        />
                      )}
                    />

                   <Controller
                      control={control}
                      name="yearMinus"
                      render={({ field }) => (
                        <Select 
                          options={years} 
                          label="Рік-сезон перыод з обраного і старше"
                          placeholder="Пошук періоду з обраного і старше..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={4}
                        />
                      )}
                    />

                  <Controller
                      control={control}
                      name="yearPlus"
                      render={({ field }) => (
                        <Select 
                          options={years} 
                          label="Рік-сезон перыод з обраного і новіше"
                          placeholder="Пошук періоду з обраного і новіше..."
                          isInput={true}
                          value={field.value} 
                          onChange={field.onChange}
                          tabIndex={4}
                        />
                      )}
                    />
   
                </Row>
                 <CheckButton type="submit">
                  Подивитись результат
                </CheckButton>
             </Form>
          </FormProvider>
          <ListRevalue>
              {list && list.map(item => <CatalogCard item={item} />)}
          </ListRevalue>
          <ButtonsConatainer>
            <CheckButton onClick={() => list?.length > 0 ? show({ items: list}) : toast.error('Додайте вибірку товарів')}>Відкрити каталог</CheckButton>
          </ButtonsConatainer>
      </section>
    )
}

export default CatalogPage