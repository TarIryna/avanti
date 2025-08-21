export const fetchProduct = async ({ id }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/product/${id}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      if (data) return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCartItemNotauth = async ({ id }) => {
  try {
    const response = await fetch(`/api/product/${id}`);

    if (response.ok) {
      const data = await response.json();
      if (data?.result) {
        return data.result;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
