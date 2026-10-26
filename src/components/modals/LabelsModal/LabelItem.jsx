import * as S from "./styles";
import { getVendor } from "@/data/getData";

const LabelItem = ({ item }) => (
  <S.Container>
    <S.Text>Код: {item.code}</S.Text>
    <S.Text>Марка: {getVendor(item.vendor)}</S.Text>
    <S.Text>Модель: {item.model || item.name}</S.Text>
    <S.Text bold>{item.price} грн</S.Text>
  </S.Container>
);

export default LabelItem;
