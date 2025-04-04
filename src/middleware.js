import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Skip login page
  if (url.pathname.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  // NEW: Proper cookie extraction
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies.adminToken;

  console.log("Extracted token:", token); // Debug log

  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  // Call backend
  const response = await fetch(
    "https://readgro-backend.onrender.com/auth/validate",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `adminToken=${token}`, // Manually forward cookie
      },
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  return NextResponse.next();
}
