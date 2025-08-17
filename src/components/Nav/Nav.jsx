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
        <S.NavigationButton href="/women">Жінкам</S.NavigationButton>
        <S.NavigationButton href="/men">Чоловікам</S.NavigationButton>
        <S.NavigationButton href="/boys">Хлопчикам</S.NavigationButton>
        <S.NavigationButton href="/girls">Дівчатам</S.NavigationButton>
        <S.NavigationButton href="/bags">Аксесуари</S.NavigationButton>
        <S.NavigationSale href="/sale">Акція</S.NavigationSale>
      </S.NavigationWrapper>
      <Search />
      <RightBlock />
    </S.Navigation>
  );
};

export default Nav;
