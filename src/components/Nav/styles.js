import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { media } from "@/styles/mediaBrakepoints";

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
  width: 100%;
  position: relative;
  align-items: center;
  background: black;
  padding: 10px 40px;
  ${media.tabletLg} {
    padding: 10px 20px;
  }
  ${media.tabletSm} {
    height: unset;
    padding: 10px 16px !important;
  }
  ${media.mobile}{
    max-width: 100vw;
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
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 20px;
  > div,
  a {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    img {
      width: 25px;
      height: 25px;
      }
  ${media.mobile}{
    > div, a {
      width: 20px;
    }
      img {
        height: 20px;
        width: 20px;
      }
`;

export const Logo = styled(Link)`
  min-width: 150px;
  ${media.tabletLg} {
    min-width: 100px;
  }
  ${media.mobile} {
    min-width: 60px;
    max-width: 80px;
  }
`;

export const AuthButton = styled(Image)`
  cursor: pointer;
  border-radius: 50%;
`;

export const CartImage = styled(Image)`
`;

export const FavouriteImage = styled(Image)`
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
    ${media.mobile}{
      width: 20px;
      height: 20px;
    }
`;

export const CartLink = styled(Link)`
  position: relative;
`;

export const LabelCart = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: #3dbc3d;
  border-radius: 50%;
  top: -4px;
  right: 1px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
