import CartList from "./CartList";
import { useNewOrders } from "@/store/selectors/orders";
import { useChangeOrderStatus } from "@/helpers/useChangeOrderStatus";
import { useEffect } from "react";
import { getUniqueArray } from "./helpers/getUniqueArray";

const CartNew = ({ products, isFetched, localStorageData }) => {
  const allNewOrders = useMemo(() => {
    return getUniqueArray(products, localStorageData);
  }, [products, localStorageData]);

  const getProductsToAddToNewOrders = (array1, array2) => {
    const codesInArray2 = new Set(array2.map((item) => item.code));
    return array1.filter((item) => !codesInArray2.has(item.code));
  };

  const addToUserCart = async (item) => {
    try {
      const response = await fetch("/api/order/new", {
        method: "POST",
        body: JSON.stringify({
          productId: item?.code,
          userId: user?._id ?? user?.id,
          size: item?.size,
          quantity: 1,
          status: "new",
          image: item?.image,
          price: item?.price2 ?? item?.price,
        }),
      });

      if (response.ok) {
        toast.success("Товар додано у кошик!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(products);
    if (isFetched) {
      const orderToAdd = getProductsToAddToNewOrders(
        localStorageData,
        progressOrders
      );
      orderToAdd.map((item) => addToUserCart(item));
    }
  }, [products]);

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

  return (
    <div>
      <CartList status="new" products={allNewOrders} />
      <button onClick={changeOrderStatus}>
        Продавжити оформлення замовлення
      </button>
    </div>
  );
};
export default CartNew;
