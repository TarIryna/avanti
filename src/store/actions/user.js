import { wrapDispatchAction } from ".";
import { userSlice } from "../slice/user";
const { loginUser, logoutUser, changeAuth, changeUserDeliveryData } =
  userSlice?.actions;

export const loginUserAction = wrapDispatchAction(loginUser);
export const logoutUserAction = wrapDispatchAction(logoutUser);
export const changeAuthAction = wrapDispatchAction(changeAuth);
export const changeUserDeliveryDataAction = wrapDispatchAction(
  changeUserDeliveryData
);
