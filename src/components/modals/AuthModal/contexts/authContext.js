import { createContext, useContext } from "react";

export const AuthModalContext = createContext({});

export const useAuthModalContext = () => useContext(AuthModalContext);
