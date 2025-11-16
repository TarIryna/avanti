"use client";

import { GeneralProvider } from "./GeneralProvider";

export const ClientProvider = ({ children }) => {
  return <GeneralProvider>{children}</GeneralProvider>;
};
