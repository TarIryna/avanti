import { useMemo } from "react";
import CartItem from "./CartItem/CartItem";
import { CartListProducts } from "./styles";

const CartList = ({ products, status, total }) => {

  return (
    <CartListProducts>
      {products.map((item, index) => (
        <CartItem data={item} key={index} status={status} />
      ))}
      <div>Всьго за замовлення: {total} грн.</div>
    </CartListProducts>
  );
};
export default CartList;
