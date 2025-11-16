import type { Metadata } from 'next';
import PricingCard from '@/components/public/PricingCard';
import Footer from '@/components/public/Footer';

export const metadata: Metadata = {
  title: 'Tarifs - Mini Site Generator',
  description: 'Découvrez nos tarifs simples et transparents. Plans Starter, Pro et Business pour tous les besoins.',
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Tarifs simples et transparents
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Pas de frais cachés.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Starter Plan */}
            <PricingCard
              name="Starter"
              price="Gratuit"
              period=""
              description="Pour découvrir le service"
              features={[
                "5 sites maximum",
                "AI Content Generation",
                "Génération d'images (limitée)",
                "SEO Boost basique",
                "Déploiement manuel",
                "Support communautaire",
                "Dashboard de base",
              ]}
              cta="Commencer gratuitement"
              ctaLink="/dashboard/register"
            />

            {/* Pro Plan */}
            <PricingCard
              name="Pro"
              price="29€"
              period="/mois"
              description="Pour professionnels et PME"
              features={[
                "20 sites maximum",
                "AI Content illimité",
                "Auto-Images AI (DALL-E 3)",
                "SEO Boost complet",
                "AutoDeploy (1-click)",
                "Support prioritaire",
                "Dashboard avancé",
                "Multi-utilisateurs (3 comptes)",
                "Statistiques détaillées",
              ]}
              highlighted={true}
              cta="Choisir Pro"
              ctaLink="/dashboard/register"
            />

            {/* Business Plan */}
            <PricingCard
              name="Business"
              price="99€"
              period="/mois"
              description="Pour agences et entreprises"
              features={[
                "Sites illimités",
                "AI Content illimité",
                "Auto-Images AI premium",
                "SEO Boost + Analytics",
                "AutoDeploy avancé",
                "Support dédié 24/7",
                "Dashboard professionnel",
                "Multi-utilisateurs illimité",
                "White-label possible",
                "API Access",
                "Personnalisation avancée",
              ]}
              cta="Contacter les ventes"
              ctaLink="mailto:sales@mini-site-generator.com"
            />

          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Toutes les offres incluent : Hébergement gratuit, SSL gratuit, Bande passante illimitée
            </p>
            <p className="text-sm text-gray-500">
              Les prix sont HT. TVA applicable selon votre localisation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comparaison détaillée
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Fonctionnalité</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-700">Nombre de sites</td>
                  <td className="py-4 px-4 text-center text-gray-600">5</td>
                  <td className="py-4 px-4 text-center text-gray-600">20</td>
                  <td className="py-4 px-4 text-center text-gray-600">Illimité</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-700">AI Content Generation</td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Auto-Images AI</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">Limité</td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center text-blue-600 text-sm font-semibold">Premium</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-700">SEO Boost</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">Basique</td>
                  <td className="py-4 px-4 text-center text-gray-600 text-sm">Complet</td>
                  <td className="py-4 px-4 text-center text-blue-600 text-sm font-semibold">+ Analytics</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">AutoDeploy</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">Manuel</td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-700">Utilisateurs</td>
                  <td className="py-4 px-4 text-center text-gray-600">1</td>
                  <td className="py-4 px-4 text-center text-gray-600">3</td>
                  <td className="py-4 px-4 text-center text-gray-600">Illimité</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Support</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-sm">Communauté</td>
                  <td className="py-4 px-4 text-center text-gray-600 text-sm">Prioritaire</td>
                  <td className="py-4 px-4 text-center text-blue-600 text-sm font-semibold">24/7 Dédié</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 text-gray-700">API Access</td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">White-label</td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes sur les tarifs
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je essayer gratuitement ?</h3>
              <p className="text-gray-600">
                Oui ! Le plan Starter est gratuit et vous permet de créer jusqu'à 5 sites pour tester
                toutes les fonctionnalités de base.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je changer de plan ?</h3>
              <p className="text-gray-600">
                Absolument. Vous pouvez passer d'un plan à un autre à tout moment. Les changements
                sont effectifs immédiatement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Y a-t-il un engagement minimum ?</h3>
              <p className="text-gray-600">
                Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment et vous
                ne serez pas facturé pour le mois suivant.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Que se passe-t-il si je dépasse la limite de sites ?</h3>
              <p className="text-gray-600">
                Vous serez invité à passer au plan supérieur. Vos sites existants continueront de
                fonctionner normalement, mais vous ne pourrez pas en créer de nouveaux.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Proposez-vous des remises pour les paiements annuels ?</h3>
              <p className="text-gray-600">
                Oui ! En choisissant le paiement annuel, vous bénéficiez de 2 mois gratuits (soit ~16% de réduction).
                Contactez-nous pour plus d'informations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Commencez gratuitement dès aujourd'hui. Aucune carte bancaire requise.
          </p>
          <a
            href="/dashboard/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Créer mon compte gratuit
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
