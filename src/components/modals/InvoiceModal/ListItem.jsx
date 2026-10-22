import Sizes from './Sizes'
import * as S from './styles'
import Image from 'next/image'
import { useState } from "react";
import IconDelete from "@/assets/icons/delete.svg";
import { Input } from '@/components/ui';
import { getVendor } from '@/data';


const ListItem = ({ item, updateItems, deleteItem }) => {
    const [sizes, setSizes ] = useState(null)
    const [price, setPrice] = useState(null)

    const setData = (item) => {
        setSizes(item.sizes)
        setPrice(item.price)
    }

    const updateData = () => {
        updateItems([...sizes], item.productCode, price)
        setPrice(null)
        setSizes(null)
    }

return (
    <S.ListItemWrapper>
                <S.ItemImageCard>
                    <Image src={item.product.small_image ?? item.product.images?.[0]} alt={item.product.code} fill/>
                </S.ItemImageCard>
                <S.Text onClick={() => setData(item)}>{`${item.product.name} ${item.price} * ${item.quantity} = ${item.total.toFixed(2)}`}</S.Text>
                 {price !== null && <Input className="price_input" value={price} type="number" onValueChange={(e) => setPrice(e.target.value)}/>}
                 {sizes && <>
                    <Sizes sizes={sizes} item={item.product} setSizes={setSizes}/>
                    <S.Button onClick={() => updateData()}>
                        Обновить данные
                    </S.Button>
                 </>}

                <S.Button type="button" onClick={() => deleteItem(item.productCode)}>
                    <Image
                        className="pointer"
                        src={IconDelete.src}
                        width={24}
                        height={24}
                        alt="delete"
                    />
                </S.Button>
            </S.ListItemWrapper>
)
} 

export default ListItem