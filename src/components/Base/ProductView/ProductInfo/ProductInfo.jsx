import { getColorById, getCountry, getGenderName, getMaterial, getMaterialInside, getMaterialTop, getSizesName, getSizesTypeName, getVendor } from '@/data'
import * as S from './styles'
import { getCompanyName } from '@/data/companies'

const ProductInfo = ({product}) => {
    return (
        <S.Grid>
            <div>Марка:</div><div>{getVendor(product.vendor)}</div>
            <div>Пол:</div><div>{getGenderName(product.gender)}</div>
            <div>Модель:</div><div>{product.model}</div>
            <div>Цвет:</div><div>{getColorById(product.color)}</div>
            <div>Поставщик:</div><div>{getCompanyName(product.company)}</div>
            <div>Страна:</div><div>{getCountry(product.country)}</div>
            <div>Материал общий:</div><div>{getMaterial(product.material)}</div>
            <div>Материал верха:</div><div>{getMaterialTop(product.material_top)}</div>
            <div>Материал внутри:</div><div>{getMaterialInside(product.material_inside)}</div> 
            <div>Остатки:</div><div>{`  | А1 - ${product.total?.find(i => i.shop === 1)?.q ?? 0} |  А2 - ${product.total?.find(i => i.shop === 2)?.q ?? 0} |  СКЛ - ${product.total?.find(i => i.shop === 3)?.q ?? 0}  |  Всього - ${product.totalCount}`}</div>
            <div>Продано:</div> <div>{` ${product.pop ?? 0}`}</div>
            <div>Размерная сетка:</div>  <div>{getSizesName(product.sizesGroup)}</div>
            <div>Полномерность:</div> <div>{getSizesTypeName(product.size_type)}</div>
        </S.Grid>
    )
}

export default ProductInfo