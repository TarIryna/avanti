"use client";
import { useState } from "react";
import * as S from "./styles";
import Image from "next/image";

const Gallary = ({ images }) => {
  const [current, setCurrent] = useState(images?.[0] ?? null);
  const imagesToDisplay = images.filter(Boolean);

  return (
    <S.GalleryWrapper isGrid={imagesToDisplay?.length > 1}>
      {imagesToDisplay?.length > 1 && (
        <S.GallerySmallWrapper>
          {imagesToDisplay.map((item, idx) => (
            <S.GallerySmallImage
              src={item}
              alt={`image-${idx}`}
              width="200"
              height="200"
              key={idx}
              onClick={() => setCurrent(item)}
            />
          ))}
        </S.GallerySmallWrapper>
      )}
      {current && (
        <div>
          <Image src={current} alt="large image" width="500" height="500" />
        </div>
      )}
    </S.GalleryWrapper>
  );
};

export default Gallary;
