'use client'
import CartList from "./CartList";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";
import { useState } from "react";
import DeliveryCart from "./DeliveryCart";
import { useQueryClient } from "@tanstack/react-query";
import { useUserSession } from "@/fetchActions/user/useUser";

const CartNew = ({ products,  total }) => {
  const [isDeliveryDataShown, setIsDeliveryDataShown] = useState(false);
  const queryClient = useQueryClient()
  const { data: user } = useUserSession();

  const changeOrderStatus = () => {
    products.map((order) => {
      useChangeOrderStatus({
        order,
        status: "in progress",
        orderId: null,
        deliveryData: null,
      });
    });
     queryClient.invalidateQueries({
       queryKey: ['cart', user?._id ?? user?.id ?? '' ],
      })
  };

  const openDelivery = () => {
    setIsDeliveryDataShown(true);
  };

  return (
    <div>
      <CartList status="new" products={products} total={total}/>
      {isDeliveryDataShown ? (
        <DeliveryCart onSuccess={() => changeOrderStatus()} />
      ) : (
        <button onClick={openDelivery}>Продовжити оформлення замовлення</button>
      )}
    </div>
  );
};
export default CartNew;
