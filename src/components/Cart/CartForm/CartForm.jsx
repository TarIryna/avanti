import { FormProvider, useForm } from "react-hook-form";
import { Input, Button } from "@/components/ui";
import * as S from "./styles";
import { useEffect } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";

const CartForm = ({ register }) => {
  const { data: user } = useUserSession()
  const onBlurEmail = (e) => {
    console.log(e);
  };

  return (
    <>
      <Input
        type="email"
        placeholder="e-mail"
        {...register("email", { required: true })}
        tabIndex={1}
        enterKeyHint="next"
        defaultValue={user?.email ?? ''}
        onBlur={(e) => onBlurEmail(e)}
        label='e-mail'
        isBorder
      />
      <Input
        type="text"
        placeholder="Ім'я"
        {...register("name", { required: true })}
        tabIndex={2}
        enterKeyHint="next"
        defaultValue={user?.name ?? ''}
        label="Ім'я"
        isBorder
      />
      <Input
        type="text"
        placeholder="Прізвище"
        {...register("surname", { required: true })}
        tabIndex={3}
        enterKeyHint="next"
        defaultValue={user?.surname ?? ''}
        label="Прізвище"
        isBorder
      />
      <Input
        type="tel"
        placeholder="Телефон"
        {...register("phone", { required: true })}
        tabIndex={6}
        enterKeyHint="next"
        defaultValue={user?.phone ?? ''}
        label="Телефон"
        isBorder
      />
      <Input
        type="text"
        placeholder="Місто"
        {...register("city", { required: true })}
        defaultValue={user?.cityDescription ?? ''}
        tabIndex={7}
        enterKeyHint="next"
        isBorder
      />
      <Input
        type="text"
        placeholder="Адреса доставки"
        {...register("address", { required: true })}
        tabIndex={8}
        defaultValue={user?.addressDescription ?? ''}
        enterKeyHint="done"
        isBorder
      />
    </>
  );
};

export default CartForm;
