import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { useAuthModalContext } from "../../contexts/authContext";
import { signIn } from "next-auth/react";
import * as S from "./styles";
import { toast } from "react-hot-toast";
import { useModal } from "@ebay/nice-modal-react";
import { MODALS } from "@/constants/constants";

const RegistrationForm = () => {
  const { googleRegMethod, setGoogleRegMethod, res } =
    useAuthModalContext() || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const recaptchaRef = useRef < ReCAPTCHA > null;
  const methods = useForm({ mode: "onSubmit" });
  const { hide } = useModal(MODALS.AUTHORIZATION);

  const { handleSubmit, register } = methods;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Ошибка при регистрации");
        setIsProcessing(false);
        return;
      }

      // После успешной регистрации выполнить вход
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        alert("Ошибка входа после регистрации: " + signInResult.error);
      } else {
        toast.success("Успішно!");
        hide();
      }
    } catch (error) {
      alert("Ошибка сети: " + error.message);
    }
    setIsProcessing(false);
  };

  return (
    <FormProvider {...methods}>
      <S.Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {!googleRegMethod && (
          <Input
            type="email"
            placeholder="e-mail"
            {...register("email", { required: true })}
            tabIndex={1}
            enterKeyHint="next"
          />
        )}
        <Input
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
          tabIndex={2}
          enterKeyHint="next"
        />
        {!googleRegMethod && (
          <Input
            type="password"
            placeholder="пароль"
            {...register("password", { required: true })}
            tabIndex={3}
            enterKeyHint="next"
          />
        )}
        <S.Row>
          <Input
            type="text"
            placeholder="Ім'я"
            {...register("name", { required: true })}
            tabIndex={4}
            enterKeyHint="next"
          />
          <Input
            type="text"
            placeholder="Прізвище"
            {...register("surname", { required: true })}
            tabIndex={5}
            enterKeyHint="next"
          />
        </S.Row>
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
          {...register("address", { required: true })}
          tabIndex={8}
          enterKeyHint="next"
        />
        {!!process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA}
            size="invisible"
            theme="dark"
            ref={recaptchaRef}
          />
        )}
        <Button>Зареєструватись</Button>
      </S.Form>
    </FormProvider>
  );
};

export default RegistrationForm;
