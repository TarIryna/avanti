import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as S from "./styles";
import { IconArrow } from "../icons";


export const Slider = ({ imagesToDisplay }) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const length = imagesToDisplay?.length;
  const areButtons = length > 1;
  const isFirst = index === 0;
  const isLast = index === length - 1;
  const router = useRouter();

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, imagesToDisplay.length - 1));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <S.SliderWrapper>
        <S.Padding>
      <S.Slider
        ref={sliderRef}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagesToDisplay?.map((item, i) => (
          <S.ImageCard key={i}>
            <Image src={item} alt={`slide ${i}`} width={500} height={500} />
          </S.ImageCard>
        ))}
      </S.Slider>
      </S.Padding>
      <S.Back src="/arrow.png" alt="back" width="30" height="20" onClick={() => router.back()}/>
      {areButtons && <S.Length>{`${index + 1} / ${length}`}</S.Length>}
      {areButtons && !isFirst && (
        <S.LeftButton onClick={handlePrev} disabled={index === 0}>
          <IconArrow />
        </S.LeftButton>
      )}
      {areButtons && !isLast && (
        <S.RightButton
          onClick={handleNext}
          disabled={index === imagesToDisplay.length - 1}
        >
          <IconArrow />
        </S.RightButton>
      )}
    </S.SliderWrapper>
  );
};
