import { useEffect, useState } from 'react'
import * as S from './styles'
import { getVendor } from '@/data/getData'
import { Button } from '../ui'
import toast from 'react-hot-toast'

const CheckProductInfo = ({data, isImage, isSmall, setDiscount, onRemove, index}) => {
    const [productDiscount, setProductDiscount] = useState(0)
    useEffect(() => {
        setProductDiscount(0)
    }, [data])
    const onChangeDiscount = () => {
        if (productDiscount){
            setDiscount(productDiscount, index)
        }
        else {
            toast.error("Необхідно внести суму знижки")
        }
    }

    return data.size.map((item, sizeIndex) => (
        <S.CheckInfoContainer key={item.size} isSmall={isSmall}>
            <S.CheckText>Код товару: {data.code}</S.CheckText>
            <S.CheckText>Марка: {getVendor(data.vendor)}</S.CheckText>
            <S.CheckText>Модель: {data.model}</S.CheckText>
            <S.CheckText>Розмір: {item.size}</S.CheckText>
            <S.CheckText>Кількість: {item.q}</S.CheckText>
            {data.price2 &&<S.CheckText>Перша ціна: <S.Uplined>{data.price2} грн</S.Uplined></S.CheckText> }
            <S.CheckText bold>Ціна: {data.salePrice} грн</S.CheckText>
            {!!setDiscount && <S.InputWrapper>
                <S.Input type="number" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)}/>
                <S.Placeholder>Знижка</S.Placeholder>
                <Button type="button" onClick={onChangeDiscount}>Внести знижку</Button>
            </S.InputWrapper>}
            {isImage && 
            <S.CheckImageContainer>
                <S.CheckImage src={data.images[0]} fill />
            </S.CheckImageContainer>
            }
            {onRemove && sizeIndex === data.size.length - 1 && (
                <Button type="button" onClick={() => onRemove(index)}>Видалити товар з чека</Button>
            )}
        </S.CheckInfoContainer>)
    )
}
export default CheckProductInfo
