import { Controller, useFormContext } from "react-hook-form";
import SearchSelect from "../ui/SearchSelect/SearchSelect";
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

    setCityRef(user.city || null);
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
          <SearchSelect
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
              defaultValue={user?.city
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

      {cityRef && (
        <>
          <Controller
            name="addressDescription"
            control={control}
            render={({ field }) => (
              <SearchSelect
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



// import { Controller, useFormContext } from "react-hook-form";
// import SearchSelect from "../ui/SearchSelect/SearchSelect";
// import { useEffect, useState } from "react";
// import { useUserSession } from "@/fetchActions/user/useUser";

// const DeliveryForm = () => {
//   const [cityRef, setCityRef] = useState("");
//   const { control, setValue } = useFormContext();
//   const { data: user } = useUserSession();

//   return (
//     <>
//       <h3>Оберіть місто:</h3>
//       <Controller
//         name="city"
//         control={control}
//         defaultValue={user?.city ?? ""}
//         render={({ field }) => (
//           <SearchSelect
//             value={field.value}
//             onChange={(val) => {
//               field.onChange(val.value); // сохраняем Ref
//               setValue("cityDescription", val.label); // сохраняем название
//               setCityRef(val.value); // сохраняем Ref для адресов
//             }}
//             fetchOptions={async (query) => {
//               const res = await fetch(`/api/shipping/novaposhta/cities?query=${query}`);
//               const json = await res.json();
//               return json.data.map((c) => ({
//                 value: c.Ref,
//                 label: c.Description,
//               }));
//             }}
//           />
//         )}
//       />

//       {cityRef && (
//         <>
//           <h3 className="mt-4">Оберіть відділення / поштамат:</h3>
//           <Controller
//             name="address"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <SearchSelect
//                 value={field.value}
//                 onChange={(val) => {
//                   field.onChange(val.value);
//                   setValue("addressDescription", val.label);
//                 }}
//                 fetchOptions={async () => {
//                   const res = await fetch(`/api/shipping/novaposhta/adress?query=${cityRef}`);
//                   const json = await res.json();
//                   return json.data.map((a) => ({
//                     value: a.Ref,
//                     label: a.Description,
//                   }));
//                 }}
//               />
//             )}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default DeliveryForm;

