import * as S from "./styles";
import Code39 from "./Code39";

const BarcodesItem = ({ item }) => (
  <S.Container>
    <Code39 value={item.code} />
    <S.Text>{item.code}</S.Text>
  </S.Container>
);

export default BarcodesItem;
