import { useState } from "react";
import CartList from "../Cart/CartList";
import * as S from "./styles";
import { statuses } from "@/constants/constants"
    
export const OrderAdmin = ({order}) => {
    const [ttn, setTtn] = useState("");
    const [orderData, setOrderData ] = useState(order)
    const changeOrderStatus = async (order) => {
        try {
            const response = await fetch(`/api/order/${order.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ttn,        
                }),
              });
              if (response) {
                const data = await response.json();
                if (data){
                    setOrderData(data)
                }
              }
            } catch (error) {
              console.log(error);
            }
          };


    return (
        <S.CartWrapper>
            <S.Subtitle>{`Зaмовлення № :${order._id}`}
                {order?.status && statuses && <S.Status status={order.status}>{`${statuses[order.status]}`}</S.Status>}
                </S.Subtitle>
                <S.BlockTitle>Реквізити отримувача:</S.BlockTitle>
                <S.Text>{`ПІБ: ${order.delivery.surname} ${order.delivery.name}`}</S.Text>
                <S.Text>{`Телефон: ${order.delivery.phone}`}</S.Text>
                <S.Text>{`Місто: ${order.delivery.city}`}</S.Text>
                <S.Text>{`Адреса: ${order.delivery.address}`}</S.Text>
                {order?.delivery?.ttn && <S.Text>{`ТТН: ${order.delivery.ttn}`}</S.Text> }
                <CartList products={order.items} />
           
                {!order?.delivery?.ttn &&
                <S.Form>
                    <S.Input value={ttn} onChange={(e) => setTtn(e.target.value)}/> 
                    <S.Button onClick={() => changeOrderStatus(order, ttn)}>Оформити відправку</S.Button>
                </S.Form> }
            </S.CartWrapper>
        )
      }
      
   