import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Propulsé par Claude AI
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Créez des sites web professionnels
            <span className="block text-blue-200 mt-2">
              en quelques clics avec l'IA
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-blue-100 mb-10">
            Générateur de sites web intelligent pour artisans et PME.
            Contenu IA, SEO optimisé, déploiement automatique.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Créer un compte gratuit
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-500/30 transition-all border border-white/20"
            >
              Voir la démo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-blue-200 text-sm mt-1">Modules IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-200 text-sm mt-1">Automatisé</div>
            </div>
            <div>
              <div className="text-3xl font-bold">&lt;5min</div>
              <div className="text-blue-200 text-sm mt-1">Par site</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-white" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
          <path d="M0 22L60 16.7C120 11 240 1 360 0.333333C480 1 600 11 720 16.7C840 22 960 22 1080 18.3C1200 15 1320 7 1380 3.66667L1440 0V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" />
        </svg>
      </div>
    </div>
  );
}
