import { wrapDispatchAction } from ".";
import { commonSlice } from "../slice/common";
const { setIsOpenMenu, toggleMenu } = commonSlice?.actions;

export const setIsOpenMenuAction = wrapDispatchAction(setIsOpenMenu);
export const toogleMenuAction = wrapDispatchAction(toggleMenu);
