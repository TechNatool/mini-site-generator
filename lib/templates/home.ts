/**
 * Template pour la page d'accueil
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata, generateLocalBusinessSchema } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const homeTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
              ${aiContent.home.h1}
            </h1>
            <p class="text-xl md:text-2xl text-white mb-4">
              ${aiContent.home.tagline}
            </p>
            <p class="text-lg text-white mb-8 max-w-3xl mx-auto">
              ${aiContent.home.introduction}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                ${aiContent.home.cta}
              </a>
              <a
                href="/services"
                class="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-all border-2 border-white"
              >
                Découvrir nos services
              </a>
            </div>
          </div>
        </div>

        <!-- Éléments décoratifs -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez l'ensemble de nos prestations professionnelles
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${aiContent.servicesContent
              .map(
                (service) => `
              <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  ${service.name}
                </h3>
                <p class="text-gray-600 mb-4">
                  ${service.description}
                </p>
                <ul class="space-y-2">
                  ${service.benefits
                    .map(
                      (benefit) => `
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-sm text-gray-600">${benefit}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="text-center mt-12">
            <a
              href="/services"
              class="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Voir tous nos services
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Pourquoi nous choisir -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Intervention rapide</h3>
              <p class="text-gray-600">Disponible et réactif pour vos urgences</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Qualité garantie</h3>
              <p class="text-gray-600">Travail soigné et conforme aux normes</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Tarifs transparents</h3>
              <p class="text-gray-600">Devis gratuit et détaillé</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Expérience</h3>
              <p class="text-gray-600">Savoir-faire reconnu</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Témoignages -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p class="text-lg text-gray-600">
              Découvrez les avis de nos clients satisfaits
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${aiContent.testimonials
              .map(
                (testimonial) => `
              <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div class="flex items-center mb-4">
                  ${Array(testimonial.rating)
                    .fill(0)
                    .map(
                      () => `
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  `
                    )
                    .join('')}
                </div>
                <p class="text-gray-700 mb-4 italic">
                  "${testimonial.text}"
                </p>
                <p class="text-sm font-semibold text-gray-900">
                  ${testimonial.name}
                </p>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="py-16 bg-primary-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p class="text-xl text-white mb-8">
            Contactez-nous dès maintenant pour un devis gratuit et sans engagement
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
      currentPage: 'home',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('home', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return generateLocalBusinessSchema(data);
  },
};
