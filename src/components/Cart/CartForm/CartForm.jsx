import { Input } from "@/components/ui";
import InputMask from "react-input-mask";
import { useUserSession } from "@/fetchActions/user/useUser";
import { Controller, useFormContext } from "react-hook-form";

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
        defaultValue={user?.phone ?? ""}
        render={({ field }) => (
          <InputMask
            {...field}
            mask="099-999-99-99"
            maskChar={null}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                type="tel"
                placeholder="050-555-55-55"
                tabIndex={4}
                enterKeyHint="next"
                label="Телефон"
                isBorder
              />
            )}
          </InputMask>
        )}
      />

      {/* <Input
        type="tel"
        placeholder="Телефон"
        {...register("phone", { required: true })}
        tabIndex={4}
        enterKeyHint="next"
        defaultValue={user?.phone ?? ''}
        label="Телефон"
        isBorder
        rules={{
          required: true,
          validate: (value) => value?.replace(/\D/g, "").length === 10
        }}

      /> */}
    </>
  );
};

export default CartForm;
