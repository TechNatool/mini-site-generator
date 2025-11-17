import type { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique Cookies - ForgeWeb',
  description: 'Politique d\'utilisation des cookies sur ForgeWeb.',
  robots: 'noindex, nofollow',
};

export default function CookiesPolicyPage() {
  return (
    <LegalLayout
      title="Politique Cookies"
      subtitle="Comment nous utilisons les cookies et technologies similaires"
      lastUpdated="17 novembre 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
          <p className="text-gray-700 mb-4">
            Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette)
            lors de votre visite sur <strong>forgeweb.io</strong>. Les cookies permettent de reconnaître
            votre navigateur et de mémoriser certaines informations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types de cookies utilisés</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Cookies essentiels (obligatoires)</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">
              <strong>Ces cookies sont indispensables au fonctionnement du site.</strong>
            </p>
            <p className="text-gray-700 text-sm">
              Ils ne peuvent pas être désactivés car ils permettent des fonctions essentielles
              comme la connexion et la sécurité.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Cookie</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Finalité</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Durée</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">session_id</td>
                  <td className="px-4 py-2">Authentification et session utilisateur</td>
                  <td className="px-4 py-2">Session (navigateur fermé)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">csrf_token</td>
                  <td className="px-4 py-2">Protection contre les attaques CSRF</td>
                  <td className="px-4 py-2">Session</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">consent</td>
                  <td className="px-4 py-2">Mémorisation de vos choix cookies</td>
                  <td className="px-4 py-2">12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Cookies de performance (optionnels)</h3>
          <p className="text-gray-700 mb-4">
            Ces cookies nous aident à comprendre comment les visiteurs utilisent le site.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Cookie</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Finalité</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Durée</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">analytics</td>
                  <td className="px-4 py-2">Statistiques de visite anonymes</td>
                  <td className="px-4 py-2">24 mois</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">performance</td>
                  <td className="px-4 py-2">Mesure de performance du site</td>
                  <td className="px-4 py-2">12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies tiers</h3>
          <p className="text-gray-700 mb-4">
            Certains services tiers peuvent déposer des cookies :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>Stripe :</strong> Pour le traitement des paiements (cookies de session)
            </li>
            <li>
              <strong>Vercel/Netlify :</strong> Pour l'hébergement et la performance (cookies techniques)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Gestion de vos préférences</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Paramètres du navigateur</h3>
          <p className="text-gray-700 mb-4">
            Vous pouvez configurer votre navigateur pour :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Accepter ou refuser tous les cookies</li>
            <li>Vous avertir avant d'accepter un cookie</li>
            <li>Supprimer les cookies déjà stockés</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-2 font-semibold">Instructions par navigateur :</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Chrome :</strong> Paramètres → Confidentialité → Cookies</li>
              <li>• <strong>Firefox :</strong> Options → Vie privée → Cookies</li>
              <li>• <strong>Safari :</strong> Préférences → Confidentialité</li>
              <li>• <strong>Edge :</strong> Paramètres → Cookies et autorisations</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Conséquences du refus</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-gray-700">
              <strong>⚠️ Attention :</strong> Le refus des cookies essentiels empêchera
              le bon fonctionnement du site. Vous ne pourrez pas vous connecter ni utiliser
              les fonctionnalités principales.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Technologies similaires</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Local Storage</h3>
          <p className="text-gray-700 mb-4">
            Nous utilisons le Local Storage du navigateur pour :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Mémoriser vos préférences d'interface</li>
            <li>Stocker temporairement les brouillons</li>
            <li>Améliorer la performance du site</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Session Storage</h3>
          <p className="text-gray-700">
            Utilisé pour stocker des données temporaires pendant votre session (supprimées à la fermeture).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Durée de conservation</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b">Durée maximale</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr className="border-b">
                  <td className="px-4 py-2">Cookies de session</td>
                  <td className="px-4 py-2">Jusqu'à fermeture du navigateur</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Cookies essentiels persistants</td>
                  <td className="px-4 py-2">12 mois</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Cookies de performance</td>
                  <td className="px-4 py-2">24 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Conformité RGPD</h2>
          <p className="text-gray-700 mb-4">
            Conformément au RGPD et à la directive ePrivacy :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Votre consentement est demandé pour les cookies non essentiels</li>
            <li>Vous pouvez retirer votre consentement à tout moment</li>
            <li>Les cookies essentiels sont exemptés de consentement (nécessaires au service)</li>
            <li>Vos préférences sont respectées et mémorisées</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Mises à jour</h2>
          <p className="text-gray-700">
            Cette politique peut être mise à jour pour refléter les changements dans nos pratiques.
            La date de dernière mise à jour est indiquée en haut de cette page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
          <p className="text-gray-700 mb-4">
            Pour toute question sur notre politique cookies :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Email :</strong>{' '}
              <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                support@forgeweb.io
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Liens utiles</h2>
          <ul className="text-gray-700 space-y-2">
            <li>
              • <a href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                Politique de confidentialité
              </a>
            </li>
            <li>
              • <a href="/legal/terms" className="text-blue-600 hover:underline">
                Conditions générales d'utilisation
              </a>
            </li>
            <li>
              • <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                CNIL - Guide Cookies
              </a>
            </li>
          </ul>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-700">
            <strong>📌 Rappel important :</strong> Cette politique cookies est fournie à titre informatif.
            Il est recommandé de faire valider ce document par un professionnel du droit avant
            toute utilisation commerciale.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
