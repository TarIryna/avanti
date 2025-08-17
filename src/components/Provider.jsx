"use client";
import { SessionProvider } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import { Provider } from "react-redux";
import { store } from "@/store";
import UserSessionLoader from "@/components/UserSessionLoader";

const ProviderNext = ({ children, session }) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <NiceModal.Provider>
          <UserSessionLoader />

          {children}
        </NiceModal.Provider>
      </SessionProvider>
    </Provider>
  );
};

export default ProviderNext;
