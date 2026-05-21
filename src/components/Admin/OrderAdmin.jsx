import { useState } from "react";
import CartList from "../Cart/CartList";
import * as S from "./styles";
import { MODALS, statuses } from "@/constants/constants"
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useModal } from "@ebay/nice-modal-react";

registerDynamicModal(
  MODALS.DELIVERY_TTN,
  import("@/components/modals/DeliveryTTN/DeliveryTtnModal")
);
    
export const OrderAdmin = ({order}) => {
    const [ttn, setTtn] = useState(order?.ttn || null);
    const {show: showDeliveryModal} = useModal(MODALS.DELIVERY_TTN)

  const createTTN = async (order, payment) => {
      const data = {...order.delivery, cost: order?.totalPrice, items: order?.items?.length, orderId: order._id, payment}
        try {
            const response = await fetch(`/api/shipping/novaposhta/ttn`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data  
                }),
              });
              if (response) {
               setTtn(response.data)
              }
            } catch (error) {
              console.log(error);
            }
          };

    return (
        <S.CartWrapper>
            <S.Subtitle>{`Зaмовлення № :${order.createdAt?.replace("T", " ")?.slice(0, 16)}`}
                {order?.status && statuses && <S.Status status={order.status}>{`${statuses[order.status]}`}</S.Status>}
                </S.Subtitle>
                <S.BlockTitle>Реквізити отримувача:</S.BlockTitle>
                <S.Text>{`ПІБ: ${order.delivery.surname} ${order.delivery.name}`}</S.Text>
                <S.Text>{`Телефон: ${order.delivery.phone}`}</S.Text>
                <S.Text>{`Місто: ${order.delivery.cityDescription}`}</S.Text>
                <S.Text>{`Адреса: ${order.delivery.addressDescription}`}</S.Text>
                {order?.delivery?.ttn && <S.Text>{`ТТН: ${order.delivery.ttn}`}</S.Text> }
                <CartList products={order.items} total={order?.total}/>
                {!order.ttn && <S.Button onClick={() => showDeliveryModal({order, createTTN})}>Згенерувати ТТН</S.Button>}
                <S.DeliveryData>
                {!order?.delivery?.ttn && ttn  && 
                    <S.DeliveryText>ТТН: {ttn?.IntDocNumber}</S.DeliveryText>
                    }
                {!!order.deliveryStatus && <S.DeliveryText>{order.deliveryStatus }</S.DeliveryText>}
                </S.DeliveryData>
            </S.CartWrapper>
        )
      }
      
   