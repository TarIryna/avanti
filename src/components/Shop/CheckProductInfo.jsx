import { useEffect, useState } from 'react'
import * as S from './styles'
import { getVendor } from '@/data/getData'
import { Button } from '../ui'
import toast from 'react-hot-toast'

const CheckProductInfo = ({data, isImage, isSmall, setDiscount, setComment, onRemove, index}) => {
    const [productDiscount, setProductDiscount] = useState(data.manualDiscount || 0)
    useEffect(() => {
        setProductDiscount(data.manualDiscount || 0)
    }, [data.manualDiscount, data.code])
    const onChangeDiscount = () => {
        if (String(productDiscount).trim() === '') {
            toast.error("Необхідно внести суму знижки")
            return
        }
        const discount = Number(productDiscount)
        if (!Number.isFinite(discount) || discount < 0) {
            toast.error("Введіть коректну суму знижки")
            return
        }
        setDiscount(discount, index)
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
                <S.Input type="number" min="0" step="0.01" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)}/>
                <S.Placeholder>Знижка</S.Placeholder>
                <Button type="button" onClick={onChangeDiscount}>Внести знижку</Button>
            </S.InputWrapper>}
            {setComment && <S.Input
                type="text"
                value={data.comment || ''}
                placeholder="Коментар: причина знижки"
                aria-label="Причина знижки"
                onChange={event => setComment(event.target.value, index)}
            />}
            {!setComment && !isSmall && data.comment && <S.CheckText>Коментар: {data.comment}</S.CheckText>}
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
