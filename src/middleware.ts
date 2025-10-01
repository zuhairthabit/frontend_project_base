import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/login", "/signup", "/"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = Array.from(PUBLIC_PATHS).some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value ||
    request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/settings/:path*"],
};

