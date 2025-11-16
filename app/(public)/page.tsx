import Hero from '@/components/public/Hero';
import FeatureCard from '@/components/public/FeatureCard';
import FAQSection from '@/components/public/FAQSection';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <Hero />

      {/* Product Explanation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Un générateur de sites web intelligent
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Mini Site Generator utilise l'intelligence artificielle Claude pour créer automatiquement
              des sites web professionnels pour artisans et PME. En quelques clics, obtenez un site complet
              de 6 pages avec contenu optimisé, images générées, SEO parfait et déploiement automatique.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              6 modules puissants inclus
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour créer et gérer des sites web professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="AI Content Generator"
              description="Génération automatique de contenu optimisé SEO par Claude AI. Textes professionnels, naturels et engageants pour toutes vos pages."
              badge="Claude AI"
            />

            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Auto-Images AI"
              description="Génération d'images pertinentes via DALL-E 3 ou Stable Diffusion. Optimisation automatique, alt-text SEO et compression intelligente."
              badge="DALL-E 3"
            />

            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="SEO Boost"
              description="Optimisation SEO complète : meta tags, structured data schema.org, sitemap, robots.txt. Scores SEO élevés dès le départ."
              badge="100/100"
            />

            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
              title="AutoDeploy"
              description="Déploiement automatique sur Vercel, Netlify ou autres plateformes. Obtenez une URL publique en un clic. Logs détaillés et historique complet."
              badge="1-Click"
            />

            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Dashboard Complet"
              description="Interface de gestion intuitive. Visualisez tous vos sites, statistiques, logs de génération et déploiement. Régénération et modification en un clic."
              badge="Stats"
            />

            <FeatureCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
              title="Multi-Utilisateurs"
              description="Système d'authentification sécurisé. Isolation complète des données par utilisateur. Parfait pour gérer plusieurs clients ou collaborateurs."
              badge="Sécurisé"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/features"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
            >
              Découvrir toutes les fonctionnalités
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Visual */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Dashboard professionnel
            </h2>
            <p className="text-xl text-gray-600">
              Interface intuitive pour gérer tous vos sites en un seul endroit
            </p>
          </div>

          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="bg-gray-100 aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 font-medium">Capture d'écran du dashboard</p>
                <p className="text-sm text-gray-500 mt-2">(Image à venir)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              3 étapes simples pour créer votre site web professionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Remplissez le formulaire</h3>
                <p className="text-gray-600">
                  Entrez les informations de base : nom, activité, ville, services, contact. Simple et rapide.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">L'IA génère votre site</h3>
                <p className="text-gray-600">
                  Claude AI crée automatiquement 6 pages avec contenu optimisé, images, SEO et tout le nécessaire.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Déployez en 1 clic</h3>
                <p className="text-gray-600">
                  Cliquez sur "Déployer" et obtenez immédiatement une URL publique. Votre site est en ligne !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Mini Site Generator ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ultra rapide</h3>
                <p className="text-gray-600">
                  Créez un site complet en moins de 5 minutes. Plus besoin d'attendre des semaines ou de coder.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% responsive</h3>
                <p className="text-gray-600">
                  Sites parfaitement adaptés à tous les écrans : mobile, tablette, desktop. Design moderne garanti.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">SEO optimisé</h3>
                <p className="text-gray-600">
                  Meta tags, structured data, sitemap automatique. Positionnement Google optimal dès le départ.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contenu IA de qualité</h3>
                <p className="text-gray-600">
                  Textes professionnels générés par Claude AI. Naturels, engageants et adaptés à votre activité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à créer votre site web professionnel ?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Rejoignez les centaines d'artisans et PME qui utilisent déjà Mini Site Generator
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg">
                Commencer gratuitement
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="lg" className="bg-primary-500/20 backdrop-blur-sm text-white border border-white/20 hover:bg-primary-500/30">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
