import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  let protectedRoutes = [];
  if (token) {
    protectedRoutes = [
      "/profile",
      "/profile/wishlist",
      "/profile/settings",
      "/profile/booking-history",
      "/profile/my-reviews",
      "/dashboard",
      "/cart",
      "/personal-info",
      "/confirm-checkout",
    ];
  } else {
    protectedRoutes = [
      "/profile",
      "/profile/wishlist",
      "/profile/settings",
      "/profile/booking-history",
      "/profile/my-reviews",
      "/dashboard",
    ];
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/wishlist",
    "/profile/settings",
    "/profile/booking-history",
    "/profile/my-reviews",
    "/dashboard",
    "/cart",
    "/personal-info",
    "/confirm-checkout",
  ],
};
