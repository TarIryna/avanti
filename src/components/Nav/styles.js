import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";

const navLinkStyles = css`
  padding: 5px 10px;
  height: fit-content;
  border-radius: 4px;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  height: 100px;
  position: relative;
  align-items: center;
  background: black;
  padding: 10px 40px;
  @media screen and (max-width: 1280px) {
    padding: 10px 20px;
  }
  @media screen and (max-width: 767px) {
    height: unset;
    padding: 10px 16px !important;
  }
`;
export const NavigationButton = styled(Link)`
  ${navLinkStyles};
  color: white;
  &:hover {
    text-shadow: white 3px 0 10px;
  }
`;
export const NavigationSale = styled(Link)`
  ${navLinkStyles}
  color: red;
  &:hover {
    text-shadow: red 3px 0 10px;
  }
`;
export const NavigationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 20px;
  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: repeat(3, 30px);
  margin-left: 20px;
`;

export const Logo = styled(Link)`
  min-width: 150px;
  @media screen and (max-width: 1024px) {
    min-width: 100px;
  }
  @media screen and (max-width: 540px) {
    min-width: 60px;
  }
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

export const Menu = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
