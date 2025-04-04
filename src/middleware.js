import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Allow access to login page without validation
  if (url.pathname.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  // Get cookies from the request
  const cookieHeader = req.cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // Call backend to validate token
  const response = await fetch(
    "https://readgro-backend.onrender.com/auth/validate",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // Manually forward cookies
      },
    }
  );

  // If token is invalid, redirect to login
  if (!response.ok) {
    console.log("Admin token invalid or expired");
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  // Token is valid — continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/Gnaneswar/:path*"],
};
