import { useSelector } from "react-redux";

export const useAllOrders = () => useSelector((state) => state.orders.orders);
export const useNewOrders = () =>
  useSelector((state) => state.orders.orders.new);
export const useProgressOrders = () =>
  useSelector((state) => state.orders.orders.progress);
export const useSuccessOrders = () =>
  useSelector((state) => state.orders.orders.success);
export const useOrdersUser = () => useSelector((state) => state.orders.userId);
export const useOrderIsLoading = () =>
  useSelector((state) => state.orders.isLoading);
export const useOrderIsError = () =>
  useSelector((state) => state.orders.isError);
