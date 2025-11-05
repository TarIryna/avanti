import { useQuery } from '@tanstack/react-query';

export const useOrders = (userId) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      const res = await fetch(`/api/order/all/?userId=${userId}`);
      const data = await res.json();
      return data;
    },
    enabled: !!userId, // запрос только если есть userId
  });
};