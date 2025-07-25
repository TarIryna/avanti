import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

export const Navigation = styled.nav`
  display: flex;
  height: 100px;
  position: relative;
  align-items: center;
  background: black;
  @media screen and (max-width: 767px) {
    height: unset;
  }
`;
export const NavigationButton = styled(Link)`
  padding: 5px 10px;
  height: fit-content;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  &:hover {
    text-shadow: white 3px 0 10px;
  }
`;
export const NavigationSale = styled(Link)`
  padding: 5px 10px;
  height: fit-content;
  border-radius: 4px;
  color: red;
  font-weight: 700;
  &:hover {
    text-shadow: red 3px 0 10px;
  }
`;
export const NavigationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 20px;
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: repeat(3, 30px);
  margin: 0 20px;
`;

export const Logo = styled(Link)`
  min-width: 150px;
`;

export const AuthButton = styled(Image)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50%;
`;

export const CartImage = styled(Image)`
  width: 25px;
  height: 25px;
`;

export const FavouriteImage = styled(Image)`
  max-width: 25px;
  max-height: 25px;
`;
