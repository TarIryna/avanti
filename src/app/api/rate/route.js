// /api/shop/audit/route.js
import Rate from "@/models/rate"; 
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const lastRate = await Rate.findOne().sort({ timestamp: -1 });
    return new Response(JSON.stringify({ success: true, lastRate }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API Audit Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};


export const POST = async (request) => {
  try {
    // Получаем данные из фронтенда (номер магазина, название полки и объект отсканированных штрихкодов)
    const { rate } = await request.json(); 

    await connectToDB();

    const newRate = await Rate.create({rate});
    console.log(newRate)


    return new Response(JSON.stringify({ success: true, rate }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ API Audit Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
