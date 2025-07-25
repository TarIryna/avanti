import { store } from "@/store";

export const wrapDispatchAction = (action) => {
  if (!action) return;
  return (value) => store.dispatch(action(value));
};
