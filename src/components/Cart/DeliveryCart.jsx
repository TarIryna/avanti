import { useProgressOrders } from "@/store/selectors/orders";
import { changeOrderIsLoadingAction } from "@/store/actions/orders";
import { updateUserAction } from "@/store/actions/user";
import { useUserSession } from "@/fetchActions/user/useUser";
import { toast } from "react-hot-toast";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";
import { useUpdateUser } from "@/fetchActions/user/useUpdateUser";
import { FormProvider, useForm } from "react-hook-form";

import CartList from "./CartList";
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

const DeliveryCart = ({ onSuccess }) => {
  const [needUpdate, setNeedUpdate] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false)
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, register } = methods;
  const { show: showAuth } = useModal(MODALS.AUTHORIZATION);
  const { data: user, isLoadingUser, isError } = useUserSession();
  const isAuth = !!user;
  const userId = user?._id ?? user?.id
  const { items, isLoading, clearCart } = useCartStore();

  const isDeliveryChangeShown = !user?.cityDescription || ! user?.addressDescription || showDelivery

  const { mutate: updateUser, isLoading: isUpdatingUser, isError: isErrorUpdating } = useUpdateUser();
  const { mutate: confirmOrder, isPending, isError: isErrorConfirmingOrder } = useAddNewOrder();

  const handleUpdate = (orderData) => {
    if (userId){
      updateUser({ id: userId, orderData });
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
    const result =
      data.name?.length > 0 &&
      data.surname?.length > 0 &&
      data.city?.length > 0 &&
      data.address?.length > 0 &&
      data.phone?.length > 0
        ? true
        : false;
    return result;
  };

  const generateId = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const date = today.getDate().toString();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();
    const seconds = today.getSeconds().toString();
    return year + month + date + hours + minutes + seconds;
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
    if (!isFullInfo) toast.error("Не вся інформація заповнена");
    else {
      handleUpdate(orderData);
      toast.success("Очікуйте підтвердження замовлення!");
      handleOrder(orderData);
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
