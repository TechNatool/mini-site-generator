/**
 * Template HTML de base partagé par toutes les pages
 */

import { FormData } from '@/types/generator';
import { SEOMetadata, StructuredData } from '@/types/templates';
import { generateMetaTags, generateStructuredDataScript } from '@/lib/seo';

interface BaseTemplateProps {
  title: string;
  seo: SEOMetadata;
  structuredData?: StructuredData | StructuredData[];
  content: string;
  formData: FormData;
  currentPage?: string;
}

/**
 * Génère le header/navigation
 */
export function generateHeader(formData: FormData, currentPage: string = 'home'): string {
  const navItems = [
    { label: 'Accueil', href: '/', page: 'home' },
    { label: 'À propos', href: '/about', page: 'about' },
    { label: 'Services', href: '/services', page: 'services' },
    { label: 'Tarifs', href: '/pricing', page: 'pricing' },
    { label: 'Contact', href: '/contact', page: 'contact' },
  ];

  const navHTML = navItems
    .map(
      (item) => `
      <a
        href="${item.href}"
        class="px-3 py-2 text-sm font-medium transition-colors hover:text-primary-600 ${
          item.page === currentPage
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-gray-700'
        }"
      >
        ${item.label}
      </a>
    `
    )
    .join('');

  return `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo / Nom -->
          <div class="flex-shrink-0">
            <a href="/" class="text-2xl font-bold text-primary-600">
              ${formData.name}
            </a>
          </div>

          <!-- Navigation Desktop -->
          <div class="hidden md:flex items-center space-x-1">
            ${navHTML}
          </div>

          <!-- CTA -->
          <div class="hidden md:block">
            <a
              href="/contact"
              class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Devis gratuit
            </a>
          </div>

          <!-- Menu mobile button -->
          <div class="md:hidden">
            <button
              id="mobile-menu-button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu mobile -->
        <div id="mobile-menu" class="hidden md:hidden pb-4">
          ${navItems
            .map(
              (item) => `
            <a
              href="${item.href}"
              class="block px-3 py-2 text-base font-medium ${
                item.page === currentPage ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
              } hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              ${item.label}
            </a>
          `
            )
            .join('')}
          <a
            href="/contact"
            class="block px-3 py-2 mt-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md text-center"
          >
            Devis gratuit
          </a>
        </div>
      </nav>
    </header>
  `;
}

/**
 * Génère le footer
 */
export function generateFooter(formData: FormData): string {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- À propos -->
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">${formData.name}</h3>
            <p class="text-sm">
              ${formData.activity} professionnel à ${formData.city}.<br>
              Votre expert de confiance pour tous vos projets.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">Navigation</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/" class="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/about" class="hover:text-white transition-colors">À propos</a></li>
              <li><a href="/services" class="hover:text-white transition-colors">Services</a></li>
              <li><a href="/pricing" class="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="tel:${formData.contact.phone.replace(/\s/g, '')}" class="hover:text-white transition-colors">
                  📞 ${formData.contact.phone}
                </a>
              </li>
              <li>
                <a href="mailto:${formData.contact.email}" class="hover:text-white transition-colors">
                  ✉️ ${formData.contact.email}
                </a>
              </li>
              ${
                formData.contact.address
                  ? `
              <li class="text-sm">
                📍 ${formData.contact.address}
              </li>
              `
                  : ''
              }
            </ul>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="border-t border-gray-800 mt-8 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; ${currentYear} ${formData.name}. Tous droits réservés.</p>
            <div class="mt-4 md:mt-0 space-x-4">
              <a href="/legal" class="hover:text-white transition-colors">Mentions légales</a>
              <a href="/legal#rgpd" class="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Génère la structure HTML complète de la page
 */
export function generateBaseHTML({
  title,
  seo,
  structuredData,
  content,
  formData,
  currentPage = 'home',
}: BaseTemplateProps): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  ${generateMetaTags(seo)}

  ${structuredData ? generateStructuredDataScript(structuredData) : ''}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: ${JSON.stringify(formData.colors.primary)},
            secondary: ${JSON.stringify(formData.colors.secondary)},
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            heading: ['Poppins', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    body {
      font-family: 'Inter', system-ui, sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Poppins', system-ui, sans-serif;
    }
  </style>
</head>
<body class="antialiased">
  ${generateHeader(formData, currentPage)}

  <main>
    ${content}
  </main>

  ${generateFooter(formData)}

  <!-- Script pour le menu mobile -->
  <script>
    document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        menu.classList.toggle('hidden');
      }
    });
  </script>
</body>
</html>`;
}
