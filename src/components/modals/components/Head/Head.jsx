import * as S from "./styles";
import Image from "next/image";
import CloseIcon from "@/assets/icons/close.svg";

const Head = ({ close, title, isSmall }) => {
  return (
    <S.TitleWrapper>
      <S.Title isSmall={isSmall}>{title}</S.Title>
      <S.Icon onClick={close}>
        <Image src={CloseIcon} alt="close" width="20" height="20" />
      </S.Icon>
    </S.TitleWrapper>
  );
};

export default Head;
