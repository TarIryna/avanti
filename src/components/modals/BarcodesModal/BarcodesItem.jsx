import * as S from "./styles";
import Code39 from "./Code39";
import { getColorById, getVendor } from "@/data/getData";

const BarcodesItem = ({ item }) => {
  return (
  <S.Container>
    <S.InfoRow>
      <S.InfoCell><span>{getVendor(item.vendor)}</span></S.InfoCell>
      <S.InfoCell><span>{item.model || ""}</span></S.InfoCell>
      <S.InfoCell><span>{getColorById(item.color, "ukr")}</span></S.InfoCell>
    </S.InfoRow>
    <Code39 value={item.code} />
    <S.Text>{item.code}</S.Text>
  </S.Container>
);
}

export default BarcodesItem;
