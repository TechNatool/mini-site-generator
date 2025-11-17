/**
 * Legal Layout Component
 *
 * Clean, centered layout for legal pages (privacy, terms, etc.)
 * Includes header, footer, and mobile-friendly design
 */

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/public/Footer';

export interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  children,
  title,
  subtitle,
  lastUpdated
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ForgeWeb</span>
            </Link>

            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Warning Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>⚠️ Document provisoire</strong> – Ce texte est fourni uniquement à titre informatif et n'a pas encore été validé par un professionnel du droit.
                </p>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-4">
                Dernière mise à jour : {lastUpdated}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-blue max-w-none">
            {children}
          </div>

          {/* Back to Top */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ↑ Retour en haut
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LegalLayout;
