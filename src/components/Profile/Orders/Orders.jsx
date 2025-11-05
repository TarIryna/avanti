'use client'
import { useOrders } from "@/fetchActions/orders/useOrders";
import { useUserSession } from "@/fetchActions/user/useUser";
import * as S from './styles'
import { Order } from "./components/Order";

const Orders = () => {
  const { data: user, isSuccess } = useUserSession();
  const isAuth = !!user && isSuccess
  const { data: items, isLoading, error, refetch } = useOrders(user?.id ?? user?._id);

  const handleEdit = (post) => {
    push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredOrders = myOrders.filter((item) => item._id !== post._id);

        setOrders(filteredOrders);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
<S.List>
  {!!items?.length && items.map(item => <Order order={item}/>)}
</S.List>
  )
};

export default Orders;
