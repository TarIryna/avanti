import { useQuery } from '@tanstack/react-query';

export const useCart = (userId) => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      return data.items;
    },
    enabled: !!userId, // запрос только если есть userId
  });
};
