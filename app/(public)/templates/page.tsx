import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Templates Premium | Mini Site Generator',
  description: 'Découvrez nos templates professionnels optimisés pour votre activité. Design moderne, responsive et personnalisable.',
};

const templates = [
  {
    id: 'default',
    name: 'Classique',
    description: 'Template moderne et polyvalent. Parfait pour tous types d\'activités professionnelles.',
    color: '#0ea5e9',
    category: 'General',
    features: ['Design moderne', 'Responsive mobile', 'Section services', 'Formulaire de contact'],
  },
  {
    id: 'electrician',
    name: 'Électricien',
    description: 'Design professionnel optimisé pour électriciens. Couleurs électriques, icônes techniques.',
    color: '#eab308',
    category: 'Artisan',
    features: ['Thème technique', 'Urgence mise en avant', 'Certifications visibles', 'Portfolio travaux'],
  },
  {
    id: 'plumber',
    name: 'Plombier',
    description: 'Template conçu pour plombiers. Palette bleue aquatique, visuels adaptés.',
    color: '#06b6d4',
    category: 'Artisan',
    features: ['Palette aquatique', 'Services d\'urgence', 'Devis gratuit', 'Zones d\'intervention'],
  },
  {
    id: 'coach',
    name: 'Coach',
    description: 'Design inspirant pour coachs professionnels. Tons motivants, mise en avant des services.',
    color: '#f59e0b',
    category: 'Wellness',
    features: ['Design inspirant', 'Témoignages clients', 'Programmes coaching', 'Réservation en ligne'],
  },
  {
    id: 'psychologist',
    name: 'Psychologue',
    description: 'Template apaisant pour professionnels de la santé mentale. Tons doux, design rassurant.',
    color: '#8b5cf6',
    category: 'Wellness',
    features: ['Tons apaisants', 'Confidentialité', 'Spécialisations', 'Prise de rendez-vous'],
  },
  {
    id: 'lawyer',
    name: 'Avocat',
    description: 'Design sobre et professionnel pour avocats. Tons sérieux, crédibilité maximale.',
    color: '#1e293b',
    category: 'Professional',
    features: ['Design sobre', 'Domaines de droit', 'Honoraires transparents', 'Consultation initiale'],
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Templates Premium
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Des designs professionnels optimisés pour votre activité
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Chaque template est conçu spécifiquement pour votre profession. Design moderne, responsive et prêt à l'emploi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all border-2 border-white"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nos templates ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des templates pensés pour votre activité, avec tout ce dont vous avez besoin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design professionnel</h3>
              <p className="text-gray-600">Créé par des designers pour votre secteur d'activité</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Responsive</h3>
              <p className="text-gray-600">Parfait sur mobile, tablette et ordinateur</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Génération rapide</h3>
              <p className="text-gray-600">Votre site prêt en moins de 2 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tous nos templates
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez le template qui correspond à votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Header with color */}
                <div
                  className="h-32 relative flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${template.color}, ${template.color}dd)`,
                  }}
                >
                  <h3 className="text-3xl font-bold text-white">{template.name}</h3>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 min-h-[3rem]">{template.description}</p>

                  <div className="space-y-2 mb-6">
                    {template.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/auth/signup"
                    className="block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Utiliser ce template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à créer votre site professionnel ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choisissez votre template et générez votre site en quelques minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              Commencer maintenant
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all border-2 border-white"
            >
              Découvrir les fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
