import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { useAuthModalContext } from "../../contexts/authContext";
import { signIn } from "next-auth/react";
import * as S from "./styles";
import { toast } from "react-hot-toast";
import { useModal } from "@ebay/nice-modal-react";
import DeliverySelect from "@/components/Cart/DeliverySelect/DeliverySelect";
import { MODALS } from "@/constants/constants";

const RegistrationForm = () => {
  const { googleRegMethod, setGoogleRegMethod, res } =
    useAuthModalContext() || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const recaptchaRef = useRef < ReCAPTCHA > null;
  const { hide } = useModal(MODALS.AUTHORIZATION);

const methods = useForm({
  defaultValues: {
    city: "",
    cityDescription: "",

    address: "",
    addressDescription: "",
  },
});


 const {
  handleSubmit,
  register,
  control,
  setValue,
  watch,
} = methods;

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
            placeholder="example@mail.com"
            {...register("email", { required: true })}
            tabIndex={1}
            enterKeyHint="next"
            isBorder
            label='E-mail'
          />
        )}
        <Input
          type="text"
          placeholder="example_username"
          {...register("username", { required: true })}
          tabIndex={2}
          enterKeyHint="next"
          isBorder
          label='Username'
        />
        {!googleRegMethod && (
          <Input
            type="password"
            placeholder="123456"
            {...register("password", { required: true })}
            tabIndex={3}
            enterKeyHint="next"
            isBorder
            label='Пароль'
          />
        )}
        <S.Row>
          <Input
            type="text"
            placeholder="Ім'я"
            {...register("name", { required: true })}
            tabIndex={4}
            enterKeyHint="next"
            isBorder
            label="Ім'я"
          />
          <Input
            type="text"
            placeholder="Прізвище"
            {...register("surname", { required: true })}
            tabIndex={5}
            enterKeyHint="next"
            isBorder
            label="Прізвище"
          />
        </S.Row>
        <Input
          type="tel"
          placeholder="Телефон"
          {...register("phone", { required: true })}
          tabIndex={6}
          enterKeyHint="next"
          isBorder
          label="Телефон"
        />
       <Controller
          name="city"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DeliverySelect
              title="Місто"
              value={field.value}
              onChange={(option) => {
                field.onChange(option.label);     // то, что хранится в RHF
                setValue("city", option.value);
                setValue("cityDescription", option.label) // если нужен Ref
                setValue("address", "");           // сброс адреса
              }}
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

       <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DeliverySelect
              title="Адреса доставки"
              value={field.value}
              onChange={(option) => {
                setValue("address", option.value);
                setValue("addressDescription", option.label)
              }}
              fetchOptions={async () => {
                const res = await fetch(
                  `/api/shipping/novaposhta/adress?query=${methods.watch("city")}`
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
