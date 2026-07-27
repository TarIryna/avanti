import { useEffect, useState } from 'react'
import * as S from './styles'
import { getVendor } from '@/data/getData'
import { Button } from '../ui'
import toast from 'react-hot-toast'

const CheckProductInfo = ({data, isImage, isSmall, setDiscount, index}) => {
    const [productDiscount, setProductDiscount] = useState(0)
    const onChangeDiscount = () => {
        if (productDiscount){
            setDiscount(productDiscount, index)
        }
        else {
            toast.error("Необхідно внести суму знижки")
        }
    }

    return data.size.map(item => (
        <S.CheckInfoContainer isSmall={isSmall}>
            <S.CheckText>Код товару: {data.code}</S.CheckText>
            <S.CheckText>Марка: {getVendor(data.vendor)}</S.CheckText>
            <S.CheckText>Модель: {data.model}</S.CheckText>
            <S.CheckText>Розмір: {item.size}</S.CheckText>
            <S.CheckText>Кількість: {item.q}</S.CheckText>
            <S.CheckText bold>Ціна: {data.salePrice} грн</S.CheckText>
            {!!setDiscount && <S.InputWrapper>
                <S.Input type="number" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)}/>
                <S.Placeholder>Знижка</S.Placeholder>
                <Button onClick={onChangeDiscount}>Внести знижку</Button>
            </S.InputWrapper>}
            {isImage && 
            <S.CheckImageContainer>
                <S.CheckImage src={data.images[0]} fill />
            </S.CheckImageContainer>
            }
        </S.CheckInfoContainer>)
    )
}
export default CheckProductInfo