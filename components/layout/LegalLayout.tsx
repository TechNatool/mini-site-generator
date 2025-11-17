import React from 'react';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function LegalLayout({ children, title, subtitle }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <a href="/" className="text-2xl font-bold font-heading text-primary-600 hover:text-primary-700 transition-colors">
              ForgeWeb
            </a>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-semibold mb-3">ForgeWeb</h3>
              <p className="text-sm text-gray-400">
                Générateur de sites web professionnels pour artisans
              </p>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-3">Informations légales</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/legal/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                    Conditions générales
                  </a>
                </li>
                <li>
                  <a href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors">
                    Politique cookies
                  </a>
                </li>
                <li>
                  <a href="/legal/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                    Politique de remboursement
                  </a>
                </li>
                <li>
                  <a href="/legal/ai-disclaimer" className="text-gray-400 hover:text-white transition-colors">
                    Avertissement IA
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-400">
                <a href="/" className="hover:text-white transition-colors">
                  Retour à l'accueil
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ForgeWeb. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
