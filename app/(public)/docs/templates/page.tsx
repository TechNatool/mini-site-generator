import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/docs" className="hover:text-blue-600">Documentation</Link> / Templates
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide des Templates</h1>
        <p className="text-xl text-gray-600 mb-8">
          Personnalisez l'apparence de votre site avec nos templates.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>Templates disponibles</h2>
          <p>ForgeWeb propose plusieurs styles de templates pour votre site :</p>

          <h3>🎨 Moderne</h3>
          <p>Design épuré et contemporain avec des espaces aérés. Idéal pour une image professionnelle et innovante.</p>

          <h3>📘 Classique</h3>
          <p>Style traditionnel et sobre qui inspire confiance. Parfait pour les métiers artisanaux traditionnels.</p>

          <h3>🚀 Audacieux</h3>
          <p>Design marquant avec des couleurs vives. Pour se démarquer de la concurrence.</p>

          <h2>Personnaliser les couleurs</h2>
          <p>Vous pouvez personnaliser les couleurs de votre site :</p>
          <ul>
            <li><strong>Couleur primaire</strong> : Utilisée pour les boutons, liens et éléments importants</li>
            <li><strong>Couleur secondaire</strong> : Pour les accents et variantes</li>
            <li><strong>Couleur de fond</strong> : Arrière-plan général du site</li>
          </ul>

          <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
            <p className="text-purple-800 mb-0">
              <strong>💡 Conseil :</strong> Utilisez des couleurs cohérentes avec votre logo et votre identité visuelle existante.
            </p>
          </div>

          <h2>Structure des pages</h2>
          <p>Tous les sites générés incluent 6 pages essentielles :</p>
          <ol>
            <li><strong>Accueil</strong> : Présentation principale</li>
            <li><strong>À propos</strong> : Votre histoire et expertise</li>
            <li><strong>Services</strong> : Détails de vos prestations</li>
            <li><strong>Tarifs</strong> : Grille tarifaire (optionnel)</li>
            <li><strong>Contact</strong> : Formulaire et coordonnées</li>
            <li><strong>Mentions légales</strong> : Conformité légale</li>
          </ol>

          <h2>Modifier un template</h2>
          <p>Pour modifier le HTML/CSS de votre site :</p>
          <ol>
            <li>Téléchargez le ZIP de votre site</li>
            <li>Extrayez les fichiers</li>
            <li>Éditez les fichiers dans le dossier <code>app/</code></li>
            <li>Les styles se trouvent dans <code>styles/globals.css</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
