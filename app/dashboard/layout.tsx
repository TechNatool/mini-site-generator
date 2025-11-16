/**
 * Dashboard Layout
 * Simple layout wrapper for dashboard pages
 * Authentication is handled by middleware.ts
 */

export const metadata = {
  title: 'Dashboard - ForgeWeb',
  description: 'Gérez vos sites générés',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
