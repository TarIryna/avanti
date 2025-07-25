import { wrapDispatchAction } from ".";
import { newOrderSlice } from "@/store/slice/neworder";
const {
  changeIsLoading,
  changeToInitial,
  changeDeliveryInfo,
  changeUserInfo,
  changeOrders,
} = newOrderSlice.actions;

export const changeToInitialAction = wrapDispatchAction(changeToInitial);
export const changeOrderIsLoadingAction = wrapDispatchAction(changeIsLoading);
export const changeDeliveryInfoAction = wrapDispatchAction(changeDeliveryInfo);
export const changeUserInfoAction = wrapDispatchAction(changeUserInfo);
export const changeNewOrdersAction = wrapDispatchAction(changeOrders);
