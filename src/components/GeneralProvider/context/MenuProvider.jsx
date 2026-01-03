"use client";

import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpenMenu, setIsOpenMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuStore = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuStore must be used within MenuProvider");
  }
  return context;
};

