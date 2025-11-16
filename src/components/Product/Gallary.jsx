"use client";
import * as S from "./styles";
import { Slider } from "./Slider";

const Gallary = ({ images }) => {
  const imagesToDisplay = images.filter(Boolean);


  return (
    <S.GalleryWrapper isGrid={imagesToDisplay?.length > 1}>
      <Slider imagesToDisplay={imagesToDisplay}/>
    </S.GalleryWrapper>
  );
};

export default Gallary;
