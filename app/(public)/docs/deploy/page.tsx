import Link from 'next/link';

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/docs" className="hover:text-blue-600">Documentation</Link> / Déploiement
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide de déploiement</h1>
        <p className="text-xl text-gray-600 mb-8">
          Déployez votre site sur Vercel en quelques clics.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>Déploiement automatique sur Vercel</h2>
          <p>ForgeWeb propose un déploiement automatique sur Vercel, la plateforme de référence pour Next.js.</p>

          <h3>Option 1 : Déploiement en un clic</h3>
          <ol>
            <li>Après la génération de votre site, cliquez sur "Déployer sur Vercel"</li>
            <li>Connectez votre compte Vercel (ou créez-en un gratuitement)</li>
            <li>Confirmez le déploiement</li>
            <li>Votre site sera en ligne en quelques secondes !</li>
          </ol>

          <div className="bg-green-50 border-l-4 border-green-600 p-4">
            <p className="text-green-800 mb-0">
              <strong>✅ Inclus :</strong> HTTPS gratuit, CDN mondial, performances optimales
            </p>
          </div>

          <h3>Option 2 : Déploiement manuel</h3>
          <ol>
            <li>Téléchargez le fichier ZIP de votre site</li>
            <li>Extrayez les fichiers</li>
            <li>Initialisez un dépôt Git : <code>git init</code></li>
            <li>Connectez à Vercel via CLI : <code>vercel</code></li>
          </ol>

          <h2>Configurer un domaine personnalisé</h2>
          <p>Une fois déployé, vous pouvez ajouter votre propre nom de domaine :</p>
          <ol>
            <li>Accédez aux paramètres de votre projet Vercel</li>
            <li>Allez dans l'onglet "Domains"</li>
            <li>Ajoutez votre domaine (ex: www.mon-entreprise.fr)</li>
            <li>Configurez vos DNS selon les instructions Vercel</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
