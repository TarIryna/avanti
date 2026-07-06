import { getVendor } from '@/data'
import * as S from './styles'
import ImageWrapper from '@/components/Product/ImageWrapper'

const CatalogCard = ({ item }) => {
    const image = item.small_image ?? item.images[0]

    return (
        <S.Container>
          <S.ImageWrapper>
             {image && <ImageWrapper
                src={image}
                alt={item.code}
                fill
                />}
            </S.ImageWrapper>
            <S.Info>
                <S.Text>{item.code}</S.Text>
                <S.Text>{getVendor(item.vendor)}</S.Text>
                <S.Text>{item.model}</S.Text>
                {item.price2 && <S.Price>{item.price2} грн</S.Price>}
                <S.Price>{item.price} грн</S.Price>
            </S.Info>
        </S.Container>
    )
}

export default CatalogCard