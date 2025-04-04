export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Skip login page
  if (url.pathname.includes("/admin/Gnaneswar/login")) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("adminToken")?.value;

  // Call backend with Authorization header
  const response = await fetch(
    "https://readgro-backend.onrender.com/auth/validate",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(new URL("/admin/Gnaneswar/login", req.url));
  }

  return NextResponse.next();
}
