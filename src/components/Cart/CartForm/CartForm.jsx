import { Input } from "@/components/ui";
import { useUserSession } from "@/fetchActions/user/useUser";
import { Controller, useFormContext } from "react-hook-form";

const formatPhone = (value) => {
  const digits = String(value ?? "")
    .replace(/\D/g, "")
    .replace(/^(?:038|38)/, "")
    .slice(0, 10);

  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)]
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
        rules={{ required: true }}
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
