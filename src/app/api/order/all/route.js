import Order from "@/models/order";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (request) => {
  try {
    await connectToDB();

    // получаем userId из query параметров
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // фильтруем заказы по userId, если он указан
  const filter = userId
  ? { creator: new mongoose.Types.ObjectId(userId) }
  : {};

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    const ordersWithTTN = await Order.find({
        "ttn.IntDocNumber": { $exists: true }
      }).lean();

  const documents = ordersWithTTN.map(order => ({
      DocumentNumber: order.ttn.IntDocNumber,
      Phone: order.delivery.phone,
    }));

    
    const params = {
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: documents
        },
      };

      const response = await fetch(
            "https://api.novaposhta.ua/v2.0/json/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(params),
            }
          );

          const result = await response.json();

          if (result?.data){
        for (const item of result.data) {
          const updateData = {
            deliveryStatus: item.Status,
          };

          if (item.Status === "Відправлення отримано") {
            updateData.status = "success";
          }

           if (item.Status === "Відмова від отримання") {
            updateData.status = "canceled";
          }

          await connectToDB();

          await Order.updateOne(
            { "ttn.IntDocNumber": item.Number },
            {
              $set: updateData,
            }
          );
        }
          }

       

    // возвращаем в нужном формате
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Failed to fetch orders", { status: 500 });
  }
};
