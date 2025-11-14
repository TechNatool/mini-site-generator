/**
 * Template pour la page Mentions légales
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { PageTemplate } from '@/types/templates';
import { generateSEOMetadata } from '@/lib/seo';
import { generateBaseHTML } from './base';

export const legalTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <!-- Page Header -->
      <section class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl md:text-4xl font-bold font-heading">
            Mentions légales
          </h1>
        </div>
      </section>

      <!-- Contenu -->
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-lg max-w-none">
            <!-- Éditeur du site -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Éditeur du site
            </h2>
            <p class="text-gray-700 mb-4">
              Le site est édité par :<br>
              <strong>${data.name}</strong><br>
              ${data.activity}<br>
              ${data.contact.address ? `${data.contact.address}<br>` : ''}
              ${data.zipCode ? data.zipCode + ' ' : ''}${data.city}<br>
              <br>
              Téléphone : ${data.contact.phone}<br>
              Email : ${data.contact.email}
            </p>

            <!-- Hébergeur -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Hébergeur
            </h2>
            <p class="text-gray-700 mb-4">
              Le site est hébergé par :<br>
              <strong>Vercel Inc.</strong><br>
              340 S Lemon Ave #4133<br>
              Walnut, CA 91789<br>
              États-Unis
            </p>

            <!-- Propriété intellectuelle -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Propriété intellectuelle
            </h2>
            <p class="text-gray-700 mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p class="text-gray-700 mb-4">
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <!-- Données personnelles -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4" id="rgpd">
              4. Protection des données personnelles (RGPD)
            </h2>
            <p class="text-gray-700 mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
              4.1. Collecte des données
            </h3>
            <p class="text-gray-700 mb-4">
              Les données personnelles collectées sur ce site sont les suivantes :
            </p>
            <ul class="list-disc pl-6 mb-4 text-gray-700">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Message et informations relatives à votre demande</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
              4.2. Finalité du traitement
            </h3>
            <p class="text-gray-700 mb-4">
              Les données collectées sont utilisées uniquement pour :
            </p>
            <ul class="list-disc pl-6 mb-4 text-gray-700">
              <li>Répondre à vos demandes de contact ou de devis</li>
              <li>Gérer la relation client</li>
              <li>Améliorer nos services</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
              4.3. Conservation des données
            </h3>
            <p class="text-gray-700 mb-4">
              Vos données sont conservées pendant une durée n'excédant pas 3 ans à compter de notre dernier contact.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
              4.4. Vos droits
            </h3>
            <p class="text-gray-700 mb-4">
              Vous pouvez exercer vos droits en nous contactant :
            </p>
            <ul class="list-disc pl-6 mb-4 text-gray-700">
              <li>Par email : ${data.contact.email}</li>
              <li>Par téléphone : ${data.contact.phone}</li>
              ${data.contact.address ? `<li>Par courrier : ${data.contact.address}, ${data.zipCode ? data.zipCode + ' ' : ''}${data.city}</li>` : ''}
            </ul>

            <!-- Cookies -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Cookies
            </h2>
            <p class="text-gray-700 mb-4">
              Ce site n'utilise pas de cookies de traçage. Seuls des cookies techniques essentiels au bon fonctionnement du site peuvent être utilisés.
            </p>

            <!-- Responsabilité -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Limitation de responsabilité
            </h2>
            <p class="text-gray-700 mb-4">
              ${data.name} ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p class="text-gray-700 mb-4">
              ${data.name} ne pourra également être tenu responsable des dommages indirects consécutifs à l'utilisation du site.
            </p>

            <!-- Droit applicable -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Droit applicable et juridiction compétente
            </h2>
            <p class="text-gray-700 mb-4">
              Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
            </p>

            <!-- Crédits -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              8. Crédits
            </h2>
            <p class="text-gray-700 mb-4">
              Site web créé avec le générateur de sites pour artisans.
            </p>

            <!-- Date de mise à jour -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <p class="text-sm text-gray-600">
                <strong>Dernière mise à jour :</strong> ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Contact -->
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Une question sur vos données ?
          </h2>
          <p class="text-gray-700 mb-6">
            N'hésitez pas à nous contacter pour toute question relative à la protection de vos données personnelles.
          </p>
          <a
            href="/contact"
            class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>
    `;

    const seo = this.getSEO(data, aiContent);

    return generateBaseHTML({
      title: seo.title,
      seo,
      content,
      formData: data,
      currentPage: 'legal',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return generateSEOMetadata('legal', data, aiContent);
  },

  getStructuredData(data: FormData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Mentions légales',
      description: `Mentions légales de ${data.name}`,
    };
  },
};
