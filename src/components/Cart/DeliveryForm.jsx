import { Controller, useFormContext } from "react-hook-form";
import SearchSelect from "../ui/SearchSelect/SearchSelect";
import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";

const DeliveryForm = () => {
  const [cityRef, setCityRef] = useState("");
  const { control, setValue } = useFormContext();
  const { data: user } = useUserSession();

  return (
    <>
      <h3>Оберіть місто:</h3>
      <Controller
        name="city"
        control={control}
        defaultValue={user?.city ?? ""}
        render={({ field }) => (
          <SearchSelect
            value={field.value}
            onChange={(val) => {
              field.onChange(val.value); // сохраняем Ref
              setValue("cityDescription", val.label); // сохраняем название
              setCityRef(val.value); // сохраняем Ref для адресов
            }}
            fetchOptions={async (query) => {
              const res = await fetch(`/api/shipping/novaposhta/cities?query=${query}`);
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
          <h3 className="mt-4">Оберіть відділення / поштамат:</h3>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SearchSelect
                value={field.value}
                onChange={(val) => {
                  field.onChange(val.value);
                  setValue("addressDescription", val.label);
                }}
                fetchOptions={async () => {
                  const res = await fetch(`/api/shipping/novaposhta/adress?query=${cityRef}`);
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

