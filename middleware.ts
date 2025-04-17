import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("user-token")?.value;
  // validating in a simple way if user is auth with token from cookies or not :p
  const isAuth = !!token;

  //extra validate
  const protectedPaths = ["/dashboard"];
  const isTryingToAccessProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isAuth && isTryingToAccessProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
