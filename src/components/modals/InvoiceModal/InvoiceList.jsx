import Image from 'next/image'
import * as S from './styles'
import IconDelete from "@/assets/icons/delete.svg";

const InvoiceList = ({list, deleteItem}) => {

    return (
        <S.ListWrapper>
            {!!list?.length && list.map(item => 
            (<S.ListItemWrapper>
                <S.ItemImageCard>
                    <Image src={item.product.small_image ?? item.product.images?.[0]} alt={item.product.code} fill/>
                </S.ItemImageCard>
                <S.Text>{`${item.product.code} ${item.product.name} ${item.price} * ${item.quantity} = ${item.total.toFixed(2)}`}</S.Text>
                <S.Button type="button" onClick={() => deleteItem(item._id)}>
                    <Image
                        className="pointer"
                        src={IconDelete.src}
                        width={24}
                        height={24}
                        alt="delete"
                    />
                </S.Button>
            </S.ListItemWrapper>)
            )}
        </S.ListWrapper>
    )
}

export default InvoiceList