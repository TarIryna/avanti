import { wrapDispatchAction } from ".";
import { productSlice } from "@/store/slice/product";
const { changeProductId, changeIsLoading, changeProduct } =
  productSlice.actions;

export const changeProductIdAction = wrapDispatchAction(changeProductId);
export const changeProductAction = wrapDispatchAction(changeProduct);
export const changeIsLoadingAction = wrapDispatchAction(changeIsLoading);
