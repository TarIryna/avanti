'use client'
import CartList from "./CartList";
import { useState } from "react";
import DeliveryCart from "./DeliveryCart";

const CartNew = ({ products,  total }) => {
  const [isDeliveryDataShown, setIsDeliveryDataShown] = useState(false);
  const openDelivery = () => {
    setIsDeliveryDataShown(true);
  };

  return (
    <div>
      <CartList status="new" products={products} total={total}/>
      {isDeliveryDataShown ? (
        <DeliveryCart />
      ) : (
        <button onClick={openDelivery}>Продовжити оформлення замовлення</button>
      )}
    </div>
  );
};
export default CartNew;
