import { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de Remboursement - ForgeWeb',
  description: 'Conditions de remboursement et politique d\'annulation',
  robots: 'noindex, nofollow',
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Politique de Remboursement"
      subtitle="Conditions de remboursement et d'annulation"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Cette politique de remboursement s&apos;applique à tous les services fournis par <strong>{'{COMPANY_NAME}'}</strong> (ForgeWeb) via <strong>{'{DOMAIN}'}</strong> (forgeweb.io).
          </p>
          <p className="mb-4">
            Nous nous efforçons d&apos;assurer votre satisfaction, mais nous comprenons que des circonstances peuvent nécessiter un remboursement. Cette politique définit les conditions dans lesquelles les remboursements sont possibles.
          </p>
          <p className="mb-4">
            <strong className="text-red-600">IMPORTANT :</strong> Cette politique doit être revue par un professionnel du droit avant toute utilisation commerciale. Elle peut varier selon les lois locales et le type de service proposé.
          </p>
        </section>

        {/* Éligibilité au remboursement */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Éligibilité au remboursement</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Services éligibles</h3>
          <p className="mb-4">
            Les remboursements peuvent être demandés dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Défaut technique majeur :</strong> Le service ne fonctionne pas comme décrit et nous ne pouvons pas résoudre le problème</li>
            <li><strong>Double facturation :</strong> Vous avez été facturé deux fois pour le même service</li>
            <li><strong>Erreur de facturation :</strong> Montant incorrect facturé</li>
            <li><strong>Service non livré :</strong> Vous avez payé mais n&apos;avez pas reçu le service (génération échouée sans raison de votre part)</li>
            <li><strong>Non-conformité grave :</strong> Le service livré est substantiellement différent de ce qui a été annoncé</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Services NON éligibles</h3>
          <p className="mb-4">
            <strong>Les remboursements ne sont PAS accordés dans les cas suivants :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Changement d&apos;avis :</strong> Vous avez simplement changé d&apos;avis après la livraison</li>
            <li><strong>Qualité subjective :</strong> Le contenu généré par l&apos;IA ne correspond pas exactement à vos attentes (l&apos;IA génère du contenu variable)</li>
            <li><strong>Mauvaise utilisation :</strong> Vous n&apos;avez pas fourni les bonnes informations ou utilisé le service correctement</li>
            <li><strong>Service déjà téléchargé :</strong> Vous avez déjà téléchargé le site généré (ZIP)</li>
            <li><strong>Délai écoulé :</strong> La demande est faite après le délai de rétractation (voir section 3)</li>
            <li><strong>Abonnement déjà utilisé :</strong> Vous avez utilisé une partie significative de votre abonnement mensuel</li>
            <li><strong>Violation des CGU :</strong> Votre compte a été suspendu pour violation de nos <a href="/legal/terms" className="text-primary-600 hover:underline">Conditions Générales</a></li>
          </ul>
        </section>

        {/* Délais */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Délais de demande de remboursement</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Droit de rétractation (consommateurs UE)</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="mb-2">
              <strong>Pour les consommateurs de l&apos;Union Européenne :</strong>
            </p>
            <p className="mb-2">
              Conformément à la directive européenne sur les droits des consommateurs, vous disposez d&apos;un délai de <strong>14 jours</strong> à compter de l&apos;achat pour exercer votre droit de rétractation, SAUF si :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Vous avez expressément accepté de renoncer à ce droit en téléchargeant le contenu numérique</li>
              <li>Le service a été pleinement exécuté avec votre accord préalable</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Délais généraux</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4">Type de service</th>
                  <th className="text-left py-2 pr-4">Délai maximum</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Achat unique (avant téléchargement)</td>
                  <td className="py-2">14 jours</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Achat unique (après téléchargement)</td>
                  <td className="py-2">48 heures (problèmes techniques uniquement)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-4">Abonnement mensuel</td>
                  <td className="py-2">7 jours après le dernier paiement</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Erreur de facturation</td>
                  <td className="py-2">90 jours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Processus de demande */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Comment demander un remboursement</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Procédure</h3>
          <p className="mb-4">
            Pour demander un remboursement, suivez ces étapes :
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-3">
            <li>
              <strong>Contactez notre support :</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Email : <a href="mailto:support@forgeweb.io" className="text-primary-600 hover:underline">support@forgeweb.io</a></li>
                <li>Objet : &quot;Demande de remboursement - [Votre ID de transaction]&quot;</li>
              </ul>
            </li>
            <li>
              <strong>Fournissez les informations suivantes :</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nom et email associés au compte</li>
                <li>ID de transaction ou numéro de commande</li>
                <li>Date de l&apos;achat</li>
                <li>Raison détaillée du remboursement</li>
                <li>Captures d&apos;écran ou preuves du problème (si applicable)</li>
              </ul>
            </li>
            <li>
              <strong>Attendez notre réponse :</strong> Nous examinerons votre demande sous 3 à 5 jours ouvrables
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Support avant remboursement</h3>
          <p className="mb-4">
            <strong>Avant de demander un remboursement</strong>, nous vous encourageons à :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contacter notre support pour tenter de résoudre le problème</li>
            <li>Consulter notre <a href="#" className="text-primary-600 hover:underline">FAQ</a> et documentation</li>
            <li>Vérifier que le problème n&apos;est pas dû à une mauvaise utilisation</li>
          </ul>
          <p className="mb-4">
            Dans de nombreux cas, nous pouvons résoudre le problème rapidement sans remboursement (regénération gratuite, correction manuelle, crédits supplémentaires, etc.).
          </p>
        </section>

        {/* Traitement et délais */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Traitement des remboursements</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Évaluation</h3>
          <p className="mb-4">
            Une fois votre demande reçue :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nous examinons votre cas sous <strong>3 à 5 jours ouvrables</strong></li>
            <li>Nous pouvons vous demander des informations complémentaires</li>
            <li>Nous vous informons de notre décision par email</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Approbation</h3>
          <p className="mb-4">
            Si votre remboursement est approuvé :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Remboursement complet :</strong> 100% du montant payé (dans les cas éligibles)</li>
            <li><strong>Remboursement partiel :</strong> Au prorata de l&apos;utilisation (pour les abonnements)</li>
            <li><strong>Crédit de compte :</strong> Alternative au remboursement monétaire (si vous l&apos;acceptez)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Méthode de remboursement</h3>
          <p className="mb-4">
            Les remboursements sont effectués :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Même moyen de paiement :</strong> Le remboursement est crédité sur le moyen de paiement utilisé lors de l&apos;achat</li>
            <li><strong>Délai de traitement :</strong> 5 à 10 jours ouvrables après approbation</li>
            <li><strong>Délai bancaire :</strong> + 3 à 7 jours selon votre banque/carte</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.4 Refus</h3>
          <p className="mb-4">
            Si votre demande est refusée :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nous vous expliquons les raisons du refus</li>
            <li>Nous proposons des alternatives si possible (crédit, support technique, regénération, etc.)</li>
            <li>Vous pouvez faire appel de la décision (voir section 7)</li>
          </ul>
        </section>

        {/* Abonnements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Politique pour les abonnements</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Annulation d&apos;abonnement</h3>
          <p className="mb-4">
            Vous pouvez annuler votre abonnement à tout moment :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>L&apos;annulation prend effet à la fin de la période de facturation en cours</li>
            <li><strong>Aucun remboursement</strong> pour la période en cours (sauf cas exceptionnels)</li>
            <li>Vous conservez l&apos;accès jusqu&apos;à la fin de la période payée</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Remboursement partiel</h3>
          <p className="mb-4">
            Pour les abonnements, un remboursement partiel au prorata peut être accordé si :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Problème technique majeur empêchant l&apos;utilisation du service</li>
            <li>Interruption prolongée du service (plus de 72h consécutives)</li>
            <li>Modification unilatérale substantielle des conditions sans préavis</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Période d&apos;essai (si applicable)</h3>
          <p className="mb-4">
            Si nous proposons une période d&apos;essai gratuite ou payante :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Vous pouvez annuler avant la fin de la période d&apos;essai sans frais</li>
            <li>Remboursement intégral si annulation dans les 7 premiers jours (essai payant)</li>
          </ul>
        </section>

        {/* Litiges et recours */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Litiges et recours</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Appel interne</h3>
          <p className="mb-4">
            Si vous n&apos;êtes pas satisfait de notre décision :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Répondez à l&apos;email de refus en demandant un réexamen</li>
            <li>Fournissez des informations complémentaires si disponibles</li>
            <li>Un responsable senior réexaminera votre cas sous 5 jours ouvrables</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Médiation (consommateurs UE)</h3>
          <p className="mb-4">
            Si vous résidez dans l&apos;UE et que le litige persiste :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Vous pouvez saisir la plateforme de règlement des litiges en ligne de l&apos;UE : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://ec.europa.eu/consumers/odr</a></li>
            <li>Ou contacter le médiateur de la consommation de votre pays</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Rétrofacturation (Chargeback)</h3>
          <p className="mb-4">
            <strong className="text-red-600">AVERTISSEMENT :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contactez-nous AVANT de demander une rétrofacturation à votre banque</li>
            <li>Les rétrofacturations abusives peuvent entraîner la suspension de votre compte</li>
            <li>Nous pouvons contester les rétrofacturations non justifiées</li>
          </ul>
        </section>

        {/* Cas particuliers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cas particuliers</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Erreurs de facturation</h3>
          <p className="mb-4">
            Remboursement automatique et prioritaire en cas d&apos;erreur de notre part.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Service interrompu définitivement</h3>
          <p className="mb-4">
            Si nous arrêtons définitivement le service :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Préavis de 60 jours minimum</li>
            <li>Remboursement au prorata pour les abonnements en cours</li>
            <li>Possibilité d&apos;exporter vos données</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.3 Force majeure</h3>
          <p className="mb-4">
            Aucun remboursement en cas d&apos;interruption due à des événements hors de notre contrôle (catastrophes naturelles, pannes majeures de fournisseurs tiers, etc.), sauf si l&apos;interruption dépasse 30 jours consécutifs.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications de cette politique</h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier cette politique de remboursement à tout moment. Les modifications entrent en vigueur dès leur publication, mais ne s&apos;appliquent pas rétroactivement aux achats effectués avant la modification.
          </p>
          <p className="mb-4">
            Toute modification substantielle sera notifiée par email au moins 15 jours avant son entrée en vigueur.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
          <p className="mb-4">
            Pour toute demande de remboursement ou question concernant cette politique :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>ForgeWeb - Service Remboursements</strong></p>
            <p className="mb-2">Email : <a href="mailto:support@forgeweb.io" className="text-primary-600 hover:underline">support@forgeweb.io</a></p>
            <p className="mb-2">Objet : &quot;Demande de remboursement - [ID transaction]&quot;</p>
            <p className="mb-2">Site web : <a href="https://forgeweb.io" className="text-primary-600 hover:underline">https://forgeweb.io</a></p>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Horaires de traitement :</strong> Lundi-Vendredi, 9h-18h (CET)<br />
              <strong>Délai de réponse :</strong> 3 à 5 jours ouvrables maximum
            </p>
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
                <strong>AVERTISSEMENT LÉGAL :</strong> Ce document est un modèle générique et ne constitue pas un avis juridique. Il DOIT être revu et adapté par un avocat spécialisé en droit de la consommation avant toute utilisation commerciale. Les lois sur les remboursements varient selon les pays et les types de services. ForgeWeb ne peut être tenu responsable de l&apos;inadéquation de ce document à votre situation spécifique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
