"use client";

import { useEffect, useState } from "react";
import { useUserSession } from "@/fetchActions/user/useUser";
import { adminEmails } from "./constants";
import * as S from "./styles";
import { OrderAdmin } from "./OrderAdmin";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/fetchActions/orders/fetchOrders";

const AdminPage = () => {
  const { data: user } = useUserSession();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: isAdmin, // 👈 запрос только если есть доступ
  });

  var object = orders.reduce((acc, cur) => {
    const user = cur.creator;
    acc[user] = acc[user] || {
      products: [],
    };
    acc[user].products.push(cur);
    return acc;
  }, {});

  var users = [];
  for (const user in object) {
    users.push(object[user]);
  }

  useEffect(() => {
    const isAdmin = user && adminEmails.some(i => i === user.email)
    setIsAdmin(isAdmin)
  }, [user])


  return (
    <section>
      {isAdmin ? (
        <S.Title>АДМІН ПАНЕЛЬ</S.Title>
      ) : (
        <S.Title>У вас нема доступу до адмін панелі</S.Title>
      )}

      {isAdmin && isLoading && <p>Завантаження...</p>}
      {isAdmin && isError && <p>Помилка завантаження</p>}

      {isAdmin &&
        orders.map((order) => (
          <OrderAdmin key={order._id} order={order} />
        ))}
    </section>
  );
};

export default AdminPage;
