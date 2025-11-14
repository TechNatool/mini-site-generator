/**
 * Template pour la page À propos
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata, generateAboutPageSchema } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const aboutTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Page Header -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">
            ${aiContent.about.h1}
          </h1>
          <p class="text-xl text-primary-100">
            Faites connaissance avec votre ${data.activity} de confiance
          </p>
        </div>
      </section>

      <!-- Introduction -->
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 leading-relaxed">
              ${aiContent.about.introduction}
            </p>
          </div>
        </div>
      </section>

      <!-- Expertise -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Expertise et savoir-faire
              </h2>
              <div class="prose prose-lg">
                <p class="text-gray-700 leading-relaxed mb-6">
                  ${aiContent.about.expertise}
                </p>
              </div>
            </div>

            <div class="bg-white rounded-lg p-8 shadow-soft">
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">
                Certifications et qualifications
              </h3>
              <ul class="space-y-4">
                ${(aiContent.about.certifications || [])
                  .map(
                    (cert) => `
                  <li class="flex items-start">
                    <svg class="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-700">${cert}</span>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Valeurs -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p class="text-lg text-gray-600">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${aiContent.about.values
              .map(
                (value, index) => {
                  const icons = [
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>',
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>',
                  ];
                  return `
                  <div class="text-center">
                    <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${icons[index % icons.length]}
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      ${value}
                    </h3>
                  </div>
                `;
                }
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Zone d'intervention -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Zone d'intervention
          </h2>
          <p class="text-lg text-gray-700 mb-8">
            Nous intervenons principalement à <strong>${data.city}</strong> et ses environs.
            N'hésitez pas à nous contacter pour vérifier si votre commune est couverte.
          </p>
          <a
            href="/contact"
            class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 bg-primary-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'un ${data.activity} de confiance ?
          </h2>
          <p class="text-xl text-primary-100 mb-8">
            Contactez ${data.name} pour discuter de votre projet
          </p>
          <a
            href="/contact"
            class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            Demander un devis gratuit
          </a>
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
      currentPage: 'about',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('about', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return generateAboutPageSchema(data);
  },
};
