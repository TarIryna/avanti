import { useUserSession } from "@/fetchActions/user/useUser";
import { toast } from "react-hot-toast";
import { useUpdateUser } from "@/fetchActions/user/useUpdateUser";
import { FormProvider, useForm } from "react-hook-form";

import CartClientInfo from "./CartClientInfo";
import { useState } from "react";
import * as S from "./styles";
import DeliveryForm from "./DeliveryForm";
import { useModal } from "@ebay/nice-modal-react";
import { LOGIN, MODALS } from "@/constants/constants";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useAddNewOrder } from "@/helpers/useAddNewOrder";
import { useCartStore } from "../GeneralProvider/context/CartProvider";


registerDynamicModal(
  MODALS.AUTHORIZATION,
  import("@/components/modals/AuthModal/AuthModal")
);

const DeliveryCart = () => {
  const [needUpdate, setNeedUpdate] = useState(false);
  const methods = useForm({ mode: "onSubmit" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { show: showAuth } = useModal(MODALS.AUTHORIZATION);
  const { data: user } = useUserSession();
  const isAuth = !!user;
  const userId = user?._id ?? user?.id
  const { items, isLoading, clearCart } = useCartStore();

  const { mutate: updateUser, isLoading: isUpdatingUser, isError: isErrorUpdating } = useUpdateUser();
  const { mutate: confirmOrder, isPending, isError: isErrorConfirmingOrder } = useAddNewOrder();

  const handleUpdate = (orderData) => {
    if (userId){
        updateUser({ id: userId, user: orderData });
    }
  };

  const handleOrder = (deliveryData) => {
    confirmOrder({
        items,
        delivery: deliveryData,
        userId
      })
    clearCart()
  };

  const checkInfo = (data) => {
    const isName = data.name?.length > 0 
    const isSurname = data.surname?.length > 0
    const isPhone = data.phone?.length > 0
    const isCity = data.city?.length > 0
    const isAddress = data.address?.length > 0
    const result =
      isName &&
      isSurname &&
      isCity &&
      isAddress  &&
      isPhone
        ? true
        : false;

    const text = result ? "" : `Не заповнені поля:\n ${isName ? "" : "* iм'я\n"}${isSurname ? "" : "* прізвище\n"}${isPhone ? "" : "* телефон\n"}${isCity ? "" : "* місто (необхідно обрати із списку)\n"}${isAddress ? "" : "* відділення пошти (необхідно обрати із списку)"}`
    return {result, text};
  };

  const onSubmit = (e) => {
    const name = e.name ?? user?.name;
    const surname = e.surname ?? user?.surname;
    const phone = e.phone ?? user?.phone;
    const isViber = e.viber ?? user?.viber;
    const cityDescription = e.cityDescription ?? user?.cityDescription;
    const city = e.city ?? user?.city
    const addressDescription = e.addressDescription ?? user?.addressDescription;
    const address = e.address ?? user?.address
    const email = e.email ?? user?.email

    const orderData = {
      name,
      surname,
      phone,
      isViber,
      city,
      email,
      address,
      cityDescription,
      addressDescription
    };
    const isFullInfo = checkInfo(orderData);
    if (!isFullInfo.result && isFullInfo.text) toast.error(isFullInfo.text);
    else {
      handleUpdate(orderData);
      toast.success("Очікуйте підтвердження замовлення!");
      handleOrder(orderData);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18067191476/3Kr-CN2_h6AcELTtjadD',
            value: items.reduce((sum, item) => sum + item.salePrice * item.quantity, 0),
            currency: 'UAH',
            items: items.map(item => ({
              id: item.code,
              name: item.name,
              quantity: item.quantity,
              price: item.salePrice
            }))
          });
        }
    }
    // else handleOrder("new");
  };

  return (
    <div>
      {!isAuth && <S.RegistrationButton onClick={() => showAuth({ mode: LOGIN })}>Авторизуйтесь або заповніть дані нижче</S.RegistrationButton>}
      <FormProvider {...methods}>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <CartClientInfo needUpdate={needUpdate} register={register} />
          <DeliveryForm register={register} />
          <button type="submit">Відправити замовлення</button>
        </S.Form>
      </FormProvider>
    </div>
  );
};
export default DeliveryCart;
