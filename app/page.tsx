import FormGenerator from '@/components/FormGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-heading text-primary-600 mb-2">
              Générateur de Mini-Sites
            </h1>
            <p className="text-lg text-gray-600">
              Créez votre site web professionnel en quelques clics
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Votre site web professionnel prêt en quelques minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Remplissez le formulaire ci-dessous et notre IA générera automatiquement un site web
              complet et optimisé pour votre activité.
            </p>
          </div>

          {/* Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapide</h3>
              <p className="text-gray-600">Génération en quelques minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent</h3>
              <p className="text-gray-600">Contenu généré par IA</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personnalisable</h3>
              <p className="text-gray-600">Adapté à votre activité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-8 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left column - Company info */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-2">ForgeWeb</h3>
              <p className="text-sm">
                Générateur de Mini-Sites. Propulsé par Claude AI.
              </p>
            </div>

            {/* Right column - Legal links */}
            <div className="text-center md:text-right">
              <h3 className="text-white font-semibold mb-2">Informations légales</h3>
              <div className="flex flex-col space-y-1 text-sm">
                <a href="/legal/privacy-policy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
                <a href="/legal/terms" className="hover:text-white transition-colors">
                  Conditions générales
                </a>
                <a href="/legal/cookies" className="hover:text-white transition-colors">
                  Politique cookies
                </a>
                <a href="/legal/refund-policy" className="hover:text-white transition-colors">
                  Politique de remboursement
                </a>
                <a href="/legal/ai-disclaimer" className="hover:text-white transition-colors">
                  Avertissement IA
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ForgeWeb. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
