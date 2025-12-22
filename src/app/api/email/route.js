import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderEmail from "@/components/Email/Email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
 const isLocalhost = process.env.NEXTAUTH_URL?.includes("localhost")
  
 if (isLocalhost){
    return Response.json({ success: true });
    }

  try {
    const { to, title, items } = await req.json();

    if (!to) {
      return Response.json(
        { error: "`to` is required" },
        { status: 400 }
      );
    }

    const html = await render(<OrderEmail title={title} items={items} />);
  
    const result = await resend.emails.send({
    from: "avanti <orders@avanti.shoes>",
    to: "avanti2uzh@gmail.com",          // основной
    bcc: to[to?.length - 1],               // копия клиенту
    subject: title,
    html,
  });

    return Response.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return new Response("Email error", { status: 500 });
  }
}
