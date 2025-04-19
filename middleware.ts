import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();
  console.log("Session: ", session);
  // validating in a simple way if user is auth with token from cookies or not :p
  if (!session) {
    if (url.pathname !== "/auth/login") {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname === "/auth/login") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
