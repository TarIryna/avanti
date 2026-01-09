import { create } from "@ebay/nice-modal-react";

import React, { useRef, useState } from "react";
import ReactModal from "@/components/modals/ReactModal";
import { Wrapper, Content } from "../styles";
import * as S from "./styles";
import { IconArrow } from "@/components/icons";
import Image from "next/image";
import { useModal } from "@ebay/nice-modal-react";
import Head from "../components/Head/Head";

const ProductModal = create(({ id, images }) => {
  const  { hide } = useModal(id)
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const length = images?.length;
  const areButtons = length > 1;
  const isFirst = index === 0;
  const isLast = index === length - 1;

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <ReactModal id={id} closeOnClickOutside>
      <Wrapper>
        <S.ContainerProduct>
          <Head close={hide}/>
          <S.ContentProduct>
            <S.SliderWrapper>
                <S.Slider
                  ref={sliderRef}
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {images?.map((item, i) => (
                    <S.ImageCard key={i}>
                      <Image src={item} alt={`slide ${i}`} fill/>
                    </S.ImageCard>
                  ))}
                </S.Slider>
      
              {areButtons && <S.Length>{`${index + 1} / ${length}`}</S.Length>}
              {areButtons && !isFirst && (
                <S.LeftButton onClick={handlePrev} disabled={index === 0}>
                  <IconArrow />
                </S.LeftButton>
              )}
              {areButtons && !isLast && (
                <S.RightButton
                  onClick={handleNext}
                  disabled={index === images.length - 1}
                >
                  <IconArrow />
                </S.RightButton>
              )}
          </S.SliderWrapper>
          </S.ContentProduct>
        </S.ContainerProduct>
      </Wrapper>
    </ReactModal>
  );
});

export default ProductModal;
