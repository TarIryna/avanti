import { Orders } from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

async function getOrders(userId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/users/${userId}/orders/all/`, {
    cache: "no-store", // чтобы данные всегда были свежие
    headers: {
      Cookie: cookies().toString(), // пробрасываем сессию если нужно
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  // const orders = await getOrders(userId);

  return <Orders />;
}
