"use client";
import Loading from "@/app/loading";
import CartNew from "@/components/Cart/CartNew";
import CartEmpty from "@/components/Cart/CartEmpty";
import { PageContainer } from "@/components";
import { useCart } from "@/fetchActions/cart/useFetchCart";
import { useUserSession } from "@/fetchActions/user/useUser";


const CartPage = () => {
 const { data: user, isLoadingUser, isError } = useUserSession();
  const userId = user?._id ?? user?.id
  const { data: items, isLoading, error, refetch } = useCart(userId);

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
