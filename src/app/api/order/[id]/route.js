import Order from "@/models/order";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the product by ID and remove it
    await Order.findByIdAndRemove(params.id);

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting product", { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  await connectToDB();

  const body = await req.json();
  const { id } = params;

  const fieldMap = {
    ttn: "deliver.ttn",
    check: "check",
  };

  const updateData = Object.entries(body)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      if (fieldMap[key]) {
        acc[fieldMap[key]] = value;
      }
      return acc;
    }, {});

  const order = await Order.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  return Response.json(order);
};