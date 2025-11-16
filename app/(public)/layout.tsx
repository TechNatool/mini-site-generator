import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mini Site Generator - Créez des sites web professionnels avec l\'IA',
  description: 'Générateur de sites web intelligent pour artisans et PME. Contenu IA, images générées, SEO optimisé, déploiement automatique. Créez votre site en 5 minutes.',
  keywords: ['générateur de site web', 'IA', 'Claude AI', 'site web artisan', 'SEO', 'déploiement automatique', 'site web PME'],
  authors: [{ name: 'Mini Site Generator' }],
  creator: 'Mini Site Generator',
  publisher: 'Mini Site Generator',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mini-site-generator.com',
    siteName: 'Mini Site Generator',
    title: 'Mini Site Generator - Créez des sites web professionnels avec l\'IA',
    description: 'Générateur de sites web intelligent pour artisans et PME. Contenu IA, SEO optimisé, déploiement automatique.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mini Site Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mini Site Generator - Créez des sites web professionnels avec l\'IA',
    description: 'Générateur de sites web intelligent pour artisans et PME. Contenu IA, SEO optimisé, déploiement automatique.',
    images: ['/twitter-image.png'],
    creator: '@minisitegen',
  },
  alternates: {
    canonical: 'https://mini-site-generator.com',
  },
  other: {
    'google-site-verification': 'your-verification-code-here',
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Mini Site Generator</span>
              </Link>
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Fonctionnalités
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Tarifs
              </Link>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                FAQ
              </a>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/login"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Connexion
              </Link>
              <Link
                href="/dashboard/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
