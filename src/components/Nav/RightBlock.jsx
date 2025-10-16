import * as S from "./styles";
import LoginButton from "./LoginBtn";
import FavouriteIcon from "@/assets/icons/favourite.svg";
import CartIcon from "@/assets/icons/shopping_cart.svg";
import { useCart, useUser } from "@/store/selectors";

const RightBlock = () => {
  const onFavourite = () => {};
  const { isAuth } = useUser();
  const { items } = useCart();
  const itemsInCart = items?.length;

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
        <S.LabelCart>{itemsInCart}</S.LabelCart>
      </S.CartLink>
    </S.ButtonsWrapper>
  );
};
export default RightBlock;
