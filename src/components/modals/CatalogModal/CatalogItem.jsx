import * as S from './styles'
import { getVendor } from '@/data/getData'

const LabelItem = ({ item }) => {
    return (
        <S.Container>
            <S.Text>Код товару: {item.code}</S.Text>
            <S.Text>Марка: {getVendor(item.vendor)}</S.Text>
            <S.Text>Модель: {item.model}</S.Text>
            <S.Text bold>{item.price} грн</S.Text>

        </S.Container>
    )
}
export default LabelItem