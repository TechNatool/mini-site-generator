import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/docs" className="hover:text-blue-600">Documentation</Link> / Getting Started
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide de démarrage</h1>
        <p className="text-xl text-gray-600 mb-8">
          Créez votre premier site web professionnel en quelques minutes avec ForgeWeb.
        </p>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Créer un compte</h2>
          <p className="text-gray-700 mb-6">
            Commencez par créer gratuitement votre compte ForgeWeb. Vous recevrez un email de bienvenue avec toutes les informations nécessaires pour démarrer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Compléter l'onboarding</h2>
          <p className="text-gray-700 mb-4">
            Notre processus d'onboarding en 4 étapes vous guide à travers :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Le choix de votre activité professionnelle</li>
            <li>La sélection d'un template de design</li>
            <li>Le choix du ton de l'IA pour votre contenu</li>
            <li>La définition de vos objectifs</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Générer votre premier site</h2>
          <p className="text-gray-700 mb-4">
            Remplissez le formulaire de génération avec vos informations :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Nom de votre entreprise</li>
            <li>Services proposés</li>
            <li>Coordonnées de contact</li>
            <li>Zone géographique</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-800 font-medium">
              💡 <strong>Conseil :</strong> Plus vous fournissez d'informations détaillées, plus l'IA pourra générer un contenu pertinent et personnalisé.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prévisualiser et télécharger</h2>
          <p className="text-gray-700 mb-6">
            Une fois la génération terminée (environ 30 secondes), vous pouvez :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Prévisualiser votre site directement dans le navigateur</li>
            <li>Télécharger le fichier ZIP complet</li>
            <li>Déployer automatiquement sur Vercel</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Personnaliser votre site</h2>
          <p className="text-gray-700 mb-4">
            Avant de publier votre site, n'oubliez pas de :
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Vérifier le contenu généré</strong> par l'IA (voir notre <Link href="/legal/ai-disclaimer" className="text-blue-600 hover:underline">Avertissement IA</Link>)</li>
            <li><strong>Modifier les textes</strong> pour les adapter à votre activité</li>
            <li><strong>Personnaliser les couleurs</strong> selon votre charte graphique</li>
            <li><strong>Ajouter vos propres images</strong> (recommandé)</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
            <p className="text-yellow-800 font-medium">
              ⚠️ <strong>Important :</strong> Le contenu généré par l'IA est un point de départ. Vous devez le vérifier et l'adapter avant publication. Consultez notre documentation sur la <Link href="/docs/seo" className="text-blue-600 hover:underline">personnalisation</Link>.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prochaines étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <Link
              href="/docs/deploy"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">📦 Déployer votre site</h3>
              <p className="text-sm text-gray-600">Mettez votre site en ligne sur Vercel</p>
            </Link>

            <Link
              href="/docs/seo"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-2">📈 Optimiser le SEO</h3>
              <p className="text-sm text-gray-600">Améliorez votre référencement</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
