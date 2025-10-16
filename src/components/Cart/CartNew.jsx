import CartList from "./CartList";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";
import { useState } from "react";
import DeliveryCart from "./DeliveryCart";

const CartNew = ({ products, isFetched }) => {
  const [isDeliveryDataShown, setIsDeliveryDataShown] = useState(false);

  const changeOrderStatus = () => {
    products.map((order) => {
      useChangeOrderStatus({
        order,
        status: "in progress",
        orderId: null,
        deliveryData: null,
      });
    });
  };

  const openDelivery = () => {
    setIsDeliveryDataShown(true);
  };

  return (
    <div>
      <CartList status="new" products={products} />
      {isDeliveryDataShown ? (
        <DeliveryCart onSuccess={() => changeOrderStatus()} />
      ) : (
        <button onClick={openDelivery}>Продавжити оформлення замовлення</button>
      )}
    </div>
  );
};
export default CartNew;
