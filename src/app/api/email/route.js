// import { Resend } from 'resend';
// import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request) {
//   const body = await request.json();
//   const { to, subject, html } = body;

//   try {
//     const result = await resend.emails.send({
//       from: "Avanti <noreply@avanti.shoes>",
//       to,
//       subject,
//       html,
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.log('error', error)
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
// TO DO - DELETE

import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderEmail from "@/components/Email/Email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const isLocalhost =
  process.env.NEXTAUTH_URL?.includes("localhost")

if (isLocalhost) {
  return Response.json(
    { message: "Email sending disabled on localhost" },
    { status: 200 }
  );
}
  try {
    const { to, title, items } = await req.json();
    const html = render(
      <OrderEmail title={title} items={items} />
    );

    const result = await resend.emails.send({
      from: "avanti <orders@avanti.shoes>",
      to,
      subject: title,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Email error", { status: 500 });
  }
}
