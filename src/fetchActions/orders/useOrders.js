import { useQuery } from '@tanstack/react-query';

export const useOrders = (userId) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/order/all?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
  });
};
