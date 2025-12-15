import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/seats",
  "/meeting-rooms",
  "/points",
  "/orders",
  "/snacks",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 보호 경로 아니면 통과
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // 예: 쿠키에 access가 있다고 가정 (HttpOnly여도 middleware는 읽을 수 있음)
  const access = req.cookies.get("access")?.value;
  if (access) return NextResponse.next();

  // 로그인으로 리다이렉트
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/seats/:path*",
    "/meeting-rooms/:path*",
    "/points/:path*",
    "/orders/:path*",
    "/snacks/:path*",
  ],
};
