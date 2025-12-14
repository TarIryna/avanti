import * as S from './styles'
import Image from 'next/image'
import { statusTranslate } from './data';

export const Order = ({order}) => {
const total = order?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const renderProducts = () => (
    !!order.items?.length > 0 && order.items.map(product => 
    <S.ProductWrapper>
        <S.ImageWrapper>
            <Image src={product.image === 'no image' ? '/default.webp' : product.image} alt={product.id} fill/>
        </S.ImageWrapper>
        <div>
            {!!product.code && <p>{`Кількість: ${product.code}`}</p>}
            <p>{`Розмір: ${product.size}`}</p>
            <p>{`Кількість: ${product.quantity}`}</p>
            <p><strong>{`Ціна: ${product.price} грн`}</strong></p>
        </div>

    </S.ProductWrapper>)
)
    return (
        <S.Wrapper>
            <p>{order.createdAt?.slice(0, 10)}</p>
            <S.Status status={order.status}>{`Статус: `}<span>{statusTranslate[order.status] ?? order.status}</span></S.Status>
            <p><strong>Реквізити доставки:</strong><br/>
            <span>{order.delivery.cityDescription}</span><br/>
            <span>{order.delivery.addressDescription}</span><br/>
            <span>{order.delivery.surname}</span><br/>
            <span>{order.delivery.name}</span><br/>
            <span>{order.delivery.phone}</span><br/>
            </p>
             <div>
                <strong>{`Товари на загальну суму ${order.totalPrice ?? total} грн`}</strong>
                {renderProducts()}
             </div>
        </S.Wrapper>
    )
}