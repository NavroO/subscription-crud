import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth-token") // In a real app, you would verify the token

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"]
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
