/**
 * Next.js Middleware
 * Handles authentication for dashboard routes
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromCookies, getUserIdFromSession } from './lib/session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/dashboard/login', '/dashboard/register', '/dashboard/logout'];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // If accessing a public auth route, allow
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if accessing dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const cookieHeader = request.headers.get('cookie');
    const sessionToken = getSessionFromCookies(cookieHeader);
    const userId = getUserIdFromSession(sessionToken);

    // If no valid session, redirect to login
    if (!userId) {
      const loginUrl = new URL('/dashboard/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
