import { Controller, useFormContext } from "react-hook-form";
import DeliverySelect from "./DeliverySelect/DeliverySelect";
import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import * as S from './styles'

const DeliveryForm = () => {
  const { control, setValue, watch } = useFormContext();
  const { data: user, isLoading } = useUserSession();

  const [cityRef, setCityRef] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState({label: user?.addressDescription ?? '', value: user?.address ?? ''})

  useEffect(() => {
    if (!user) return;

    // 🔹 подставляем значения из БД
    setValue("city", user.city || "");
    setValue("cityDescription", user.cityDescription || "");
    setValue("address", user.address || "");
    setValue("addressDescription", user.addressDescription || "");
  }, [user, setValue]);

  useEffect(() => {
    if (!watch('city')){
      setDefaultAddress({value: '', label: ''})
    }
  }, [watch('city')])

  if (isLoading) return null;

  return (
    <>
    <S.Text><strong>Оплата </strong>здійснюється після дзвінка менеджера</S.Text>
    <S.Text><strong>Доставка </strong>здійснюється Новою поштою! Оберіть, будь ласка, відділення і місто:</S.Text>
      <Controller
        name="cityDescription"
        control={control}
        render={({ field }) => (
          <DeliverySelect
            value={field.value}
            title="Місто"
            onChange={(val) => {
              field.onChange(val.label);
              setValue("city", val.value);
              setCityRef(val.value);

              // очищаем адрес при смене города
              setValue("address", "");
              setValue("addressDescription", "");
            }}
            defaultValue={user?.city && user.cityDescription
                  ? {
                      value: user.city,
                      label: user.cityDescription,
                    }
                  : null}
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

      {watch('city') && (
        <>
          <Controller
            name="addressDescription"
            control={control}
            render={({ field }) => (
              <DeliverySelect
                value={field.value}
                title="Адреса доставки"
                onChange={(val) => {
                  field.onChange(val.label);
                  setValue("address", val.value);
                }}
                defaultValue={user?.address && user.cityDescription === watch('cityDescription')
                  ? {
                      value: user.address,
                      label: user.addressDescription,
                    }
                  : null}
                fetchOptions={async () => {
                  const res = await fetch(
                    `/api/shipping/novaposhta/adress?query=${cityRef}`
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
        </>
      )}
    </>
  );
};

export default DeliveryForm;