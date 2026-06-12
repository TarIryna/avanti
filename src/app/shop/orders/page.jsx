"use client";
import Link from "next/link";
import * as S from './styles'

const OrdersPage = () => {
    return (
          <section className="page">
            <S.ButtonsList>
                <Link href="/shop/orders/decrease">Списати розміри</Link>
                <Link href="/shop/orders/increase">Додати розміри</Link>
            </S.ButtonsList>
        </section>
    )
}

export default OrdersPage;
