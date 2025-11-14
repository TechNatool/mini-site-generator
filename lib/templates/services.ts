/**
 * Template pour la page Services
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata, generateServiceSchema } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const servicesTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Page Header -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">
            Nos Services
          </h1>
          <p class="text-xl text-primary-100">
            Découvrez l'ensemble de nos prestations de ${data.activity} à ${data.city}
          </p>
        </div>
      </section>

      <!-- Liste des services détaillés -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="space-y-12">
            ${aiContent.servicesContent
              .map(
                (service, index) => `
              <div class="bg-gray-50 rounded-lg overflow-hidden ${index % 2 === 0 ? 'lg:grid lg:grid-cols-2 lg:gap-8' : 'lg:grid lg:grid-cols-2 lg:gap-8'}">
                <!-- Contenu -->
                <div class="p-8 ${index % 2 === 1 ? 'lg:order-2' : ''}">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                      ${service.name}
                    </h2>
                  </div>

                  <p class="text-gray-700 mb-6 leading-relaxed">
                    ${service.description}
                  </p>

                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Avantages :
                  </h3>
                  <ul class="space-y-3 mb-6">
                    ${service.benefits
                      .map(
                        (benefit) => `
                      <li class="flex items-start">
                        <svg class="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-gray-700">${benefit}</span>
                      </li>
                    `
                      )
                      .join('')}
                  </ul>

                  <a
                    href="/contact"
                    class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Demander un devis
                  </a>
                </div>

                <!-- Image placeholder -->
                <div class="h-64 lg:h-auto bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}">
                  <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Processus de travail -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre processus de travail
            </h2>
            <p class="text-lg text-gray-600">
              Une méthode éprouvée pour votre satisfaction
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
              <p class="text-gray-600">Vous nous contactez pour nous exposer votre besoin</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Diagnostic</h3>
              <p class="text-gray-600">Nous évaluons votre projet sur place si nécessaire</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Devis</h3>
              <p class="text-gray-600">Vous recevez un devis détaillé et transparent</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Réalisation</h3>
              <p class="text-gray-600">Nous réalisons vos travaux dans les règles de l'art</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Zone d'intervention -->
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Zone d'intervention
            </h2>
            <p class="text-lg text-gray-700 mb-4">
              Nous intervenons à <strong>${data.city}</strong> et dans les communes environnantes.
            </p>
            <p class="text-gray-600 mb-8">
              Contactez-nous pour vérifier si nous couvrons votre secteur.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 bg-primary-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Un projet en tête ?
          </h2>
          <p class="text-xl text-primary-100 mb-8">
            Demandez votre devis gratuit et sans engagement
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
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    `;

    const seo = this.getSEO(data, aiContent);

    // Générer un structured data pour chaque service
    const structuredData = aiContent.servicesContent.map((service) =>
      generateServiceSchema(service.name, service.description, data)
    );

    return generateBaseHTML({
      title: seo.title,
      seo,
      structuredData,
      content,
      formData: data,
      currentPage: 'services',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('services', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return generateServiceSchema(
      data.services[0],
      `Service de ${data.activity} à ${data.city}`,
      data
    );
  },
};
