import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin")) {

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

  }

  if (url.pathname.startsWith("/dashboard")) {

    if (!role && role !== "user") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};
