export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const query = searchParams.get("query") ?? "А";

  const params = {
    apiKey: process.env.NOVA_POSHTA_API_KEY,
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {
      FindByString: query,
    },
  };
  try {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/ ", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const data = await response.json();
    if (!data) return new Response("Not Found", { status: 404 });
    else if (!data.success) return new Response("Not Found", { status: 404 });
    else if (data.success)
      return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
