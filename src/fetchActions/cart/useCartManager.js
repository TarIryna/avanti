import { useEffect, useMemo, useState } from "react";
import { addLocalItem, getLocalCart, removeLocalItem, setLocalCart, clearLocalCart, changeLocalItemQuantity } from "./utils/localCart";
import { useAddItemToCart } from "./useAddItemToCart";
import { useRemoveItemFromCart } from "./useRemoveItemFromCart";
import { useCart } from "./useCart";
import { toast } from "react-hot-toast";
import { useChangeItemQauntityCart } from "./useChangeItemQuantityCart";

export const useCartManager = (initialUserId) => {
  const [userId, setUserId] = useState(initialUserId ?? null);

  const { data: serverCart, refetch } = useCart(userId);
  const [localCart, setLocal] = useState(() => getLocalCart());

  const addMutation = useAddItemToCart();
  const removeMutation = useRemoveItemFromCart(userId);
  const changeItem = useChangeItemQauntityCart()

  // sync guest cart on login
  useEffect(() => {
    if (userId && localCart?.length) {
      (async () => {
        for (const item of localCart) {
          await addMutation.mutateAsync({ userId, ...item });
        }
        clearLocalCart();
        refetch();
      })();
    }
  }, [userId]);

  const addItem = async (item) => {
    if (userId) {
      await addMutation.mutateAsync({ userId, ...item });
      refetch();
    } else {
      const updated = addLocalItem(item);
      setLocal(updated);
      toast.success("Товар успішно доданий у корзину");
    }
  };

const changeItemQuantity = async (item) => {
  if (userId) {
    await changeItem.mutateAsync({ userId, ...item });
    refetch();
  } else {
    const updated = changeLocalItemQuantity(item);
    setLocal(updated);
  }
};


  const removeItem = async ({productId, size}) => {
    if (userId) {
      await removeMutation.mutateAsync({ productId, size });
      refetch();
    } else {
      const updated = removeLocalItem({productId, size});
      setLocal(updated);
      setLocalCart(updated);
      toast.success("Товар успішно видалений з корзини");
    }
  };

  const clearCart = async () => {
    if (userId) {
      await fetch(`/api/cart/clear?userId=${userId}`, { method: "DELETE" });
      refetch();
    } else {
      setLocal([]);
    }
  };

  const items = useMemo(
    () => (userId ? serverCart || [] : localCart),
    [userId, serverCart, localCart]
  );

  const total = useMemo(() => 
    items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
    [items]
  );
  
  const length = useMemo(() => items.reduce(
  (accumulator, item) => accumulator + (item.quantity ?? 0),
  0
), [items])

  return {
    items,
    total,
    length,
    addItem,
    removeItem,
    changeItemQuantity,
    clearCart,
    setUserId,

    isLoading: addMutation.isPending || removeMutation.isPending,
  };
};
