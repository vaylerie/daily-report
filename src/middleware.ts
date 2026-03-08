import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const routeAccess: Record<string, string[]> = {
  "/admin": ["admin"],
  "/dashboard": ["user", "admin"],
  "/pro": ["pro", "admin"]
};

const roleRedirect: Record<string, string> = {
  admin: "/admin",
  user: "/dashboard",
  pro: "/pro"
};

export function middleware(req: NextRequest) {

  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/") {

    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.redirect(new URL(roleRedirect[role], req.url));
  }

  if (pathname === "/login" || pathname === "/signup") {

    if (role) {
      return NextResponse.redirect(new URL(roleRedirect[role], req.url));
    }

  }

  for (const route in routeAccess) {

    if (pathname.startsWith(route)) {

      const allowedRoles = routeAccess[route];

      if (!role || !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/dashboard/:path*", "/pro/:path*", "/login", "/signup"]
};
