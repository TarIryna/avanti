import { FormProvider, useForm } from "react-hook-form";
import { Input, Button } from "@/components/ui";
import * as S from "./styles";
import { useEffect } from "react";

const CartForm = ({ register }) => {
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
        onBlur={(e) => onBlurEmail(e)}
      />
      <Input
        type="text"
        placeholder="Ім'я"
        {...register("name", { required: true })}
        tabIndex={2}
        enterKeyHint="next"
      />
      <Input
        type="text"
        placeholder="Прізвище"
        {...register("surname", { required: true })}
        tabIndex={3}
        enterKeyHint="next"
      />
      <Input
        type="tel"
        placeholder="Телефон"
        {...register("phone", { required: true })}
        tabIndex={6}
        enterKeyHint="next"
      />
      <Input
        type="text"
        placeholder="Місто"
        {...register("city", { required: true })}
        tabIndex={7}
        enterKeyHint="next"
      />
      <Input
        type="text"
        placeholder="Адреса доставки"
        {...register("adress", { required: true })}
        tabIndex={8}
        enterKeyHint="done"
      />
    </>
  );
};

export default CartForm;
