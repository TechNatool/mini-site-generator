import type { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - ForgeWeb',
  description: 'Conditions générales d\'utilisation du service ForgeWeb.',
  robots: 'noindex, nofollow',
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Conditions Générales d'Utilisation"
      subtitle="Règles d'utilisation du service ForgeWeb"
      lastUpdated="17 novembre 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
          <p className="text-gray-700 mb-4">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du service
            <strong> ForgeWeb</strong>, accessible à l'adresse <strong>forgeweb.io</strong>, permettant
            la génération automatique de sites web professionnels via intelligence artificielle.
          </p>
          <p className="text-gray-700">
            En utilisant ForgeWeb, vous acceptez sans réserve les présentes CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Définitions</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>"Service" :</strong> La plateforme ForgeWeb et tous ses modules</li>
            <li><strong>"Utilisateur" :</strong> Toute personne utilisant le Service</li>
            <li><strong>"Compte" :</strong> Espace personnel de l'Utilisateur</li>
            <li><strong>"Site généré" :</strong> Site web créé par le Service pour l'Utilisateur</li>
            <li><strong>"Contenu" :</strong> Textes, images, données fournis par l'Utilisateur ou générés par l'IA</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription et compte</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Création de compte</h3>
          <p className="text-gray-700 mb-4">
            Pour utiliser le Service, vous devez :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Avoir au moins 18 ans ou l'âge de la majorité légale dans votre juridiction</li>
            <li>Fournir des informations exactes et à jour</li>
            <li>Choisir un mot de passe sécurisé</li>
            <li>Ne pas usurper l'identité d'une autre personne</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Responsabilité du compte</h3>
          <p className="text-gray-700 mb-4">
            Vous êtes seul responsable :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>De la confidentialité de vos identifiants</li>
            <li>De toutes les activités effectuées depuis votre compte</li>
            <li>De signaler immédiatement toute utilisation non autorisée</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Description du service</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Fonctionnalités</h3>
          <p className="text-gray-700 mb-4">
            ForgeWeb propose :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Génération automatique de sites web via IA (Claude)</li>
            <li>Création de contenu SEO optimisé</li>
            <li>Génération d'images (selon plan)</li>
            <li>Déploiement automatique sur Vercel/Netlify</li>
            <li>Gestion de plusieurs sites (selon plan)</li>
            <li>Dashboard de gestion</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Disponibilité</h3>
          <p className="text-gray-700 mb-4">
            <strong>⚠️ Aucune garantie de disponibilité 100%</strong>
          </p>
          <p className="text-gray-700">
            Nous nous efforçons de maintenir le Service disponible 24h/24 et 7j/7, mais ne garantissons
            pas une disponibilité ininterrompue. Le Service peut être temporairement indisponible pour
            maintenance, mises à jour ou raisons techniques indépendantes de notre volonté.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Plans et tarifs</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Plans disponibles</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="text-gray-700 space-y-2">
              <li><strong>Starter :</strong> 10 sites, fonctionnalités de base</li>
              <li><strong>Pro :</strong> 50 sites, SEO Boost, support prioritaire</li>
              <li><strong>Business :</strong> Sites illimités, IA images, déploiement auto</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Paiement</h3>
          <p className="text-gray-700 mb-4">
            Les paiements sont traités par <strong>Stripe</strong>. Les prix affichés sont HT.
            La TVA applicable sera ajoutée selon votre localisation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Modification des tarifs</h3>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier nos tarifs à tout moment. Les changements
            s'appliquent aux nouveaux abonnements. Les abonnements en cours conservent leurs
            conditions jusqu'au renouvellement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Utilisation acceptable</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Usages autorisés</h3>
          <p className="text-gray-700 mb-4">
            Vous pouvez utiliser ForgeWeb pour :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Créer des sites web pour votre entreprise ou vos clients</li>
            <li>Générer du contenu professionnel légal</li>
            <li>Utiliser les sites générés à des fins commerciales</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Usages interdits</h3>
          <p className="text-gray-700 mb-4">
            <strong>⚠️ Il est strictement interdit de :</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Générer du contenu illégal, diffamatoire, haineux ou pornographique</li>
            <li>Usurper l'identité d'une personne ou entité</li>
            <li>Violer des droits de propriété intellectuelle</li>
            <li>Tenter de pirater ou compromettre le Service</li>
            <li>Utiliser le Service pour du spam ou phishing</li>
            <li>Revendre ou redistribuer le Service sans autorisation</li>
            <li>Créer des sites en violation des lois applicables</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété intellectuelle</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Propriété du Service</h3>
          <p className="text-gray-700 mb-4">
            ForgeWeb, son code source, son design, ses templates et sa documentation sont la propriété
            exclusive de ForgeWeb et protégés par les lois sur la propriété intellectuelle.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Sites générés</h3>
          <p className="text-gray-700 mb-4">
            <strong>Vous conservez tous les droits sur les sites générés.</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Vous pouvez :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Utiliser, modifier et personnaliser les sites générés</li>
            <li>Les utiliser à des fins commerciales</li>
            <li>Les revendre à vos clients</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Contenu généré par IA</h3>
          <p className="text-gray-700">
            <strong>⚠️ Important :</strong> Le contenu généré par l'IA Claude est créé automatiquement.
            Bien que nous nous efforcions de produire du contenu original, vous devez vérifier qu'il
            ne viole pas de droits de tiers avant publication. Voir notre{' '}
            <a href="/legal/ai-disclaimer" className="text-blue-600 hover:underline">
              Avertissement IA
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Responsabilités et garanties</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Limitation de responsabilité</h3>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-gray-700">
              <strong>⚠️ CLAUSE IMPORTANTE :</strong>
            </p>
            <p className="text-gray-700 mt-2">
              Le Service est fourni "EN L'ÉTAT" et "SELON DISPONIBILITÉ" sans aucune garantie,
              expresse ou implicite. ForgeWeb ne garantit pas que :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>Le Service sera exempt d'erreurs ou d'interruptions</li>
              <li>Le contenu généré par IA sera toujours correct ou adapté</li>
              <li>Les sites générés fonctionneront parfaitement sur tous les navigateurs</li>
              <li>Les déploiements automatiques réussiront à chaque fois</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Responsabilité de l'Utilisateur</h3>
          <p className="text-gray-700 mb-4">
            Vous êtes seul responsable :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Du contenu que vous fournissez au Service</li>
            <li>De la vérification du contenu généré par l'IA</li>
            <li>De la conformité de vos sites aux lois applicables</li>
            <li>Des dommages causés par l'utilisation de vos sites</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">8.3 Indemnisation</h3>
          <p className="text-gray-700">
            Vous vous engagez à indemniser ForgeWeb contre toute réclamation, perte ou dommage
            résultant de votre utilisation du Service ou violation des présentes CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Résiliation</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Par l'Utilisateur</h3>
          <p className="text-gray-700 mb-4">
            Vous pouvez résilier votre compte à tout moment depuis votre dashboard.
            Aucun remboursement ne sera effectué pour la période déjà payée (sauf exceptions
            légales). Voir notre{' '}
            <a href="/legal/refund-policy" className="text-blue-600 hover:underline">
              politique de remboursement
            </a>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Par ForgeWeb</h3>
          <p className="text-gray-700 mb-4">
            Nous nous réservons le droit de suspendre ou résilier votre compte en cas de :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Violation des présentes CGU</li>
            <li>Non-paiement</li>
            <li>Activité frauduleuse ou illégale</li>
            <li>Abus du Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Données personnelles</h2>
          <p className="text-gray-700">
            Le traitement de vos données personnelles est décrit dans notre{' '}
            <a href="/legal/privacy-policy" className="text-blue-600 hover:underline">
              Politique de Confidentialité
            </a>, qui fait partie intégrante des présentes CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications des CGU</h2>
          <p className="text-gray-700">
            Nous pouvons modifier les présentes CGU à tout moment. Les modifications importantes
            vous seront notifiées par email. Votre utilisation continue du Service après notification
            vaut acceptation des nouvelles CGU.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Droit applicable et juridiction</h2>
          <p className="text-gray-700 mb-4">
            Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la
            compétence exclusive des tribunaux français.
          </p>
          <p className="text-gray-700">
            Conformément à la réglementation européenne, vous disposez également du droit de
            recourir à une procédure de médiation de la consommation ou à tout autre mode alternatif
            de règlement des litiges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
          <p className="text-gray-700 mb-4">
            Pour toute question concernant ces CGU :
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

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-700">
            <strong>📌 Rappel important :</strong> Ces CGU sont fournies à titre informatif.
            Il est fortement recommandé de faire valider ce document par un professionnel
            du droit avant toute utilisation commerciale.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
