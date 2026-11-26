import { Input } from "@/components/ui";
import { useUserSession } from "@/fetchActions/user/useUser";
import { Controller, useFormContext } from "react-hook-form";

const formatPhone = (value) => {
  const input = String(value ?? "").trim();
  const digits = input.replace(/^\+38/, "").replace(/\D/g, "");
  const localDigits = !input.startsWith("+38") && /^380\d{9}$/.test(digits)
    ? digits.slice(2)
    : digits;

  return [localDigits.slice(0, 3), localDigits.slice(3, 6), localDigits.slice(6, 8), localDigits.slice(8)]
    .filter(Boolean)
    .join("-");
};

const CartForm = ({ register }) => {
  const { data: user } = useUserSession()
  const { control } = useFormContext();

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
        disabled={!!user?.email}
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
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Вкажіть номер телефону",
          validate: (value) => /^0\d{9}$/.test(value.replace(/-/g, ""))
            || "Номер телефону має містити 10 цифр і починатися з 0",
        }}
        defaultValue={formatPhone(user?.phone)}
        render={({ field }) => (
              <Input
                name={field.name}
                value={field.value}
                onValueChange={(event) => {
                  const phone = formatPhone(event.target.value);
                  event.target.value = phone;
                  field.onChange(phone);
                }}
                onBlurHandler={field.onBlur}
                type="tel"
                prefix="+38"
                placeholder="050-555-55-55"
                tabIndex={4}
                enterKeyHint="next"
                label="Телефон"
                isBorder
              />
        )}
      />
    </>
  );
};

export default CartForm;
