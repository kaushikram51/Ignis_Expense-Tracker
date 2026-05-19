import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Update session if it exists
  const res = await updateSession(request);
  
  const session = request.cookies.get("session")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");
  
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res || NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
