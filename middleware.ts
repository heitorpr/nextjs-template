import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPages = [
    "/home",
    "/protected-page"
]

export async function middleware(req: NextRequest) {
  if (protectedPages.includes(req.nextUrl.pathname)) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone()
    url.pathname = '/'

    if (!session) return NextResponse.redirect(url);
  }
  return NextResponse.next();
}