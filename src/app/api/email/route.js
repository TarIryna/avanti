import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  const { to, subject, html } = body;

  try {
    const result = await resend.emails.send({
      from: "Avanti <noreply@avanti.shoes>",
      to,
      subject,
      html,
    });

    console.log('result', result)

    return NextResponse.json(result);
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}
