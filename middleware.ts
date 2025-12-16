import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/", "/login", "/register", "/favicon.ico"]

const isPublicPath = (path: string) => {
  return (
    PUBLIC_PATHS.includes(path) ||
    path.startsWith("/_next") ||
    path.startsWith("/api/") ||
    path.startsWith("/static") ||
    path.startsWith("/assets")
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value
  const currentOrgId = request.cookies.get("currentOrgId")?.value

  if (!token) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (!currentOrgId && pathname !== "/organizations") {
    const orgUrl = new URL("/organizations", request.url)
    return NextResponse.redirect(orgUrl)
  }

  return NextResponse.next()
}

