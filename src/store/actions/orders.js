import { wrapDispatchAction } from ".";
import { ordersSlice } from "@/store/slice/orders";
const {
  changeAllOrders,
  changeIsLoading,
  changeToInitial,
  changeisError,
  changeuserId,
} = ordersSlice.actions;

export const changeOrderAllOrdersAction = wrapDispatchAction(changeAllOrders);
export const changeOrderIsLoadingAction = wrapDispatchAction(changeIsLoading);
export const changeOrderToInitialAction = wrapDispatchAction(changeToInitial);
export const changeOrderisErrorAction = wrapDispatchAction(changeisError);
export const changeOrdersUserAction = wrapDispatchAction(changeuserId);
