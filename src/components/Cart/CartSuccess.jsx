import { useSuccessOrders } from "@/store/selectors/orders";
import CartList from "./CartList";

const CartSuccess = () => {
  const products = useSuccessOrders();

  return (
    <div>
      <h3>
        Дякуємо за замовлення!!! Очікуйте дзвінка або смс у вайдері від
        менеджера для підтвердження
      </h3>
      <CartList status="confirmed" products={products} />
    </div>
  );
};
export default CartSuccess;
