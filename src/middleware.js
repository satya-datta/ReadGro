import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is correctly set in your environment variables

export async function middleware(req) {
  const token = req.cookies.get("adminToken")?.value; // Correctly read the token
  const url = req.nextUrl.pathname;
  console.log("admintoken", token);
  console.log("Middleware Token:", token);

  // Allow access to the login page without authentication
  if (url.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  // Redirect if no token is found
  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verified successfully:", decoded);

    // If token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);

    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/Gnaneswar/:path*"],
};
