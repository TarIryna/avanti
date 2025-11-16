"use client";
import Loading from "@/app/loading";
import CartNew from "@/components/Cart/CartNew";
import CartEmpty from "@/components/Cart/CartEmpty";
import { PageContainer } from "@/components";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useCartStore } from "../GeneralProvider/context/CartProvider";


const CartPage = () => {
  const { items, isLoading } = useCartStore();

  return (
    <PageContainer>
      <h2>Кошик</h2>
      {isLoading ? (
        <Loading />
      ) : !!items?.length ? (
        <CartNew products={items} />
      ) : (
        <CartEmpty />
      )}
    </PageContainer>
  );
};
export default CartPage;
