import { useFetchAllOrders } from "./useFetchAllOrders";

export const useChangeOrderStatus = async ({
  order,
  status,
  orderId,
  delivery,
}) => {
  const params = {
    date: new Date(),
    status,
    id: order._id,
    orderId,
    delivery,
  };
  try {
    console.log(params);
    const response = await fetch("/api/order/new", {
      method: "PATCH",
      body: JSON.stringify(params),
    });

    if (response.ok) {
      console.log("updated");
      useFetchAllOrders(order.creator._id);
    }
  } catch (error) {
    console.log(error);
  }
};
