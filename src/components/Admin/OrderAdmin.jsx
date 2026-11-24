import { useState } from "react";
import CartList from "../Cart/CartList";
import * as S from "./styles";
import { MODALS, statuses } from "@/constants/constants"
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import IconCheck from "@/assets/icons/reciept.svg";
import toast from "react-hot-toast";
import { PAYMENT_METHODS, PAYMENT_STATUS_LABELS } from "@/constants/payment";

registerDynamicModal(
  MODALS.DELIVERY_TTN,
  import("@/components/modals/DeliveryTTN/DeliveryTtnModal")
);
    
export const OrderAdmin = ({order}) => {
    const [ttn, setTtn] = useState(order?.ttn || null);
    const [check, setCheck] = useState("");
    const [savingCheck, setSavingCheck] = useState(false);
    const [markingSuccessful, setMarkingSuccessful] = useState(false);
    const {show: showDeliveryModal} = useModal(MODALS.DELIVERY_TTN)
    const queryClient = useQueryClient();

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

const deleteOrder = async () => {
        try {
            const response = await fetch(`/api/order/${order._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response) {
               queryClient.invalidateQueries({ queryKey: ["orders"] });
              }
            } catch (error) {
              console.log(error);
            }
          };

const cancelOrder = async () => {
  try {
    const response = await fetch(`/api/order/${order._id}`, { // Укажите ваш правильный путь к API
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "canceled" // 🌟 Передаем поле статуса
      }),
    });

    if (!response.ok) throw new Error("Failed to cancel order");
    toast.success("Заказ успешно отменен");
  } catch (error) {
    console.log(error)
    toast.error("Ошибка при отмене заказа:");
  }
};


  const markOrderSuccessful = async () => {
    setMarkingSuccessful(true);
    try {
      const response = await fetch(`/api/order/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "success" }),
      });

      if (!response.ok) throw new Error("Failed to update order status");
      const updatedOrder = await response.json();
      if (updatedOrder?.status !== "success") throw new Error("Order status was not updated");

      queryClient.setQueryData(["orders"], (orders) =>
        orders?.map((item) =>
          item._id === order._id ? { ...item, status: updatedOrder.status } : item
        )
      );
      toast.success("Замовлення позначено як успішне");
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося оновити статус замовлення");
    } finally {
      setMarkingSuccessful(false);
    }
  };

  const addCheck = async () => {
    setSavingCheck(true);
    try {
      const response = await fetch(`/api/order/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check: check.trim() }),
      });

      if (!response.ok) throw new Error("Failed to save receipt");
      const updatedOrder = await response.json();
      if (!updatedOrder?.check) throw new Error("Receipt was not saved");

      queryClient.setQueryData(["orders"], (orders) =>
        orders?.map((item) =>
          item._id === order._id ? { ...item, check: updatedOrder.check } : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося прикріпити чек");
    } finally {
      setSavingCheck(false);
    }
  };


    return (
        <S.CartWrapper>
            <S.Subtitle>{`Зaмовлення № :${order.createdAt?.replace("T", " ")?.slice(0, 16)}`}
                {order?.status && statuses && <S.Status status={order.status}>{`${statuses[order.status]}`}</S.Status>}
                </S.Subtitle>
                {order.payment?.method === PAYMENT_METHODS.LIQPAY && (
                  <S.Payment>
                    {order.payment.sandbox ? "Тестова оплата" : "Онлайн-оплата"} LiqPay ·{" "}
                    {PAYMENT_STATUS_LABELS[order.payment.status] ?? order.payment.status}
                  </S.Payment>
                )}
                <S.BlockTitle>Реквізити отримувача:</S.BlockTitle>
                <S.Text>{`ПІБ: ${order.delivery.surname} ${order.delivery.name}`}</S.Text>
                <S.Text>{`Телефон: ${order.delivery.phone}`}</S.Text>
                <S.Text>{`Email: ${order.delivery.email}`}</S.Text>
                <S.Text>{`Місто: ${order.delivery.cityDescription}`}</S.Text>
                <S.Text>{`Адреса: ${order.delivery.addressDescription}`}</S.Text>
                <S.Flex>  
                 {(order.status === 'success' || !!order.check)  && <Image
                      className="pointer"
                      src={IconCheck.src}
                      width={24}
                      height={24}
                      alt="delete"
                    />}
                    {order.check ? <S.Text>Чек прикріплено</S.Text> 
                    
                    : order.status === 'success' ? (
                      <>
                        <S.Input
                           id="check"
                           onChange={(e) => setCheck(e.target.value)}
                           disabled={savingCheck}
                        />
                        <S.Button onClick={addCheck} disabled={savingCheck || !check.trim()}>
                          {savingCheck ? "Збереження…" : "Додати чек"}
                        </S.Button>
                      </>
                    ) 
                    : null}
                    </S.Flex> 
                {order?.delivery?.ttn && <S.Text>{`ТТН: ${order.delivery.ttn}`}</S.Text> }
                <CartList products={order.items} total={order?.total}/>
                {!order.ttn && <S.Button onClick={() => showDeliveryModal({order, createTTN})}>Згенерувати ТТН</S.Button>}
                <S.DeliveryData>
                {!order?.delivery?.ttn && ttn  && 
                    <S.DeliveryText>ТТН: {ttn?.IntDocNumber}</S.DeliveryText>
                    }
                {!!order.deliveryStatus && <S.DeliveryText>{order.deliveryStatus }</S.DeliveryText>}
                {order.status !== "success" && (
                  <S.Button onClick={markOrderSuccessful} disabled={markingSuccessful}>
                    Позначити як успішне
                  </S.Button>
                )}
                {(order.status === "new" || order.status === "delivery") && <S.Button onClick={cancelOrder}>Відмінити</S.Button>}
                {order.status === "new" && <S.Button onClick={deleteOrder}>Видалити</S.Button>}
                </S.DeliveryData>
            </S.CartWrapper>
        )
      }
