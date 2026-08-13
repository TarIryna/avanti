"use client";

import { GeneralProvider } from "./GeneralProvider";

export const ClientProvider = ({ children, initialRate }) => {
  return <GeneralProvider initialRate={initialRate}>{children}</GeneralProvider>
};