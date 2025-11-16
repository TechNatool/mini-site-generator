/**
 * Dashboard Layout
 * Simple layout wrapper for dashboard pages
 * Authentication is handled by middleware.ts
 */

export const metadata = {
  title: 'Dashboard - Mini Site Generator',
  description: 'Manage your generated sites',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
