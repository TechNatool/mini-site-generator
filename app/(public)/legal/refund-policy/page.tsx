import type { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de Remboursement - ForgeWeb',
  description: 'Politique de remboursement et d\'annulation des abonnements ForgeWeb.',
  robots: 'noindex, nofollow',
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Politique de Remboursement"
      subtitle="Conditions d'annulation et de remboursement"
      lastUpdated="17 novembre 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Principe général</h2>
          <p className="text-gray-700 mb-4">
            <strong>ForgeWeb</strong> propose des abonnements mensuels sans engagement.
            Cette politique décrit les conditions de remboursement et d'annulation de votre abonnement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Annulation d'abonnement</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Comment annuler</h3>
          <p className="text-gray-700 mb-4">
            Vous pouvez annuler votre abonnement à tout moment :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Depuis votre dashboard → Billing → Annuler l'abonnement</li>
            <li>Via le portail client Stripe (lien dans vos emails de facturation)</li>
            <li>Par email à <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">support@forgeweb.io</a></li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Effet de l'annulation</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>L'annulation est effective à la fin de votre période de facturation en cours.</strong>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Vous conservez l'accès à tous vos services jusqu'à la fin de la période payée.
              Aucun renouvellement automatique ne sera effectué.
            </p>
          </div>

          <p className="text-gray-700">
            <strong>Exemple :</strong> Si vous annulez le 10 janvier et que votre abonnement se renouvelle
            le 1er de chaque mois, vous aurez accès jusqu'au 31 janvier inclus.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Remboursements</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Politique générale</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-gray-700">
              <strong>⚠️ Aucun remboursement automatique</strong>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Les paiements effectués ne sont généralement pas remboursables.
              L'annulation arrête les futurs paiements mais ne donne pas droit à un remboursement
              de la période en cours.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Exceptions - Remboursement au cas par cas</h3>
          <p className="text-gray-700 mb-4">
            Un remboursement <strong>partiel ou total</strong> peut être accordé dans les cas suivants :
          </p>

          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Problème technique majeur</h4>
              <p className="text-gray-700 text-sm">
                Si le service est inutilisable pendant une période prolongée (plus de 48h consécutives)
                et que nous ne pouvons pas résoudre le problème.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Double facturation</h4>
              <p className="text-gray-700 text-sm">
                En cas d'erreur de facturation ou de double prélèvement (remboursement du montant en trop).
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Première souscription (14 jours)</h4>
              <p className="text-gray-700 text-sm">
                <strong>Garantie satisfait ou remboursé 14 jours</strong> pour votre premier abonnement.
                Si vous n'êtes pas satisfait, contactez-nous dans les 14 jours suivant votre première
                souscription pour demander un remboursement complet.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Circonstances exceptionnelles</h4>
              <p className="text-gray-700 text-sm">
                Situations particulières évaluées au cas par cas (maladie grave, force majeure, etc.).
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Conditions de remboursement</h3>
          <p className="text-gray-700 mb-4">
            Pour demander un remboursement exceptionnel :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Contactez <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">support@forgeweb.io</a></li>
            <li>Expliquez votre situation et fournissez des détails</li>
            <li>Délai de réponse : 5 jours ouvrés maximum</li>
            <li>Si accepté, remboursement sous 7-14 jours sur votre mode de paiement original</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Droit de rétractation (UE)</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Consommateurs européens</h3>
          <p className="text-gray-700 mb-4">
            Conformément à la législation européenne sur les droits des consommateurs,
            vous disposez d'un <strong>droit de rétractation de 14 jours</strong>.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>📅 Délai :</strong> 14 jours calendaires à compter de la date de souscription
            </p>
            <p className="text-gray-700 mt-2">
              <strong>✉️ Procédure :</strong> Envoyez un email à{' '}
              <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                support@forgeweb.io
              </a>{' '}
              avec l'objet "Rétractation - [Votre email]"
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Renonciation au droit de rétractation</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-gray-700">
              <strong>⚠️ Important :</strong> Si vous commencez à utiliser le Service (génération de sites)
              avant la fin du délai de 14 jours, vous renoncez expressément à votre droit de rétractation
              pour les services déjà fournis.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changement de plan</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Upgrade (plan supérieur)</h3>
          <p className="text-gray-700 mb-4">
            Si vous passez à un plan supérieur :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Le changement est immédiat</li>
            <li>Vous êtes facturé au prorata pour la période restante</li>
            <li>Le nouveau prix s'applique au prochain renouvellement</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Downgrade (plan inférieur)</h3>
          <p className="text-gray-700 mb-4">
            Si vous passez à un plan inférieur :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Le changement prend effet à la fin de votre période de facturation</li>
            <li>Vous conservez les avantages de votre plan actuel jusqu'à la fin</li>
            <li><strong>Aucun remboursement</strong> de la différence pour la période en cours</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Litiges de paiement</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Contestation de paiement (Chargeback)</h3>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-gray-700">
              <strong>⚠️ Avertissement :</strong>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Avant de contester un paiement auprès de votre banque, contactez-nous d'abord à{' '}
              <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                support@forgeweb.io
              </a>.
              Les litiges de paiement non justifiés peuvent entraîner :
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 text-sm space-y-1">
              <li>Suspension immédiate de votre compte</li>
              <li>Interdiction d'accès au service</li>
              <li>Frais de traitement du litige</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Paiement refusé</h3>
          <p className="text-gray-700">
            Si un paiement est refusé (carte expirée, fonds insuffisants, etc.) :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Vous recevrez un email de notification</li>
            <li>Délai de grâce de 7 jours pour régulariser</li>
            <li>Suspension du compte si non régularisé</li>
            <li>Suppression définitive des données après 30 jours</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modification de la politique</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier cette politique de remboursement à tout moment.
            Les modifications ne s'appliquent qu'aux nouveaux abonnements. Vos conditions actuelles
            restent valables jusqu'au renouvellement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
          <p className="text-gray-700 mb-4">
            Pour toute question sur cette politique ou pour demander un remboursement :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>Email de support :</strong>{' '}
              <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                support@forgeweb.io
              </a>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Merci d'inclure dans votre email : votre adresse email de compte, votre numéro de facture,
              et une description détaillée de votre demande.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Résumé</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="text-gray-700 space-y-2">
              <li>✓ Annulation possible à tout moment, sans frais</li>
              <li>✓ Garantie 14 jours satisfait ou remboursé (premier abonnement)</li>
              <li>✓ Accès maintenu jusqu'à la fin de la période payée</li>
              <li>✗ Pas de remboursement automatique hors garantie 14 jours</li>
              <li>✓ Remboursements exceptionnels étudiés au cas par cas</li>
              <li>✓ Droit de rétractation UE : 14 jours</li>
            </ul>
          </div>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-700">
            <strong>📌 Rappel important :</strong> Cette politique de remboursement est fournie à titre
            informatif. Il est fortement recommandé de faire valider ce document par un professionnel
            du droit avant toute utilisation commerciale.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
