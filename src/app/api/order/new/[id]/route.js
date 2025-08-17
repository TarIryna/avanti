import Order from "@/models/orders";
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
