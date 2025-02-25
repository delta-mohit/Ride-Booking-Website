import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value || "";

  const { pathname } = req.nextUrl;
  // 🔹 Redirect if NOT logged in and trying to access /features/*
  if (!accessToken && pathname.startsWith("/features")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔹 Redirect if logged in and trying to access /login or /signup
  if (accessToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/features/book-ride", req.url));
  }

  // ✅ Allow the request to proceed
  return NextResponse.next();
}

// 🔹 Define paths where middleware should run
export const config = {
  matcher: ["/features/:path*", "/login", "/signup"], // Only run for these paths
};
