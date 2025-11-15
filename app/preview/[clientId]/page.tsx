import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

interface PageProps {
  params: {
    clientId: string;
  };
}

async function getSiteData(clientId: string) {
  try {
    const sitePath = path.join(process.cwd(), 'app', 'generated', clientId);
    const indexPath = path.join(sitePath, 'index.html');
    const metadataPath = path.join(sitePath, 'metadata.json');

    // Vérifier si le dossier existe
    try {
      await fs.access(sitePath);
    } catch {
      return { error: 'not_found', message: 'Aucun site trouvé avec cet identifiant' };
    }

    // Vérifier si index.html existe
    let htmlContent: string;
    try {
      htmlContent = await fs.readFile(indexPath, 'utf-8');
    } catch {
      return { error: 'incomplete', message: 'Site incomplet - fichier index.html manquant' };
    }

    // Lire les métadonnées (optionnel)
    let metadata = null;
    try {
      const metadataContent = await fs.readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(metadataContent);
    } catch {
      // Métadonnées non trouvées, ce n'est pas grave
    }

    return {
      htmlContent,
      metadata,
      clientId,
    };
  } catch (error) {
    console.error('[Preview] Erreur lors de la récupération du site:', error);
    return { error: 'unknown', message: 'Une erreur est survenue lors du chargement du site' };
  }
}

export default async function PreviewPage({ params }: PageProps) {
  const { clientId } = params;
  const siteData = await getSiteData(clientId);

  // Gestion des erreurs
  if ('error' in siteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {siteData.error === 'not_found'
                  ? 'Site introuvable'
                  : siteData.error === 'incomplete'
                  ? 'Site incomplet'
                  : 'Erreur'}
              </h1>
              <p className="text-gray-600 mb-8">{siteData.message}</p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { htmlContent, metadata } = siteData;
  const zipUrl = `/downloads/${clientId}.zip`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Prévisualisation du site généré
              </h1>
              {metadata && (
                <p className="text-gray-600">
                  Site pour <strong>{metadata.formData.name}</strong> -{' '}
                  <span className="capitalize">{metadata.formData.activity}</span> à{' '}
                  {metadata.formData.city}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                ID: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{clientId}</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <a
            href={zipUrl}
            download
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Télécharger le ZIP
          </a>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Aperçu de votre site</p>
              <p>
                Vous pouvez naviguer dans votre site ci-dessous. Téléchargez le ZIP pour obtenir
                tous les fichiers et déployer votre site sur votre hébergement.
              </p>
            </div>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-gray-700 px-4 py-1 rounded text-xs text-gray-300 font-mono">
                localhost:3000/preview/{clientId}
              </div>
            </div>
          </div>

          <div className="relative" style={{ paddingBottom: '75%' }}>
            <iframe
              srcDoc={htmlContent}
              className="absolute inset-0 w-full h-full border-0"
              title="Prévisualisation du site"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contenu du site généré</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Page d'accueil</p>
                <p className="text-sm text-gray-600">index.html</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">À propos</p>
                <p className="text-sm text-gray-600">about.html</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Services</p>
                <p className="text-sm text-gray-600">services.html</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Tarifs</p>
                <p className="text-sm text-gray-600">pricing.html</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Contact</p>
                <p className="text-sm text-gray-600">contact.html</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Mentions légales</p>
                <p className="text-sm text-gray-600">legal.html</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Fichiers additionnels inclus :</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>sitemap.xml - Plan du site pour les moteurs de recherche</li>
                  <li>robots.txt - Instructions pour les robots d'indexation</li>
                  <li>metadata.json - Informations sur la génération du site</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
