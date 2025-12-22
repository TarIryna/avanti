import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import CartForm from "./CartForm/CartForm";
import { ViberInput, ViberWrapper, List } from "./styles";

const CartClientInfo = ({ register }) => {
  const { data: user, isLoading, isError } = useUserSession();
  const userId = user?.id;
  const userName = user?.name;
  const userSurname = user?.surname;
  const userPhone = user?.phone;
  // const userViber = user?.isViber;
  const [name, setName] = useState(userName ?? "");
  const [surname, setSurname] = useState(userSurname ?? "");
  const [phone, setPhone] = useState(userPhone ?? "");
  // const [isViber, setIsViber] = useState(userViber ?? false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  // const onChangeViber = (e) => {
  //   setIsViber(e.target.value);
  // };

  const allLinesComplete = name && surname && phone;

  return (
    <List>
      <h3>Заповніть особисті дані:</h3>
      <CartForm register={register} />

      {/* <ViberWrapper>
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
      </ViberWrapper> */}
    </List>
  );
};
export default CartClientInfo;
