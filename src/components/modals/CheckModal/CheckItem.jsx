import * as S from './styles'
import { getVendor } from '@/data/getData'

const CheckItem = ({data, isImage}) => {
    return (
        <S.CheckInfoContainer>
            <S.CheckText>Код товару: {data.code}</S.CheckText>
            <S.CheckText>Марка: {getVendor(data.vendor)}</S.CheckText>
            <S.CheckText>Модель: {data.model}</S.CheckText>
            <S.CheckText>Розмір: {data?.size?.size}</S.CheckText>
            <S.CheckText bold>{data.salePrice} грн</S.CheckText>
            {isImage && 
            <S.CheckImageContainer>
                <S.CheckImage src={data.images[0]} fill />
            </S.CheckImageContainer>
            }
        </S.CheckInfoContainer>
    )
}
export default CheckItem