"use client";

import { SessionProvider } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { UserSessionLoader } from "../UserSessionLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartProvider";
import { MenuProvider } from "./context/MenuProvider";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export const GeneralProvider = ({ children, session }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <NiceModal.Provider>
            <MenuProvider>
              <CartProvider>
                <UserSessionLoader />
                {children}
               <Toaster position="top-right" />
              </CartProvider>
            </MenuProvider>
          </NiceModal.Provider>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
};
