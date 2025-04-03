import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieHeader = req.headers.get("cookie"); // Get cookies from headers
  let token = null;

  if (cookieHeader) {
    const cookies = cookieHeader.split("; "); // Split cookies by "; "
    const tokenCookie = cookies.find((row) => row.startsWith("adminToken="));

    if (tokenCookie) {
      token = tokenCookie.split("=")[1]; // Extract token value
    }
  }

  console.log("Extracted admin token:", token);
  const url = req.url;

  if (url.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  if (!token && url.includes("/admin/Gnaneswar")) {
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  return NextResponse.next();
}
