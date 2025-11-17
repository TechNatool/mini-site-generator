import Link from 'next/link';

export default function SEOPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/docs" className="hover:text-blue-600">Documentation</Link> / SEO
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Optimisation SEO</h1>
        <p className="text-xl text-gray-600 mb-8">
          Améliorez votre référencement pour attirer plus de clients.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>SEO intégré par défaut</h2>
          <p>Tous les sites générés par ForgeWeb incluent déjà les optimisations SEO de base :</p>
          <ul>
            <li><strong>Meta tags optimisés</strong> : Titre, description, Open Graph</li>
            <li><strong>Structured Data</strong> : Schema.org pour LocalBusiness</li>
            <li><strong>Sitemap.xml</strong> : Indexation facilitée par Google</li>
            <li><strong>Responsive design</strong> : Compatible mobile (critère Google)</li>
            <li><strong>Performances</strong> : Chargement rapide optimisé</li>
          </ul>

          <h2>Améliorer votre référencement local</h2>
          <h3>1. Google My Business</h3>
          <p>Créez une fiche Google My Business pour apparaître dans Google Maps et les recherches locales.</p>

          <h3>2. Mots-clés locaux</h3>
          <p>Incluez votre ville et zone géographique dans vos contenus. Exemple : "plombier Paris 15e".</p>

          <h3>3. Avis clients</h3>
          <p>Les avis positifs améliorent significativement votre classement local. Encouragez vos clients satisfaits à laisser un avis.</p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <p className="text-blue-800 mb-0">
              <strong>💡 Astuce :</strong> Ajoutez votre adresse complète, numéro de téléphone et horaires d'ouverture sur votre site. Google valorise ces informations.
            </p>
          </div>

          <h2>Analytics et suivi</h2>
          <p>Installez Google Analytics pour suivre :</p>
          <ul>
            <li>Nombre de visiteurs</li>
            <li>Pages les plus consultées</li>
            <li>Sources de trafic</li>
            <li>Taux de conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
