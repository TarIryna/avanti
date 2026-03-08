import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const productId = formData.get("productId");
    const field = formData.get("field"); // image1, image2, photo_small и т.д.

    if (!file || !productId || !field) {
      return new Response("Missing data", { status: 400 });
    }

    // файл → base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    // upload to imgbb
    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: new URLSearchParams({
          image: base64,
        }),
      }
    );

    const data = await imgbbRes.json();

    if (!data.success) {
      return new Response("Upload failed", { status: 500 });
    }

    const imageUrl = data.data.url; // или display_url

    // сохраняем в товар
    await Product.findByIdAndUpdate(productId, {
      [field]: imageUrl,
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: imageUrl,
        thumb: data.data.thumb?.url,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
