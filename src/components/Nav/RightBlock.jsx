import * as S from "./styles";
import Link from "next/link";
import LoginButton from "./LoginBtn";
import FavouriteIcon from "@/assets/icons/favourite.svg";
import CartIcon from "@/assets/icons/shopping_cart.svg";
import { useUser } from "@/store/selectors";

const RightBlock = () => {
  const onFavourite = () => {};
  const { isAuth } = useUser();

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
      <Link href="/cart">
        <S.CartImage
          src={CartIcon}
          alt="shopping cart"
          width="25"
          height="25"
        />
      </Link>
    </S.ButtonsWrapper>
  );
};
export default RightBlock;
