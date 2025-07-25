import { wrapDispatchAction } from ".";
import commonSlice from "../slice/common";
const {
  updateLanguage,
  updateAffiliates,
  updateBanners,
  updateCategories,
  updateFaq,
  updateLocale,
  updatePaymentsIcons,
  updatePromotions,
  updateProviders,
  updateCountries,
  updatePayments,
} = commonSlice?.actions;

export const updateLanguageAction = wrapDispatchAction(updateLanguage);
export const updateAffiliatesAction = wrapDispatchAction(updateAffiliates);
export const updateBannersAction = wrapDispatchAction(updateBanners);
export const updateCategoriesAction = wrapDispatchAction(updateCategories);
export const updateFaqAction = wrapDispatchAction(updateFaq);
export const updateLocaleAction = wrapDispatchAction(updateLocale);
export const updatePaymentsIconsAction =
  wrapDispatchAction(updatePaymentsIcons);
export const updatePromotionsAction = wrapDispatchAction(updatePromotions);
export const updatePromovidersAction = wrapDispatchAction(updateProviders);
export const updateCountriesAction = wrapDispatchAction(updateCountries);
export const updatePaymentsAction = wrapDispatchAction(updatePayments);
