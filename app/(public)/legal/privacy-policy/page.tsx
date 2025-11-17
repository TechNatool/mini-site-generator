import type { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - ForgeWeb',
  description: 'Politique de confidentialité et protection des données personnelles de ForgeWeb.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Politique de Confidentialité"
      subtitle="Protection et traitement de vos données personnelles"
      lastUpdated="17 novembre 2025"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            <strong>ForgeWeb</strong> (ci-après "nous", "notre" ou "le Service") s'engage à protéger
            la vie privée de ses utilisateurs. Cette politique de confidentialité décrit comment nous
            collectons, utilisons, stockons et protégeons vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p className="text-gray-700">
            <strong>Site web :</strong> forgeweb.io
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Responsable du traitement</h2>
          <p className="text-gray-700 mb-4">
            Le responsable du traitement des données est :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>ForgeWeb</strong><br />
              Email de contact : <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">support@forgeweb.io</a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Données collectées</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Données d'inscription</h3>
          <p className="text-gray-700 mb-4">
            Lors de la création de votre compte, nous collectons :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Adresse email</li>
            <li>Mot de passe (chiffré)</li>
            <li>Nom d'entreprise (optionnel)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Données de génération de sites</h3>
          <p className="text-gray-700 mb-4">
            Pour générer votre site web, nous collectons :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Nom de votre entreprise</li>
            <li>Type d'activité</li>
            <li>Ville / Localisation</li>
            <li>Services proposés</li>
            <li>Informations de contact (téléphone, email)</li>
            <li>Préférences de design (couleurs, style)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Données de paiement</h3>
          <p className="text-gray-700 mb-4">
            Les paiements sont traités par <strong>Stripe</strong>. Nous ne stockons jamais vos données
            bancaires. Stripe collecte :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Informations de carte bancaire</li>
            <li>Nom du titulaire</li>
            <li>Adresse de facturation</li>
          </ul>
          <p className="text-gray-700">
            Consultez la <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">politique de confidentialité de Stripe</a>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Données techniques</h3>
          <p className="text-gray-700 mb-4">
            Nous collectons automatiquement :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Système d'exploitation</li>
            <li>Pages visitées et durée de visite</li>
            <li>Cookies (voir notre <a href="/legal/cookies" className="text-blue-600 hover:underline">politique cookies</a>)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Finalités du traitement</h2>
          <p className="text-gray-700 mb-4">
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Générer vos sites web avec l'IA Claude</li>
            <li>Traiter vos paiements et abonnements</li>
            <li>Vous envoyer des notifications importantes (service, facturation)</li>
            <li>Améliorer nos services et corriger les bugs</li>
            <li>Assurer la sécurité et prévenir la fraude</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Base légale du traitement</h2>
          <p className="text-gray-700 mb-4">
            Conformément au RGPD, le traitement de vos données repose sur :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Exécution du contrat :</strong> Pour fournir nos services</li>
            <li><strong>Consentement :</strong> Pour les cookies non essentiels et marketing</li>
            <li><strong>Intérêt légitime :</strong> Pour améliorer nos services et assurer la sécurité</li>
            <li><strong>Obligation légale :</strong> Pour la facturation et conformité fiscale</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partage des données</h2>
          <p className="text-gray-700 mb-4">
            Nous partageons vos données uniquement avec :
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Prestataires de services</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li><strong>Anthropic (Claude AI) :</strong> Pour la génération de contenu</li>
            <li><strong>Stripe :</strong> Pour le traitement des paiements</li>
            <li><strong>Vercel/Netlify :</strong> Pour l'hébergement et le déploiement</li>
          </ul>

          <p className="text-gray-700 mb-4">
            <strong>⚠️ Important :</strong> Nous ne vendons jamais vos données à des tiers.
            Tous nos prestataires sont soumis à des accords de confidentialité stricts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Durée de conservation</h2>
          <p className="text-gray-700 mb-4">
            Nous conservons vos données :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Compte actif :</strong> Tant que votre compte existe</li>
            <li><strong>Compte supprimé :</strong> 30 jours après suppression (pour récupération)</li>
            <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
            <li><strong>Logs techniques :</strong> 12 mois maximum</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Vos droits (RGPD)</h2>
          <p className="text-gray-700 mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>

          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit d'accès</h4>
              <p className="text-gray-700 text-sm">Obtenir une copie de toutes vos données personnelles</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit de rectification</h4>
              <p className="text-gray-700 text-sm">Corriger vos données inexactes ou incomplètes</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit à l'effacement</h4>
              <p className="text-gray-700 text-sm">Supprimer vos données (sous certaines conditions)</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit à la portabilité</h4>
              <p className="text-gray-700 text-sm">Recevoir vos données dans un format structuré</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit d'opposition</h4>
              <p className="text-gray-700 text-sm">Vous opposer au traitement de vos données</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">✓ Droit de limitation</h4>
              <p className="text-gray-700 text-sm">Limiter le traitement dans certains cas</p>
            </div>
          </div>

          <p className="text-gray-700 mt-4">
            <strong>Pour exercer vos droits :</strong> Contactez-nous à{' '}
            <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
              support@forgeweb.io
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des données</h2>
          <p className="text-gray-700 mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Chiffrement des mots de passe (bcrypt)</li>
            <li>Connexion HTTPS (SSL/TLS)</li>
            <li>Sessions sécurisées (HMAC SHA256)</li>
            <li>Isolation des données par utilisateur</li>
            <li>Sauvegardes régulières</li>
            <li>Surveillance des accès et logs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Transferts internationaux</h2>
          <p className="text-gray-700 mb-4">
            Certains de nos prestataires (Anthropic, Vercel) peuvent traiter vos données en dehors de
            l'Union Européenne. Ces transferts sont encadrés par :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Clauses contractuelles types (CCT) de la Commission Européenne</li>
            <li>Garanties appropriées conformes au RGPD</li>
            <li>Privacy Shield Framework (USA)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier cette politique à tout moment.
            Les modifications importantes seront notifiées par email. La version en vigueur
            est toujours accessible sur cette page avec sa date de mise à jour.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact et réclamation</h2>
          <p className="text-gray-700 mb-4">
            Pour toute question sur cette politique ou vos données personnelles :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>Email :</strong> <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">support@forgeweb.io</a>
            </p>
          </div>
          <p className="text-gray-700">
            Vous avez également le droit d'introduire une réclamation auprès de la
            <strong> CNIL</strong> (Commission Nationale de l'Informatique et des Libertés)
            si vous estimez que vos droits ne sont pas respectés.
          </p>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-700">
            <strong>📌 Rappel important :</strong> Ce document est fourni à titre informatif.
            Il est fortement recommandé de faire valider cette politique par un professionnel
            du droit avant toute utilisation commerciale.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
