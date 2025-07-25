import { NextResponse } from "next/server";
const PROTECTED = [];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (PROTECTED.some((element) => pathname.includes(element))) {
    const token = req.cookies.get("auth")?.value;
    if (!token) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }
}
