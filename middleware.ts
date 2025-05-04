import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (
    session &&
    (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
