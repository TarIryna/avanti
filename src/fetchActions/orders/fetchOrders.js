export const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order/all", {
        method: "GET",
      });

      if (response) {
        const data = await response.json();
        return data
      }
    } catch (error) {
      console.log(error);
    }
  };