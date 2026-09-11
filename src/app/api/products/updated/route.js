// import Product from "@/models/product";
// import { connectToDB } from "@/utils/database";

// export const GET = async () => {
//   try {
//     await connectToDB();
    
//     const startOfTwoDaysAgo = new Date();
//     startOfTwoDaysAgo.setDate(startOfTwoDaysAgo.getDate() - 1); // 1 день назад (вчера) или 2 (ставь -2)
//     startOfTwoDaysAgo.setHours(0, 0, 0, 0); // Начало дня (00:00:00.000)

//     const products = await Product.find({ 
//       updatedAt: { $gte: startOfTwoDaysAgo } 
//     });

//     return new Response(JSON.stringify(products), { status: 200 });
//   } catch (error) {
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
export const dynamic = 'force-dynamic';


export const GET = async () => {
  try {
    await connectToDB();
    
    const startOfTwoDaysAgo = new Date();
    // Используем UTC-методы, чтобы сервер и localhost считали время одинаково
    startOfTwoDaysAgo.setUTCDate(startOfTwoDaysAgo.getUTCDate() - 1); // 1 день назад
    startOfTwoDaysAgo.setUTCHours(0, 0, 0, 0); // 00:00:00.000 по Гринвичу (UTC)

    const products = await Product.find({ 
      updatedAt: { $gte: startOfTwoDaysAgo } 
    });

    return new Response(JSON.stringify(products), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' } // Хорошая практика: явно указать тип контента
    });
  } catch (error) {
    console.error("API Error:", error); // Поможет увидеть ошибку в логах сервера, если она возникнет
    return new Response("Internal Server Error", { status: 500 });
  }
}

