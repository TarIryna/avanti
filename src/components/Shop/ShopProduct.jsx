import * as S from './styles'
import { getVendor, getGenderName } from '@/data/getData'
import Description from './Description'

const ShopProduct = ({product}) => {
    return (
<>
                <Description text={getGenderName(product.gender)} label="Стать"/>
                <Description text={getVendor(product.vendor)} label="Марка"/>
                <Description text={product.model} label="Модель"/>
                <Description text={product.color} label="Колір"/>
          </>
    )
}
export default ShopProduct