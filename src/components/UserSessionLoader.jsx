// components/UserSessionLoader.jsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { loginUserAction, logoutUserAction } from "@/store/actions/user";
import {
  fetchServerCart,
  addItemsToServerCart,
  setCartItems,
} from "@/store/slice/cart";
import { useDispatch } from "react-redux";
import { getNewOrder } from "@/helpers/cartUtils";

const UserSessionLoader = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncLocalStorageCart = async () => {
      try {
        const userId = session?.user?._id || session?.user?.id; // подстраховка
        const localCartRaw =
          typeof window !== "undefined" && localStorage.getItem("cart");
        if (localCartRaw) {
          const items = getNewOrder(localCartRaw);

          if (items?.length) {
            // 1) Добавляем локальные товары на сервер (await)
            try {
              await dispatch(
                addItemsToServerCart({ localItems: items, userId })
              ).unwrap();
              // 2) Если успешно — очищаем localStorage
              localStorage.removeItem("cart");

              // 3) Можно взять уже обновлённую корзину из fulfilled (thunk обновляет slice),

              await dispatch(fetchServerCart(userId)).unwrap();
            } catch (err) {
              console.error("Ошибка при addItemsToServerCart:", err);
              // на ошибку можно ответить показом уведомления, не удалять localStorage
            }
          } else {
            // если localCart пустой массив, всё равно подтягиваем серверную корзину
            await dispatch(fetchServerCart(userId)).unwrap();
          }
        } else {
          // нет localStorage: просто скачиваем корзину с бэка
          if (userId) {
            await dispatch(fetchServerCart(userId)).unwrap();
          }
        }
      } catch (error) {
        console.error("Ошибка синхронизации корзины:", error);
      }
    };

    if (status === "authenticated" && session?.user) {
      dispatch(loginUserAction(session.user));
      syncLocalStorageCart();
    } else if (status === "unauthenticated") {
      // для неаутентифицированных — показать localStorage (если нужно)
      const raw = typeof window !== "undefined" && localStorage.getItem("cart");
      if (raw) {
        const items = getNewOrder(raw);
        dispatch(setCartItems(items)); // обязательно диспатчим
      } else {
        dispatch(setCartItems([]));
      }
      dispatch(logoutUserAction());
    }
  }, [dispatch, session, status]);

  return null;
};

export default UserSessionLoader;
