import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Commencez rapidement avec ForgeWeb',
      icon: '🚀',
      href: '/docs/getting-started',
      topics: ['Installation', 'Premier site', 'Configuration'],
    },
    {
      title: 'Déploiement',
      description: 'Déployez vos sites sur Vercel',
      icon: '🌐',
      href: '/docs/deploy',
      topics: ['Configuration', 'Domaines', 'SSL'],
    },
    {
      title: 'SEO',
      description: 'Optimisez votre référencement',
      icon: '📈',
      href: '/docs/seo',
      topics: ['Meta tags', 'Sitemap', 'Analytics'],
    },
    {
      title: 'Templates',
      description: 'Personnalisez vos templates',
      icon: '🎨',
      href: '/docs/templates',
      topics: ['Styles', 'Couleurs', 'Layouts'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              ForgeWeb
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation ForgeWeb</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir pour créer et déployer des sites web professionnels avec ForgeWeb.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans la documentation..."
              className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start mb-4">
                <div className="text-4xl mr-4">{section.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Liens rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/legal/ai-disclaimer" className="text-blue-600 hover:underline">
              → Avertissement IA
            </Link>
            <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
              → Politique de confidentialité
            </Link>
            <Link href="/legal/terms" className="text-blue-600 hover:underline">
              → Conditions générales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
