import { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - ForgeWeb',
  description: 'Conditions générales d\'utilisation du service ForgeWeb',
  robots: 'noindex, nofollow',
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Conditions Générales d'Utilisation"
      subtitle="Règles d'utilisation du service ForgeWeb"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
          <p className="mb-4">
            Les présentes Conditions Générales d&apos;Utilisation (&quot;CGU&quot;) régissent l&apos;accès et l&apos;utilisation du service <strong>{'{COMPANY_NAME}'}</strong> (ForgeWeb) accessible sur <strong>{'{DOMAIN}'}</strong> (forgeweb.io).
          </p>
          <p className="mb-4">
            En accédant ou en utilisant le Service, vous acceptez d&apos;être lié par ces CGU. Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser le Service.
          </p>
          <p className="mb-4">
            <strong className="text-red-600">IMPORTANT :</strong> Ces CGU doivent être revues par un professionnel du droit avant toute utilisation commerciale.
          </p>
        </section>

        {/* Description du service */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description du service</h2>
          <p className="mb-4">
            ForgeWeb est un service de génération automatique de sites web pour artisans et professionnels, utilisant l&apos;intelligence artificielle.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Fonctionnalités</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Génération automatique de sites web personnalisés</li>
            <li>Création de contenu par IA (textes, structures, méta-données)</li>
            <li>Export des sites générés (fichiers ZIP)</li>
            <li>Personnalisation des couleurs et styles</li>
            <li>Optimisation SEO de base</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Limitations</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Le Service est fourni &quot;en l&apos;état&quot; sans garantie de disponibilité 24/7</li>
            <li>Les sites générés sont des modèles de base nécessitant révision et personnalisation</li>
            <li>Nous ne garantissons pas la qualité, l&apos;exactitude ou la pertinence du contenu généré par l&apos;IA</li>
            <li>Le Service peut être modifié ou interrompu à tout moment</li>
          </ul>
        </section>

        {/* Compte utilisateur */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compte utilisateur</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Inscription</h3>
          <p className="mb-4">
            Pour utiliser certaines fonctionnalités du Service, vous devrez peut-être créer un compte. Vous vous engagez à :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fournir des informations exactes, complètes et à jour</li>
            <li>Maintenir la sécurité de votre mot de passe</li>
            <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
            <li>Être responsable de toutes les activités effectuées depuis votre compte</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Éligibilité</h3>
          <p className="mb-4">
            Vous devez avoir au moins 18 ans pour utiliser ce Service. En créant un compte, vous déclarez et garantissez avoir au moins 18 ans.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Suspension et résiliation</h3>
          <p className="mb-4">
            Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment, avec ou sans motif, notamment en cas de :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violation de ces CGU</li>
            <li>Activité frauduleuse ou illégale</li>
            <li>Usage abusif du Service</li>
            <li>Non-paiement (pour les services payants)</li>
          </ul>
        </section>

        {/* Utilisation acceptable */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Utilisation acceptable</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Usages autorisés</h3>
          <p className="mb-4">
            Vous pouvez utiliser le Service uniquement à des fins légales et conformément à ces CGU.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Usages interdits</h3>
          <p className="mb-4">Vous vous engagez à NE PAS :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violer des lois ou règlements applicables</li>
            <li>Porter atteinte aux droits d&apos;autrui (propriété intellectuelle, vie privée, etc.)</li>
            <li>Publier du contenu illégal, diffamatoire, obscène, haineux ou discriminatoire</li>
            <li>Tenter de contourner les mesures de sécurité du Service</li>
            <li>Utiliser le Service pour envoyer du spam ou du contenu non sollicité</li>
            <li>Collecter des données d&apos;autres utilisateurs sans leur consentement</li>
            <li>Utiliser des robots, scrapers ou autres outils automatisés sans autorisation</li>
            <li>Surcharger ou perturber l&apos;infrastructure du Service</li>
            <li>Revendre ou redistribuer le Service sans autorisation écrite</li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propriété intellectuelle</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Droits de ForgeWeb</h3>
          <p className="mb-4">
            Le Service, y compris son code source, sa conception, ses logos, et tous les éléments qui le composent, sont la propriété de ForgeWeb ou de ses concédants et sont protégés par les lois sur la propriété intellectuelle.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Contenu généré</h3>
          <p className="mb-4">
            <strong>Vous conservez tous les droits sur les sites web générés par le Service.</strong> Toutefois :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Vous accordez à ForgeWeb une licence mondiale, non exclusive, pour héberger, copier et afficher votre contenu dans le cadre de la fourniture du Service</li>
            <li>Vous êtes responsable du contenu que vous générez et devez vous assurer qu&apos;il respecte les droits de tiers</li>
            <li>ForgeWeb ne revendique aucun droit de propriété sur le contenu généré spécifiquement pour vous</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Contenu généré par IA</h3>
          <p className="mb-4">
            <strong className="text-red-600">AVERTISSEMENT :</strong> Le contenu généré par l&apos;IA peut, dans de rares cas, ressembler à du contenu existant protégé par des droits d&apos;auteur. Vous êtes responsable de vérifier et de modifier tout contenu avant publication. Consultez notre <a href="/legal/ai-disclaimer" className="text-primary-600 hover:underline">Avertissement IA</a> pour plus de détails.
          </p>
        </section>

        {/* Paiement et remboursement */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Paiement et remboursement</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Tarification</h3>
          <p className="mb-4">
            Certaines fonctionnalités du Service peuvent être payantes. Les prix sont affichés en euros (EUR) TTC et peuvent être modifiés à tout moment. Tout changement de prix sera communiqué avec un préavis de 30 jours minimum.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Paiements</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Les paiements sont traités de manière sécurisée par des prestataires tiers</li>
            <li>Vous vous engagez à fournir des informations de paiement exactes et valides</li>
            <li>Tous les paiements sont finaux sauf disposition contraire de notre <a href="/legal/refund-policy" className="text-primary-600 hover:underline">Politique de remboursement</a></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Remboursement</h3>
          <p className="mb-4">
            Consultez notre <a href="/legal/refund-policy" className="text-primary-600 hover:underline">Politique de remboursement</a> pour les conditions détaillées.
          </p>
        </section>

        {/* Limitation de responsabilité */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation de responsabilité</h2>
          <p className="mb-4">
            <strong className="text-red-600">DISCLAIMER IMPORTANT :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Le Service est fourni &quot;EN L&apos;ÉTAT&quot; et &quot;SELON DISPONIBILITÉ&quot; sans garantie d&apos;aucune sorte</li>
            <li>Nous ne garantissons pas que le Service sera ininterrompu, sécurisé ou exempt d&apos;erreurs</li>
            <li>Nous ne sommes pas responsables du contenu généré par l&apos;IA ou de son utilisation</li>
            <li>Nous ne garantissons pas que les sites générés respectent toutes les réglementations locales</li>
            <li>DANS LA MESURE MAXIMALE PERMISE PAR LA LOI, ForgeWeb N&apos;ASSUMERA AUCUNE RESPONSABILITÉ POUR :
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>Pertes de profits, revenus, données ou opportunités commerciales</li>
                <li>Dommages indirects, accessoires, spéciaux ou consécutifs</li>
                <li>Tout dommage résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le Service</li>
              </ul>
            </li>
          </ul>
          <p className="mb-4">
            Notre responsabilité totale envers vous pour toutes réclamations ne dépassera pas le montant que vous avez payé au cours des 12 derniers mois, ou 100 EUR si vous n&apos;avez effectué aucun paiement.
          </p>
        </section>

        {/* Indemnisation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnisation</h2>
          <p className="mb-4">
            Vous acceptez d&apos;indemniser, de défendre et de dégager de toute responsabilité ForgeWeb, ses dirigeants, employés et partenaires contre toute réclamation, perte, responsabilité et dépense (y compris les honoraires d&apos;avocat) résultant de :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Votre utilisation du Service</li>
            <li>Votre violation de ces CGU</li>
            <li>Votre violation des droits de tiers</li>
            <li>Le contenu que vous générez ou publiez</li>
          </ul>
        </section>

        {/* Données personnelles */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Protection des données personnelles</h2>
          <p className="mb-4">
            L&apos;utilisation de vos données personnelles est régie par notre <a href="/legal/privacy-policy" className="text-primary-600 hover:underline">Politique de confidentialité</a>. En utilisant le Service, vous acceptez cette politique.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications des CGU</h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Votre utilisation continue du Service après la publication des modifications constitue votre acceptation des nouvelles CGU.
          </p>
          <p className="mb-4">
            Les modifications substantielles seront notifiées par email (si vous avez fourni une adresse) ou via une notification sur le Service au moins 15 jours avant leur entrée en vigueur.
          </p>
        </section>

        {/* Droit applicable */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Droit applicable et juridiction</h2>
          <p className="mb-4">
            <strong className="text-red-600">À DÉFINIR :</strong> Ces CGU sont régies par les lois de [PAYS/JURIDICTION À DÉFINIR].
          </p>
          <p className="mb-4">
            Tout litige relatif à ces CGU sera soumis à la juridiction exclusive des tribunaux de [VILLE À DÉFINIR].
          </p>
          <p className="mb-4">
            <strong>Note :</strong> Si vous êtes un consommateur résidant dans l&apos;UE, vous bénéficiez également des protections obligatoires offertes par les lois de votre pays de résidence.
          </p>
        </section>

        {/* Dispositions générales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispositions générales</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">12.1 Intégralité de l&apos;accord</h3>
          <p className="mb-4">
            Ces CGU constituent l&apos;intégralité de l&apos;accord entre vous et ForgeWeb concernant le Service.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">12.2 Divisibilité</h3>
          <p className="mb-4">
            Si une disposition de ces CGU est jugée invalide ou inapplicable, les autres dispositions resteront en vigueur.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">12.3 Renonciation</h3>
          <p className="mb-4">
            L&apos;absence d&apos;exercice d&apos;un droit ne constitue pas une renonciation à ce droit.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">12.4 Cession</h3>
          <p className="mb-4">
            Vous ne pouvez pas céder vos droits ou obligations en vertu de ces CGU sans notre consentement écrit préalable. Nous pouvons céder nos droits et obligations à tout moment.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant ces CGU, contactez-nous :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>ForgeWeb</strong></p>
            <p className="mb-2">Email : <a href="mailto:legal@forgeweb.io" className="text-primary-600 hover:underline">legal@forgeweb.io</a></p>
            <p className="mb-2">Site web : <a href="https://forgeweb.io" className="text-primary-600 hover:underline">https://forgeweb.io</a></p>
          </div>
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
                <strong>AVERTISSEMENT LÉGAL :</strong> Ce document est un modèle générique et ne constitue pas un avis juridique. Il DOIT être revu, complété (notamment les sections juridiction et droit applicable) et adapté par un avocat avant toute utilisation commerciale. ForgeWeb ne peut être tenu responsable de l&apos;inadéquation de ce document à votre situation spécifique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
