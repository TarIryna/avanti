"use client";
import Image from "next/image";
import { bannersData } from "./data";
import * as S from "./styles";

const Banners = () => {
  return (
    <S.BannersWrapper>
      {bannersData &&
        bannersData.map((banner) => (
          <S.BannerCard key={banner.text}>
            <Image
              src={banner.image}
              alt={banner.text}
              width="300"
              height="500"
            />
            <S.BannerButton href={banner.link}>{banner.text}</S.BannerButton>
          </S.BannerCard>
        ))}
    </S.BannersWrapper>
  );
};
export default Banners;
