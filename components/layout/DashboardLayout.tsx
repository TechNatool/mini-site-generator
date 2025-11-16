/**
 * Dashboard Layout Component
 *
 * Layout for authenticated dashboard pages
 * Includes sidebar navigation and header
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    {
      label: 'Mes Sites',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Facturation',
      href: '/dashboard/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-neutral-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-md">
              M
            </div>
            <span className="text-lg font-bold font-heading text-neutral-900">
              Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto" aria-label="Dashboard navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-primary text-white shadow-md'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-neutral-200 space-y-2">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" size="sm" fullWidth>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour au site
              </Button>
            </Link>
            <form action="/api/auth/logout" method="POST" onSubmit={() => setSidebarOpen(false)}>
              <Button variant="danger" size="sm" fullWidth type="submit">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Header Title (Mobile) */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm shadow-md">
                M
              </div>
              <span className="text-lg font-bold font-heading text-neutral-900">
                Dashboard
              </span>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden lg:block" />

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Link href="/dashboard/sites/new">
                <Button variant="primary" size="sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">Nouveau Site</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
