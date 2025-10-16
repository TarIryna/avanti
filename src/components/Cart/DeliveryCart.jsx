import { useProgressOrders } from "@/store/selectors/orders";
import { useUser } from "@/store/selectors";
import { changeOrderIsLoadingAction } from "@/store/actions/orders";
import { changeUserDeliveryDataAction } from "@/store/actions/user";
import { toast } from "react-hot-toast";
import { useFetchAllOrders } from "@/helpers/useFetchAllOrders";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";
import { FormProvider, useForm } from "react-hook-form";

import CartList from "./CartList";
import CartClientInfo from "./CartClientInfo";
import { useState } from "react";
import * as S from "./styles";
import DeliveryForm from "./DeliveryForm";

const DeliveryCart = ({ onSuccess }) => {
  const [needUpdate, setNeedUpdate] = useState(false);
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, register } = methods;
  const { isAuth, user } = useUser();

  const handleOrder = (deliveryData) => {
    const orderId = generateId();
    const newStatus = "confirmed";
    changeOrderIsLoadingAction(true);
    products.map((item) =>
      useChangeOrderStatus({
        order: item,
        status: newStatus,
        orderId,
        delivery: deliveryData,
      })
    );
    changeOrderIsLoadingAction(false);
    useFetchAllOrders(userId);
  };

  const updateUser = async (orderData, id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(orderData),
      });

      if (response) {
        const data = await response?.json();
        changeUserDeliveryDataAction(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkInfo = (data) => {
    const result =
      data.name?.length > 0 &&
      data.surname?.length > 0 &&
      data.city?.length > 0 &&
      data.adress?.length > 0 &&
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
    console.log(e);
    // setNeedUpdate(true);
    // e.preventDefault();
    // const name = user?.name ?? e.target.elements.name.value;
    // const surname = user.surname ?? e.target.elements.surname.value;
    // const phone = user?.phone ?? e.target.elements.phone.value;
    // const isViber = e.target.elements.viber.checked;
    // const city = e.target.elements.city.value;
    // const adress = e.target.elements.adress.value;

    // const orderData = {
    //   name,
    //   surname,
    //   phone,
    //   isViber,
    //   city,
    //   adress,
    // };
    // console.log(orderData);
    // const isFullInfo = checkInfo(orderData);
    // if (!isFullInfo) toast.error("Не вся інформація заповнена");
    // else {
    //   updateUser(orderData, userId);
    //   toast.info("Очікуйте підтвердження замовлення!");
    //   handleOrder(orderData);
    // }
    // // else handleOrder("new");
    // setNeedUpdate(false);
  };

  return (
    <div>
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
