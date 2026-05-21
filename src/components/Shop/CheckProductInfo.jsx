import * as S from './styles'
import { getVendor } from '@/data/getData'

const CheckProductInfo = ({data, isImage, isSmall}) => {
    return (
        <S.CheckInfoContainer isSmall={isSmall}>
            <S.CheckText>Код товару: {data.code}</S.CheckText>
            <S.CheckText>Марка: {getVendor(data.vendor)}</S.CheckText>
            <S.CheckText>Модель: {data.model}</S.CheckText>
            <S.CheckText>Розмір: {data?.size}</S.CheckText>
            <S.CheckText>Кількість: {data?.quantity}</S.CheckText>
            <S.CheckText bold>Ціна: {data.salePrice} грн</S.CheckText>
            {isImage && 
            <S.CheckImageContainer>
                <S.CheckImage src={data.images[0]} fill />
            </S.CheckImageContainer>
            }
        </S.CheckInfoContainer>
    )
}
export default CheckProductInfo