/**
 * Utilitaires pour la génération de métadonnées SEO et données structurées
 */

import { FormData, AIGeneratedContent } from '@/types/generator';
import { SEOMetadata, StructuredData } from '@/types/templates';

/**
 * Génère les métadonnées SEO pour une page
 */
export function generateSEOMetadata(
  pageType: 'home' | 'about' | 'services' | 'pricing' | 'contact' | 'legal',
  data: FormData,
  aiContent?: AIGeneratedContent
): SEOMetadata {
  const baseTitle = `${data.name} - ${data.activity} à ${data.city}`;

  const metadata: Record<typeof pageType, SEOMetadata> = {
    home: {
      title: aiContent?.home.h1 || baseTitle,
      description:
        aiContent?.seo.metaDescription ||
        `${data.activity} professionnel à ${data.city}. ${data.services.slice(0, 3).join(', ')}. Devis gratuit et intervention rapide.`,
      keywords: [
        data.activity,
        data.city,
        ...data.services,
        'professionnel',
        'devis gratuit',
        'intervention rapide',
      ],
      ogTitle: baseTitle,
      ogDescription: aiContent?.seo.ogDescription,
    },
    about: {
      title: `À propos - ${baseTitle}`,
      description: `Découvrez ${data.name}, ${data.activity} professionnel à ${data.city}. Expertise, savoir-faire et engagement qualité.`,
      keywords: [data.activity, data.city, 'à propos', 'expertise', 'professionnel'],
      ogTitle: `À propos de ${data.name}`,
    },
    services: {
      title: `Nos services - ${baseTitle}`,
      description: `Services de ${data.activity} à ${data.city} : ${data.services.join(', ')}. Interventions professionnelles et garanties.`,
      keywords: [data.activity, data.city, 'services', ...data.services],
      ogTitle: `Services de ${data.activity}`,
    },
    pricing: {
      title: `Tarifs - ${baseTitle}`,
      description: `Tarifs et devis pour ${data.activity} à ${data.city}. Prix transparents et compétitifs. Devis gratuit sans engagement.`,
      keywords: [data.activity, data.city, 'tarifs', 'prix', 'devis gratuit'],
      ogTitle: `Tarifs ${data.activity}`,
    },
    contact: {
      title: `Contact - ${baseTitle}`,
      description: `Contactez ${data.name}, ${data.activity} à ${data.city}. ${data.contact.phone} - ${data.contact.email}. Réponse rapide garantie.`,
      keywords: [data.activity, data.city, 'contact', 'devis', 'téléphone'],
      ogTitle: `Contactez ${data.name}`,
    },
    legal: {
      title: `Mentions légales - ${baseTitle}`,
      description: `Mentions légales et informations légales de ${data.name}, ${data.activity} à ${data.city}.`,
      keywords: [data.activity, data.city, 'mentions légales', 'rgpd'],
      ogTitle: 'Mentions légales',
    },
  };

  return metadata[pageType];
}

/**
 * Génère les données structurées Schema.org pour LocalBusiness
 */
export function generateLocalBusinessSchema(data: FormData): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description || `${data.activity} professionnel à ${data.city}`,
    telephone: data.contact.phone,
    email: data.contact.email,
    address: data.contact.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.contact.address,
          addressLocality: data.city,
          postalCode: data.zipCode,
          addressCountry: 'FR',
        }
      : undefined,
    url: process.env.NEXT_PUBLIC_APP_URL,
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-18:00',
    areaServed: {
      '@type': 'City',
      name: data.city,
    },
  };
}

/**
 * Génère les données structurées pour un service
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  data: FormData
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: data.name,
      telephone: data.contact.phone,
      email: data.contact.email,
    },
    areaServed: {
      '@type': 'City',
      name: data.city,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: data.contact.phone,
        contactType: 'Customer Service',
      },
    },
  };
}

/**
 * Génère les données structurées pour la page À propos
 */
export function generateAboutPageSchema(data: FormData): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: data.name,
      jobTitle: data.activity,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.city,
        addressCountry: 'FR',
      },
      telephone: data.contact.phone,
      email: data.contact.email,
    },
  };
}

/**
 * Génère les données structurées pour la page de contact
 */
export function generateContactPageSchema(data: FormData): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: data.contact.phone,
      email: data.contact.email,
      areaServed: 'FR',
      availableLanguage: data.languages,
    },
  };
}

/**
 * Génère le sitemap.xml complet
 */
export function generateSitemap(clientId: string, baseUrl: string): string {
  const pages = ['', 'about', 'services', 'pricing', 'contact', 'legal'];
  const now = new Date().toISOString();

  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Génère le robots.txt
 */
export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

/**
 * Génère les balises meta HTML pour une page
 */
export function generateMetaTags(seo: SEOMetadata): string {
  return `
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${seo.keywords.join(', ')}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${seo.ogTitle || seo.title}" />
    <meta property="og:description" content="${seo.ogDescription || seo.description}" />
    ${seo.ogImage ? `<meta property="og:image" content="${seo.ogImage}" />` : ''}

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${seo.ogTitle || seo.title}" />
    <meta property="twitter:description" content="${seo.ogDescription || seo.description}" />
    ${seo.ogImage ? `<meta property="twitter:image" content="${seo.ogImage}" />` : ''}

    ${seo.canonical ? `<link rel="canonical" href="${seo.canonical}" />` : ''}
  `.trim();
}

/**
 * Génère le script de données structurées pour insertion dans HTML
 */
export function generateStructuredDataScript(data: StructuredData | StructuredData[]): string {
  const jsonData = Array.isArray(data) ? data : [data];
  return `
    <script type="application/ld+json">
      ${JSON.stringify(jsonData, null, 2)}
    </script>
  `.trim();
}
