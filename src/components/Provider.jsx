"use client";
import { SessionProvider } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { UserSessionLoader } from "./UserSessionLoader";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ProviderNext = ({ children, session }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SessionProvider session={session}>
        <NiceModal.Provider>
          <UserSessionLoader />

          {children}
        </NiceModal.Provider>
      </SessionProvider>
    </Provider>
    </QueryClientProvider>
  );
};

export default ProviderNext;
