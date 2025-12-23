"use client";

import Image from "next/image";
import Search from "@/components/Collection/Search";
import RightBlock from "./RightBlock";
import Logo from "@/assets/icons/logo_white.svg";
import { toogleMenuAction } from "@/store/actions/common";
import Menu from "../Menu";
import * as S from "./styles";
import { useRef } from "react";
import { IconMenu } from "@/assets/icons/menuWhite";

const Nav = () => {
  const toggleMenu = () => {
    toogleMenuAction();
  };
  const anchorRef = useRef(null);

  return (
    <S.Navigation className="container">
      <S.Menu ref={anchorRef}>
        <IconMenu onClick={toggleMenu} />
      </S.Menu>
      <Menu anchorRef={anchorRef} />
      <S.Logo href="/">
        <Image src={Logo} alt="logo" width={150} height={69} />
      </S.Logo>
      <S.NavigationWrapper>
        <S.NavigationButton href="/women?page=1&limit=24">
          Жінкам
        </S.NavigationButton>
        <S.NavigationButton href="/men?page=1&limit=24">
          Чоловікам
        </S.NavigationButton>
        <S.NavigationButton href="/boys?page=1&limit=24">
          Хлопчикам
        </S.NavigationButton>
        <S.NavigationButton href="/girls?page=1&limit=24">
          Дівчатам
        </S.NavigationButton>
        <S.NavigationButton href="/women?type=bags&page=1&limit=24">
          Аксесуари
        </S.NavigationButton>
        <S.NavigationSale href="/sale?page=1&limit=24">Акція</S.NavigationSale>
      </S.NavigationWrapper>
      <Search />
      <RightBlock />
    </S.Navigation>
  );
};

export default Nav;
