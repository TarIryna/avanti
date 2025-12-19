"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { clearLocalCart } from "@/fetchActions/cart/utils/localCart";

export const useAddNewOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, delivery, userId }) => {
      const params = {
        items,
        delivery,
        userId
      };

      const res = await fetch("/api/order/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

    //   const itemsHtml = items
    //     .map(
    //       item => `
    //         <tr>
    //           <td style="padding:10px; border-bottom:1px solid #eee;">
    //             <img 
    //               src="${item.image}" 
    //               width="150" 
    //               height="150"
    //               style="display:block; object-fit:cover;"
    //               alt="product image"
    //             />
    //           </td>
    //           <td style="padding:10px; vertical-align:top;">
    //             <p><b>Код:</b> ${item.code}</p>
    //             <p><b>Кількість:</b> ${item.quantity}</p>
    //             <p><b>Ціна:</b> ${item.price} грн</p>
    //           </td>
    //         </tr>
    //       `
    //     )
    //     .join("");


    // const emailParams = {
    //   to: "avanti2uzh@gmail.com",
    //   subject: "Нове замовлення на avanti.shoes!",
    //   html: `
    //     <h2>Нове замовлення</h2>
    //     <table width="100%" cellpadding="0" cellspacing="0">
    //       ${itemsHtml}
    //     </table>
    //   `,
    // };

    // const emailParamsUser = {
    //   to: delivery.email,
    //   subject: "Дякуємо за замовлення на avanti.shoes!",
    //   html: `
    //     <h2>Дякуємо за Ваше замовлення</h2>
    //     <p>Ми вже почали обробку вашого замовлення.</p>
    //     <table width="100%" cellpadding="0" cellspacing="0">
    //       ${itemsHtml}
    //     </table>
    //   `,
    // };

      try {
          await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "avanti2uzh@gmail.com",
          title: "Нове замовлення на avanti.shoes!",
          items,
        }),
      });

      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: delivery.email,
          title: "Дякуємо за ваше замовлення!",
          items,
        }),
      });

      } catch (error) {
        console.log(error)
      }


      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Не вдалося оновити статус замовлення");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      // например, обновляем список заказов
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["cart"]);
      clearLocalCart()
      toast.success("Статус замовлення оновлено ✅");
    },

    onError: (error) => {
      console.log(error)
      console.error("Помилка оновлення:", error);
      toast.error("Не вдалося оновити замовлення");
    },
  });
};
