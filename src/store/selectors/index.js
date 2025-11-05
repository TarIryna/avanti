import { useSelector } from "react-redux";

// export const useUser = () => useSelector((state) => state.user);

export const useCommon = () => useSelector((state) => state.common);

export const useOrders = () => useSelector((state) => state.orders);

export const useNewOrder = () => useSelector((state) => state.neworder);

export const useProducts = () => useSelector((state) => state.products);

export const useProduct = () =>
  useSelector((state) => state.product.productInfo);

// export const useCart = () => useSelector((state) => state.cart);
