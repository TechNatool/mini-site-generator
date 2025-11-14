/**
 * Types pour les templates de pages
 */

import { FormData, AIGeneratedContent } from './generator';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface PageTemplate {
  /**
   * Génère le contenu HTML de la page
   */
  generateContent(data: FormData, aiContent: AIGeneratedContent): string;

  /**
   * Génère les métadonnées SEO
   */
  getSEO(data: FormData, aiContent?: AIGeneratedContent): SEOMetadata;

  /**
   * Génère les données structurées (schema.org)
   */
  getStructuredData(data: FormData): StructuredData;
}

export interface TemplateSection {
  id: string;
  title?: string;
  content: string;
  className?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface HeroSection {
  h1: string;
  subtitle?: string;
  cta: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  backgroundImage?: string;
}

export interface ServiceCard {
  icon?: string;
  title: string;
  description: string;
  link?: string;
}

export interface TestimonialCard {
  name: string;
  text: string;
  rating: number;
  date?: string;
  avatar?: string;
}

export interface PricingTier {
  name: string;
  price?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface ContactFormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}
