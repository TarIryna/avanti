import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input/Input";
import * as S from "./styles";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useModal } from "@ebay/nice-modal-react/lib/esm";
import { useFormFieldNavigation } from "@/hooks";
import { MODALS } from "@/constants/constants";
import { toast } from "react-hot-toast";

registerDynamicModal(
  MODALS.FORGOT_PASSWORD,
  import("../../ForgotPassword/ForgotPasswordModal")
);

const LoginForm = () => {
  const { hide } = useModal(MODALS.AUTHORIZATION);

  const methods = useForm({ mode: "onSubmit" });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { show: showForgotPassword } = useModal(MODALS.FORGOT_PASSWORD);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (e) => {
    const { email, password } = e;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Помилка: " + result.error);
    } else {
      toast.success("Успішно!");
    }

    hide();
  };

  const { formInputs, handleKeyDown } = useFormFieldNavigation(
    2,
    handleSubmit(onSubmit)
  );

  return (
    <FormProvider {...methods}>
      <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          placeholder="e-mail"
          {...register("email", { required: true })}
          tabIndex={1}
          enterKeyHint="next"
        />
        <Input
          placeholder="пароль"
          {...register("password", { required: true })}
          tabIndex={2}
          enterKeyHint="done"
          type="password"
        />
        <S.ForgotPassButton onClick={() => showForgotPassword()} type="button">
          Забули пароль?
        </S.ForgotPassButton>
        <S.SubmitButton type="submit">OK</S.SubmitButton>
      </S.Form>
    </FormProvider>
  );
};
export default LoginForm;
