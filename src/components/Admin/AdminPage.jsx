"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartList from "@/components/Cart/CartList";

const AdminPage = () => {
  const { data: session } = useSession();
  const [isAccess, setIsAccess] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchConfirmedOrders = async () => {
    try {
      const response = await fetch("/api/order/all", {
        method: "GET",
      });

      if (response) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

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
    if (session?.id === "646b1cd6234250a294af7a22") setIsAccess(true);
  }, [session?.id]);

  useEffect(() => {
    if (isAccess) fetchConfirmedOrders();
  }, [isAccess]);

  const renderUserOrders = (user) => {
    return (
      <div className="admin__user_cart">
        <h4>Реквізити:</h4>
        <div>
          <span className="mr5">{user.products[0].delivery.name}</span>
          <span className="mr5">{user.products[0].delivery.surname}</span>
          <span className="mr5">{user.products[0].delivery.phone}</span>
          <br />
          <span className="bb1 mr5 mb5">
            {user.products[0].delivery.city},{" "}
          </span>
          <span className="bb1 mb5">{user.products[0].delivery.adress}</span>
        </div>
        <CartList products={user.products} />
      </div>
    );
  };

  return (
    <section>
      {isAccess ? <h4>Адмінка</h4> : <h4>У вас нема доступу до адмінки</h4>}
      {isAccess && users && users.map((user) => renderUserOrders(user))}
    </section>
  );
};

export default AdminPage;
