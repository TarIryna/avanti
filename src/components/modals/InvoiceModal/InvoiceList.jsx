import Image from 'next/image'
import * as S from './styles'

const InvoiceList = ({list, deleteItem}) => {

    return (
        <S.ListWrapper>
            {!!list?.length && list.map(item => 
            (<S.ListItemWrapper>
                <S.ItemImageCard>
                    <Image src={item.itemData.small_image ?? item.itemData.images?.[0]} alt={item.itemData.code} fill/>
                </S.ItemImageCard>
                <S.Text>{`${item.itemData.code} ${item.itemData.name} ${item.price} * ${item.quantity} = ${item.total}`}</S.Text>
      
            </S.ListItemWrapper>)
            )}
        </S.ListWrapper>
    )
}

export default InvoiceList