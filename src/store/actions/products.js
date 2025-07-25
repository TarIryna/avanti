import { wrapDispatchAction } from ".";
import { productsSlice } from "@/store/slice/products";
const {
  changeGender,
  changePage,
  changePages,
  changeProducts,
  changeQauntity,
  changeQuery,
  changeSeason,
  changeToInitial,
  changeView,
  changeFilter,
  changeIsLoading,
} = productsSlice.actions;

export const changeGenderAction = wrapDispatchAction(changeGender);
export const changePageAction = wrapDispatchAction(changePage);
export const changePagesAction = wrapDispatchAction(changePages);
export const changeProductsAction = wrapDispatchAction(changeProducts);
export const changeQauntityAction = wrapDispatchAction(changeQauntity);
export const changeQueryAction = wrapDispatchAction(changeQuery);
export const changeSeasonAction = wrapDispatchAction(changeSeason);
export const changeViewAction = wrapDispatchAction(changeView);
export const changeToInitialAction = wrapDispatchAction(changeToInitial);
export const changeFilterAction = wrapDispatchAction(changeFilter);
export const changeIsLoadingAction = wrapDispatchAction(changeIsLoading);
