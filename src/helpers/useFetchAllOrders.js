import {
  changeOrderIsLoadingAction,
  changeOrderAllOrdersAction,
} from "@/store/actions/orders";
import { setCartItems } from "@/store/slice/cart";

export const useFetchAllOrders = async (id, dispatch) => {
  changeOrderIsLoadingAction(true);
  const response = await fetch(`/api/users/${id}/orders/all`);
  const data = await response.json();

  if (data) {
    const newOrder = data.filter((item) => item.status === "new");
    const progress = data.filter((item) => item.status === "in progress");
    const success = data.filter((item) => item.status === "confirmed");
    const error = data.filter((item) => item.status === "error");
    changeOrderAllOrdersAction({ new: newOrder, progress, success, error });
    dispatch(setCartItems(newOrder));
  }
  changeOrderIsLoadingAction(false);
};
