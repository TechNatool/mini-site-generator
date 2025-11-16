/**
 * Public Layout Component
 *
 * Layout for public-facing pages (landing, pricing, features, etc.)
 * Includes modern navbar with sticky header and footer
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing', label: 'Tarifs' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md'
            : 'bg-white/60 backdrop-blur-sm'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Mini Site Generator - Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-glow transition-all">
                M
              </div>
              <span className="text-xl font-bold font-heading text-neutral-900 hidden sm:block">
                Mini Site Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-neutral-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="sm">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200 animate-slide-down">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-primary-50 text-primary'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="md" fullWidth>
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" fullWidth>
                      Commencer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-md">
                  M
                </div>
                <span className="text-xl font-bold font-heading">
                  Mini Site Generator
                </span>
              </div>
              <p className="text-neutral-400 max-w-md">
                Créez des mini-sites professionnels en quelques clics avec l'intelligence artificielle.
              </p>
            </div>

            {/* Links - Product */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Produit
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-neutral-400 hover:text-white transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors">
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links - Support */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth/login" className="text-neutral-400 hover:text-white transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-neutral-400 hover:text-white transition-colors">
                    Inscription
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400 text-sm">
            <p>© {new Date().getFullYear()} Mini Site Generator. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
