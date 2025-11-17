/**
 * Next.js Middleware
 *
 * Handles maintenance mode checking before routing
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isMaintenanceModeEnabled,
  isPathAllowedDuringMaintenance,
  getMaintenancePageHTML,
} from './lib/maintenance';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if maintenance mode is enabled
  if (isMaintenanceModeEnabled()) {
    // Allow specific paths during maintenance
    if (isPathAllowedDuringMaintenance(pathname)) {
      return NextResponse.next();
    }

    // TODO: Check if user is admin (would need to check auth token/cookie)
    // For now, only path-based bypass is implemented
    // const userRole = await getUserRoleFromRequest(request);
    // if (canBypassMaintenance(userRole)) {
    //   return NextResponse.next();
    // }

    // Return maintenance page
    return new NextResponse(getMaintenancePageHTML(), {
      status: 503,
      headers: {
        'Content-Type': 'text/html',
        'Retry-After': '300', // Retry after 5 minutes
      },
    });
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
