/**
 * Template pour la page Contact
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata, generateContactPageSchema } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const contactTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Page Header -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">
            Contactez-nous
          </h1>
          <p class="text-xl text-white">
            Nous sommes à votre écoute pour répondre à vos besoins
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Formulaire de contact -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Demande de devis ou d'information
              </h2>

              <form id="contact-form" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="jean.dupont@example.com"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Type de demande *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type de demande</option>
                    <option value="devis">Demande de devis</option>
                    <option value="info">Demande d'information</option>
                    <option value="urgence">Intervention urgente</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Décrivez votre projet ou votre besoin..."
                  ></textarea>
                </div>

                <div class="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    class="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded"
                  />
                  <label for="consent" class="ml-2 text-sm text-gray-600">
                    J'accepte que mes données soient utilisées pour traiter ma demande. *
                  </label>
                </div>

                <button
                  type="submit"
                  class="w-full px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Envoyer ma demande
                </button>

                <p class="text-sm text-gray-600 text-center">
                  * Champs obligatoires
                </p>
              </form>
            </div>

            <!-- Informations de contact -->
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                  Nos coordonnées
                </h2>

                <div class="space-y-6">
                  <!-- Téléphone -->
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-1">Téléphone</h3>
                      <a href="tel:${data.contact.phone.replace(/\s/g, '')}" class="text-primary-600 hover:text-primary-700 text-lg">
                        ${data.contact.phone}
                      </a>
                      <p class="text-sm text-gray-600 mt-1">Du lundi au vendredi, 8h-18h</p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:${data.contact.email}" class="text-primary-600 hover:text-primary-700">
                        ${data.contact.email}
                      </a>
                      <p class="text-sm text-gray-600 mt-1">Réponse sous 24h</p>
                    </div>
                  </div>

                  <!-- Adresse -->
                  ${
                    data.contact.address
                      ? `
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
                      <h3 class="text-lg font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p class="text-gray-700">
                        ${data.contact.address}<br>
                        ${data.zipCode ? data.zipCode + ' ' : ''}${data.city}
                      </p>
                    </div>
                  </div>
                  `
                      : `
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
                      <h3 class="text-lg font-semibold text-gray-900 mb-1">Zone d'intervention</h3>
                      <p class="text-gray-700">
                        ${data.city} et environs
                      </p>
                    </div>
                  </div>
                  `
                  }
                </div>
              </div>

              <!-- Horaires -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Horaires d'ouverture
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Lundi - Vendredi</span>
                    <span class="font-medium text-gray-900">8h00 - 18h00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Samedi</span>
                    <span class="font-medium text-gray-900">9h00 - 12h00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Dimanche</span>
                    <span class="font-medium text-gray-900">Fermé</span>
                  </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                  <p class="text-sm text-gray-600">
                    <strong>Urgences :</strong> Interventions possibles en dehors des horaires
                  </p>
                </div>
              </div>

              <!-- Engagement -->
              <div class="bg-primary-50 border-l-4 border-primary-600 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  Notre engagement
                </h3>
                <p class="text-gray-700">
                  Nous nous engageons à vous répondre dans les plus brefs délais et à vous proposer un devis personnalisé gratuit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Script du formulaire -->
      <script>
        document.getElementById('contact-form')?.addEventListener('submit', function(e) {
          e.preventDefault();

          // Récupérer les données du formulaire
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());

          // Ici vous pouvez ajouter votre logique d'envoi
          // Pour l'instant, on affiche juste un message de confirmation
          alert('Merci pour votre message ! Nous vous recontacterons très rapidement.');

          // Réinitialiser le formulaire
          e.target.reset();
        });
      </script>
    `;

    const seo = this.getSEO(data, aiContent);
    const structuredData = this.getStructuredData(data);

    return generateBaseHTML({
      title: seo.title,
      seo,
      structuredData,
      content,
      formData: data,
      currentPage: 'contact',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('contact', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return generateContactPageSchema(data);
  },
};
