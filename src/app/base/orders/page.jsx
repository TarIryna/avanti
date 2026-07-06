"use client";
import Link from "next/link";
import * as S from './styles'

const OrdersPage = () => {
    return (
          <section className="page">
            <S.ButtonsList>
                <Link href="/base/orders/decrease">Списати розміри</Link>
                <Link href="/base/orders/increase">Додати розміри</Link>
            </S.ButtonsList>
        </section>
    )
}

export default OrdersPage;
