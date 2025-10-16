import { useEffect, useState } from "react";
import { useUser } from "@/store/selectors";
import CartForm from "./CartForm/CartForm";
import { ViberInput, ViberWrapper } from "./styles";

const CartClientInfo = ({ register }) => {
  const { user, isAuth } = useUser();
  const userId = user?.id;
  const userName = user?.name;
  const userSurname = user?.surname;
  const userPhone = user?.phone;
  const userViber = user?.isViber;
  const [name, setName] = useState(userName ?? "");
  const [surname, setSurname] = useState(userSurname ?? "");
  const [phone, setPhone] = useState(userPhone ?? "");
  const [isViber, setIsViber] = useState(userViber ?? false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeViber = (e) => {
    setIsViber(e.target.value);
  };

  const allLinesComplete = name && surname && phone;

  return (
    <div>
      <h3>Заповніть особисті дані:</h3>
      {!isAuth && <CartForm register={register} />}

      <ViberWrapper>
        <label>
          Якщо хочете, щоб менеджер зв'язався по вайберу, зробіть відмітку
        </label>
        <ViberInput
          onChange={onChangeViber}
          type="checkbox"
          placeholder="viber"
          {...register("viber")}
          tabIndex={1}
          enterKeyHint="next"
          defaultValue={isViber}
          onBlur={(e) => onBlurEmail(e)}
        />
      </ViberWrapper>
    </div>
  );
};
export default CartClientInfo;
