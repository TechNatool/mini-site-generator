/**
 * Admin Layout Component
 *
 * Layout for admin panel pages
 * Includes sidebar with admin-specific navigation
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Admin navigation items
  const navItems = [
    {
      label: 'Configuration IA',
      href: '/admin/ai-settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: 'Configuration SEO',
      href: '/admin/seo-settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: 'Configuration Images',
      href: '/admin/image-settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Configuration Deploy',
      href: '/admin/deploy-settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white border-r border-neutral-700 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-neutral-700">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning to-warning-dark flex items-center justify-center text-white font-bold text-xl shadow-md">
              A
            </div>
            <span className="text-lg font-bold font-heading">
              Admin Panel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto" aria-label="Admin navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-warning text-neutral-900 shadow-md'
                        : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
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
          <div className="p-4 border-t border-neutral-700 space-y-2">
            <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" size="sm" fullWidth className="text-white hover:bg-neutral-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-warning to-warning-dark flex items-center justify-center text-white font-bold text-sm shadow-md">
                A
              </div>
              <span className="text-lg font-bold font-heading text-neutral-900">
                Admin
              </span>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden lg:block" />

            {/* Admin Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-warning/10 text-warning font-semibold text-sm rounded-lg">
                Administrateur
              </span>
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

export default AdminLayout;
