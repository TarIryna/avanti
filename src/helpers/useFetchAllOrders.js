import {
  changeOrderIsLoadingAction,
  changeOrderAllOrdersAction,
} from "@/store/actions/orders";

export const useFetchAllOrders = async (id) => {
  changeOrderIsLoadingAction(true);
  const response = await fetch(`/api/users/${id}/orders/all`);
  const data = await response.json();
  console.log(data);

  if (data) {
    const newOrder = data.filter((item) => item.status === "new");
    const progress = data.filter((item) => item.status === "in progress");
    const success = data.filter((item) => item.status === "confirmed");
    const error = data.filter((item) => item.status === "error");
    changeOrderAllOrdersAction({ new: newOrder, progress, success, error });
  }
  changeOrderIsLoadingAction(false);
};
