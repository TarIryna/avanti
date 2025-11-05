import * as S from "./styles";
import LoginButton from "./LoginBtn";
import FavouriteIcon from "@/assets/icons/favourite.svg";
import CartIcon from "@/assets/icons/shopping_cart.svg";
import { useUserSession } from "@/fetchActions/user/useUser";
import { useCart } from "@/fetchActions/cart/useFetchCart";
import { useMemo } from "react";

const RightBlock = () => {
  const onFavourite = () => {};
  const { data: user, isSuccess } = useUserSession();
  const isAuth = !!user && isSuccess
  const userId = user?.id ?? user?._id;
  const { data: items } = useCart(userId);
  const length =  items?.length ?? 0


  return (
    <S.ButtonsWrapper>
      <LoginButton />
      {isAuth && (
        <S.FavouriteImage
          src={FavouriteIcon}
          width="25"
          height="25"
          alt="favourite"
          onClick={onFavourite}
        />
      )}
      <S.CartLink href="/cart">
        <S.CartImage
          src={CartIcon}
          alt="shopping cart"
          width="25"
          height="25"
        />
       <S.LabelCart>{length}</S.LabelCart>
      </S.CartLink>
    </S.ButtonsWrapper>
  );
};
export default RightBlock;
