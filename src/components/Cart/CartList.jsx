import { useMemo } from "react";
import CartItem from "./CartItem/CartItem";

const CartList = ({ products, status }) => {
  const total = useMemo(() =>  !!products &&
    products?.reduce(
      (accumulator, item) =>
        accumulator + Number(item.price) * Number(item.quantity ?? 1),
      0
    ), [products])

  return (
    <div>
      {products.map((item, index) => (
        <CartItem data={item} key={index} status={status} />
      ))}
      <div>Всьго за замовлення: {total} грн.</div>
    </div>
  );
};
export default CartList;
