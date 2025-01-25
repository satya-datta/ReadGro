import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("adminToken"); // Automatically includes HTTP-only cookies
  console.log(token);
  const url = req.url;

  // Allow access to the login page without authentication
  if (url.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  // Redirect to login if no token is found
  if (!token && url.includes("/admin/Gnaneswar")) {
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/Gnaneswar/:path*"],
};
