"use client";
import * as S from "./styles";
import { Slider } from "./Slider";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { MODALS } from "@/constants/constants";

registerDynamicModal(
  MODALS.PRODUCT_MODAL,
  import("@/components/modals/ProductModal/ProductModal")
);

const Gallary = ({ images }) => {
  const imagesToDisplay = images.filter(Boolean);


  return (
    <S.GalleryWrapper isGrid={imagesToDisplay?.length > 1}>
      <Slider imagesToDisplay={imagesToDisplay}/>
    </S.GalleryWrapper>
  );
};

export default Gallary;
