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
  const { items, isLoading, clearCart, setIsSuccess, setReviewData } = useCartStore();

  const { mutate: updateUser, isLoading: isUpdatingUser, isError: isErrorUpdating } = useUpdateUser();
  const { mutateAsync: confirmOrder, isPending, isError: isErrorConfirmingOrder } = useAddNewOrder();

  const handleUpdate = (orderData) => {
    if (userId){
        updateUser({ id: userId, user: orderData });
    }
  };

  const handleOrder = async (deliveryData) => {
  const orderData = {
    items,
    delivery: deliveryData,
    userId
  };

  try {
    const res = await confirmOrder(orderData);

  const getDate = () => {
    const date = new Date();
    date.setDate(date.getDate());
    return date
      .toISOString()
      .split("T")[0];
  }

    setIsSuccess(true);
    setReviewData({
      orderId: res?.order?._id,
      email: res?.order?.delivery?.email,
      date: getDate()
    });

    clearCart();

  } catch (error) {
    console.log(error);
  }
};


  // const handleOrder = (deliveryData) => {
  //   const orderData = {
  //       items,
  //       delivery: deliveryData,
  //       userId
  //     }
  //   const res = confirmOrder(orderData)
  //   console.log(res)
  //   setIsSuccess(true)
  //   setReviewData(orderData)
  //   clearCart()
  // };

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

const onSubmit = async (e) => { // Добавляем async, если handleOrder отправляет запрос на сервер
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
  if (!isFullInfo.result && isFullInfo.text) {
    toast.error(isFullInfo.text);
  } else {
    handleUpdate(orderData);
    
    // Предположим, handleOrder отправляет данные на бэкенд и возвращает созданный заказ
    const orderResult = await handleOrder(orderData); 
    const orderId = orderResult?.id || `order_${Date.now()}`; // Запасной вариант для transaction_id

    if (typeof window !== "undefined" && window.gtag) {
      // Считаем общую сумму, принудительно приводя к числу
      const totalValue = items.reduce((sum, item) => {
        const price = Number(item.salePrice) || 0;
        const qty = Number(item.quantity) || 1;
        return sum + (price * qty);
      }, 0);

      window.gtag('event', 'conversion', {
        send_to: 'AW-18067191476/3Kr-CN2_h6AcELTtjadD',
        value: totalValue,
        currency: 'UAH',
        transaction_id: orderId, // ОБЯЗАТЕЛЬНО для ecommerce-конверсий
        items: items.map(item => ({
          item_id: String(item.code),   // ИСПРАВЛЕНО: item_id вместо id
          item_name: item.name,         // ИСПРАВЛЕНО: item_name вместо name
          quantity: Number(item.quantity) || 1,
          price: Number(item.salePrice) || 0
        }))
      });
    }
  }
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
