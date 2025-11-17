import { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de Cookies - ForgeWeb',
  description: 'Politique d\'utilisation des cookies et technologies similaires',
  robots: 'noindex, nofollow',
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Politique de Cookies"
      subtitle="Utilisation des cookies et technologies similaires"
    >
      <div className="prose prose-gray max-w-none">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 font-medium">
                ⚠️ <strong>Document provisoire</strong> – Ce texte est fourni uniquement à titre informatif et n&apos;a pas encore été validé par un professionnel du droit.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="mb-4">
            Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et préférences (comme la langue, la taille de police, etc.) pendant une période donnée.
          </p>
          <p className="mb-4">
            <strong>{'{COMPANY_NAME}'}</strong> (ForgeWeb), accessible sur <strong>{'{DOMAIN}'}</strong> (forgeweb.io), utilise des cookies et technologies similaires pour améliorer votre expérience et analyser l&apos;utilisation du Service.
          </p>
        </section>

        {/* Types de cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types de cookies utilisés</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Cookies strictement nécessaires</h3>
          <p className="mb-4">
            Ces cookies sont essentiels au fonctionnement du site. Ils permettent des fonctionnalités de base comme la navigation entre les pages et l&apos;accès aux zones sécurisées. Le site ne peut pas fonctionner correctement sans ces cookies.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>Exemples :</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Session ID :</strong> Maintient votre session active</li>
              <li><strong>CSRF Token :</strong> Protection contre les attaques CSRF</li>
              <li><strong>Préférences de cookies :</strong> Mémorise vos choix de consentement</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600"><strong>Durée :</strong> Session (supprimés à la fermeture du navigateur) ou 1 an</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Cookies de performance et d&apos;analyse</h3>
          <p className="mb-4">
            Ces cookies collectent des informations sur la manière dont vous utilisez le site (pages visitées, temps passé, erreurs rencontrées). Ces données sont agrégées et anonymes, et nous aident à améliorer le Service.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>Exemples :</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics :</strong> Analyse du trafic et comportement utilisateur</li>
              <li><strong>Plausible Analytics :</strong> Alternative respectueuse de la vie privée (si utilisé)</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600"><strong>Durée :</strong> 1 à 24 mois</p>
            <p className="mt-2 text-sm text-gray-600"><strong>Consentement requis :</strong> Oui (RGPD)</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Cookies fonctionnels</h3>
          <p className="mb-4">
            Ces cookies permettent au site de mémoriser vos choix (langue, région, personnalisation) pour offrir une expérience plus personnalisée.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>Exemples :</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Langue :</strong> Mémorise votre langue préférée</li>
              <li><strong>Thème :</strong> Mode sombre/clair (si applicable)</li>
              <li><strong>Préférences UI :</strong> Taille de texte, affichage</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600"><strong>Durée :</strong> 6 à 12 mois</p>
            <p className="mt-2 text-sm text-gray-600"><strong>Consentement requis :</strong> Recommandé</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Cookies publicitaires et de ciblage</h3>
          <p className="mb-4">
            <strong>Actuellement NON utilisés sur ForgeWeb.</strong> Si nous décidons de les utiliser à l&apos;avenir, nous mettrons à jour cette politique et demanderons votre consentement explicite.
          </p>
        </section>

        {/* Cookies tiers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies tiers</h2>
          <p className="mb-4">
            Nous utilisons des services tiers qui peuvent déposer leurs propres cookies :
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Google Analytics (si activé)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Finalité :</strong> Analyse du trafic et du comportement utilisateur</li>
                <li><strong>Cookies :</strong> _ga, _gid, _gat</li>
                <li><strong>Durée :</strong> 1 à 24 mois</li>
                <li><strong>Politique :</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Privacy Policy</a></li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Vercel Analytics (si activé)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Finalité :</strong> Performances et vitesse du site</li>
                <li><strong>Cookies :</strong> __vercel_analytics_*</li>
                <li><strong>Durée :</strong> Session à 1 an</li>
                <li><strong>Politique :</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Vercel Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            <strong className="text-red-600">AVERTISSEMENT :</strong> Ces services tiers sont soumis à leurs propres politiques de confidentialité. Nous n&apos;avons aucun contrôle sur leurs cookies et vous encourageons à consulter leurs politiques.
          </p>
        </section>

        {/* Technologies similaires */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Technologies similaires aux cookies</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Local Storage / Session Storage</h3>
          <p className="mb-4">
            Nous utilisons le stockage local du navigateur pour :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Mémoriser vos préférences de personnalisation</li>
            <li>Stocker temporairement les données de formulaire</li>
            <li>Améliorer les performances (cache local)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Pixels invisibles (Web Beacons)</h3>
          <p className="mb-4">
            Actuellement non utilisés. Si nous les utilisons à l&apos;avenir, cette politique sera mise à jour.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Fingerprinting</h3>
          <p className="mb-4">
            <strong>Nous n&apos;utilisons PAS de techniques de fingerprinting</strong> pour identifier les utilisateurs de manière unique.
          </p>
        </section>

        {/* Gestion des cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Gérer vos préférences de cookies</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Bannière de consentement</h3>
          <p className="mb-4">
            Lors de votre première visite, une bannière vous demande votre consentement pour les cookies non essentiels. Vous pouvez accepter ou refuser.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Paramètres du navigateur</h3>
          <p className="mb-4">
            Vous pouvez gérer ou supprimer les cookies via les paramètres de votre navigateur :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
            <li><strong>Firefox :</strong> Paramètres &gt; Vie privée et sécurité &gt; Cookies</li>
            <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies</li>
            <li><strong>Edge :</strong> Paramètres &gt; Confidentialité &gt; Cookies</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Outils de désactivation tiers</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Google Analytics :</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Module complémentaire de désactivation</a></li>
            <li><strong>Do Not Track :</strong> Activez l&apos;option &quot;Ne pas suivre&quot; dans votre navigateur</li>
          </ul>

          <p className="mb-4">
            <strong className="text-red-600">IMPORTANT :</strong> Bloquer ou supprimer les cookies peut affecter le fonctionnement du site et limiter certaines fonctionnalités.
          </p>
        </section>

        {/* Durée de conservation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de conservation des cookies</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4">Type de cookie</th>
                  <th className="text-left py-2 pr-4">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Cookies de session</td>
                  <td className="py-2">Supprimés à la fermeture du navigateur</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Cookies persistants</td>
                  <td className="py-2">1 mois à 24 mois selon le type</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Consentement cookies</td>
                  <td className="py-2">12 mois</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Analytics (Google)</td>
                  <td className="py-2">24 mois maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* RGPD */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conformité RGPD</h2>
          <p className="mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD) :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nous demandons votre <strong>consentement explicite</strong> avant de déposer des cookies non essentiels</li>
            <li>Vous pouvez <strong>retirer votre consentement</strong> à tout moment</li>
            <li>Les cookies essentiels ne nécessitent pas de consentement (base légale : intérêt légitime)</li>
            <li>Nous conservons la preuve de votre consentement pendant 3 ans</li>
            <li>Vous avez le droit d&apos;<strong>accéder, modifier ou supprimer</strong> vos données de cookies</li>
          </ul>
        </section>

        {/* Mise à jour */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications de cette politique</h2>
          <p className="mb-4">
            Nous pouvons mettre à jour cette politique de cookies périodiquement pour refléter les changements dans nos pratiques ou pour d&apos;autres raisons opérationnelles, légales ou réglementaires.
          </p>
          <p className="mb-4">
            La date de &quot;Dernière mise à jour&quot; en haut de cette page indique quand cette politique a été modifiée pour la dernière fois. Toute modification entre en vigueur dès sa publication.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant notre utilisation des cookies, contactez-nous :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>ForgeWeb</strong></p>
            <p className="mb-2">Email : <a href="mailto:privacy@forgeweb.io" className="text-primary-600 hover:underline">privacy@forgeweb.io</a></p>
            <p className="mb-2">Site web : <a href="https://forgeweb.io" className="text-primary-600 hover:underline">https://forgeweb.io</a></p>
          </div>
        </section>

        {/* Plus d'informations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. En savoir plus</h2>
          <p className="mb-4">
            Pour en savoir plus sur les cookies et la protection de votre vie privée en ligne :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">CNIL - Cookies et traceurs</a></li>
            <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">All About Cookies</a></li>
            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Your Online Choices (EU)</a></li>
          </ul>
        </section>

        {/* Disclaimer final */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">
                <strong>AVERTISSEMENT LÉGAL :</strong> Ce document est un modèle générique et ne constitue pas un avis juridique. Il DOIT être revu et adapté par un professionnel du droit avant toute utilisation commerciale. Assurez-vous d&apos;implémenter réellement une bannière de consentement conforme au RGPD avant de lancer votre service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
