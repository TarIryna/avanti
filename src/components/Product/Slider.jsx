import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as S from "./styles";
import { IconArrow } from "../icons";
import { useModal } from "@ebay/nice-modal-react";
import { MODALS } from "@/constants/constants";


export const Slider = ({ imagesToDisplay }) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const length = imagesToDisplay?.length;
  const areButtons = length > 1;
  const isFirst = index === 0;
  const isLast = index === length - 1;
  const router = useRouter();
  const { show: showModal } = useModal(MODALS.PRODUCT_MODAL)

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, imagesToDisplay.length - 1));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e) => {
  touchStartX.current = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  touchEndX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchStartX.current - touchEndX.current;

  // порог — чтобы не реагировать на микродвижения
  const threshold = 50;

  if (diff > threshold) {
    handleNext(); // свайп влево
  }

  if (diff < -threshold) {
    handlePrev(); // свайп вправо
  }
};

const onImageClick = () => {
    showModal({images: imagesToDisplay})
}

  return (
    <S.SliderWrapper>
        <S.Padding>
      <S.Slider
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagesToDisplay?.map((item, i) => (
          <S.ImageCard key={i}>
            <Image src={item} alt={`slide ${i}`} fill onClick={onImageClick}/>
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
