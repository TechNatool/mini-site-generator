/**
 * Template pour la page Tarifs
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata, generateLocalBusinessSchema } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const pricingTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Page Header -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">
            ${aiContent.pricing.h1}
          </h1>
          <p class="text-xl text-primary-100">
            Tarifs transparents et compétitifs pour tous vos projets
          </p>
        </div>
      </section>

      <!-- Introduction -->
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <p class="text-lg text-gray-700 leading-relaxed">
              ${aiContent.pricing.introduction}
            </p>
          </div>

          <!-- Points clés tarification -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Devis gratuit</h3>
              <p class="text-gray-600">Sans engagement de votre part</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Prix juste</h3>
              <p class="text-gray-600">Tarifs adaptés à votre budget</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Devis détaillé</h3>
              <p class="text-gray-600">Transparence totale sur les coûts</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Grille tarifaire indicative -->
      ${
        aiContent.pricing.priceRanges && aiContent.pricing.priceRanges.length > 0
          ? `
      <section class="py-16 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Grille tarifaire indicative
            </h2>
            <p class="text-gray-600">
              Tarifs à titre indicatif. Un devis personnalisé sera établi selon votre projet.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-soft overflow-hidden">
            <div class="divide-y divide-gray-200">
              ${aiContent.pricing.priceRanges
                .map(
                  (item) => `
                <div class="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">${item.service}</h3>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-primary-600">${item.range}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600 italic">
              * Les tarifs peuvent varier selon la complexité du projet, les matériaux utilisés et les contraintes spécifiques.
            </p>
          </div>
        </div>
      </section>
      `
          : ''
      }

      <!-- Facteurs influençant le prix -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Qu'est-ce qui influence le prix ?
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Complexité du projet</h3>
                <p class="text-gray-600">
                  La difficulté technique et le temps nécessaire influencent directement le coût.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Matériaux utilisés</h3>
                <p class="text-gray-600">
                  Le choix des matériaux (standard, milieu de gamme, haut de gamme) impacte le prix final.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Accessibilité du chantier</h3>
                <p class="text-gray-600">
                  Les contraintes d'accès peuvent nécessiter des moyens supplémentaires.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Urgence de l'intervention</h3>
                <p class="text-gray-600">
                  Les interventions en urgence peuvent engendrer des frais supplémentaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Devis -->
      <section class="py-16 bg-primary-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Obtenez votre devis personnalisé
            </h2>
            <p class="text-xl text-primary-100 mb-8">
              Gratuit, rapide et sans engagement
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Demander un devis
              </a>
              <a
                href="tel:${data.contact.phone.replace(/\s/g, '')}"
                class="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white text-lg font-semibold rounded-lg hover:bg-primary-500 transition-all border-2 border-white"
              >
                ${data.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Prix -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>

          <div class="space-y-6">
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Le devis est-il vraiment gratuit ?
              </h3>
              <p class="text-gray-700">
                Oui, absolument ! Nous établissons un devis détaillé et personnalisé sans aucun frais ni engagement de votre part.
              </p>
            </div>

            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Sous quel délai puis-je recevoir mon devis ?
              </h3>
              <p class="text-gray-700">
                Nous nous engageons à vous transmettre votre devis sous 48h après notre visite ou l'étude de votre demande.
              </p>
            </div>

            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Quels sont les moyens de paiement acceptés ?
              </h3>
              <p class="text-gray-700">
                Nous acceptons les paiements par virement bancaire, chèque et espèces. Des facilités de paiement peuvent être proposées selon le montant.
              </p>
            </div>

            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Y a-t-il des frais de déplacement ?
              </h3>
              <p class="text-gray-700">
                Les déplacements sont inclus dans nos tarifs pour la zone de ${data.city} et ses environs proches.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;

    const seo = this.getSEO(data, aiContent);
    const structuredData = this.getStructuredData(data);

    return generateBaseHTML({
      title: seo.title,
      seo,
      structuredData,
      content,
      formData: data,
      currentPage: 'pricing',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('pricing', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return generateLocalBusinessSchema(data);
  },
};
