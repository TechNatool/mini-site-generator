/**
 * Types pour le système de génération de sites
 */

export type ActivityType =
  | 'plombier'
  | 'électricien'
  | 'maçon'
  | 'menuisier'
  | 'peintre'
  | 'carreleur'
  | 'chauffagiste'
  | 'couvreur'
  | 'serrurier'
  | 'autre';

export type SiteStyle = 'modern' | 'classic' | 'minimal';

export type Language = 'fr' | 'en' | 'es' | 'de';

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent?: string;
}

export interface FormData {
  // Informations de base
  name: string;
  activity: ActivityType | string;
  city: string;
  zipCode?: string;

  // Services et offres
  services: string[];
  description?: string;

  // Personnalisation visuelle
  colors: ColorScheme;
  style: SiteStyle;
  template?: string; // Template name (optional - if not provided, uses old multi-page system)

  // Internationalisation
  languages: Language[];

  // Contact
  contact: ContactInfo;

  // Médias (optionnel)
  photos?: File[] | string[];
  logo?: File | string;
}

export interface AIGeneratedContent {
  // Contenu pour la page d'accueil
  home: {
    h1: string;
    tagline: string;
    introduction: string;
    cta: string;
  };

  // Contenu pour la page À propos
  about: {
    h1: string;
    introduction: string;
    expertise: string;
    values: string[];
    certifications?: string[];
  };

  // Contenu pour les services
  servicesContent: Array<{
    name: string;
    description: string;
    benefits: string[];
  }>;

  // Contenu pour les tarifs
  pricing: {
    h1: string;
    introduction: string;
    priceRanges?: Array<{
      service: string;
      range: string;
    }>;
  };

  // Témoignages (générés par IA)
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;

  // SEO
  seo: {
    metaDescription: string;
    keywords: string[];
    ogDescription: string;
  };
}

export interface GeneratedSite {
  clientId: string;
  formData: FormData;
  content: AIGeneratedContent;
  pages: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    contact: string;
    legal: string;
  };
  files: Array<{
    path: string;
    content: string;
  }>;
  createdAt: Date;
}

export interface GenerationOptions {
  generateImages: boolean;
  autoDeployVercel: boolean;
  includeAnalytics?: boolean;
  includeBlog?: boolean;
}

export interface GenerationResult {
  success: boolean;
  clientId: string;
  zipUrl: string;
  previewUrl: string;
  vercelUrl?: string;
  error?: string;
}
