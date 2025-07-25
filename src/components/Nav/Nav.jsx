"use client";

import Image from "next/image";
import Search from "@/components/Collection/Search";
import RightBlock from "./RightBlock";
import Logo from "@/assets/icons/logo_white.svg";

import { useRef } from "react";
import * as S from "./styles";

const Nav = () => {
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setMenuDropdown((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuDropdown(false);
  };

  return (
    <S.Navigation className="container">
      <S.Logo href="/">
        <Image src={Logo} alt="logo" width={150} height={69} />
      </S.Logo>
      <S.NavigationWrapper>
        <S.NavigationButton href="/women">Жінкам</S.NavigationButton>
        <S.NavigationButton href="/men">Чоловікам</S.NavigationButton>
        <S.NavigationButton href="/children">Дітям</S.NavigationButton>
        <S.NavigationButton href="/bags">Аксесуари</S.NavigationButton>
        <S.NavigationSale href="/sale">Акція</S.NavigationSale>
      </S.NavigationWrapper>
      <Search />
      <RightBlock />
    </S.Navigation>
  );
};

export default Nav;
