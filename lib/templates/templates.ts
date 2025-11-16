/**
 * Templates System
 *
 * Provides a modular, extensible template system for mini-site generation.
 * Each template includes HTML structure, CSS styling, and preview images.
 */

import fs from 'fs';
import path from 'path';

export const TEMPLATES = [
  'default',
  'electrician',
  'plumber',
  'coach',
  'psychologist',
  'lawyer',
] as const;

export type TemplateName = typeof TEMPLATES[number];

export interface TemplateDefinition {
  name: TemplateName;
  displayName: string;
  description: string;
  color: string; // Primary color for this template
  files: {
    [path: string]: string; // Path -> Content
  };
  previewImage?: string;
  category: 'general' | 'artisan' | 'professional' | 'wellness';
}

/**
 * Template metadata
 */
const TEMPLATE_METADATA: Record<TemplateName, Omit<TemplateDefinition, 'files'>> = {
  default: {
    name: 'default',
    displayName: 'Classique',
    description: 'Template moderne et polyvalent. Parfait pour tous types d\'activités professionnelles.',
    color: '#0ea5e9',
    previewImage: '/templates/default-preview.png',
    category: 'general',
  },
  electrician: {
    name: 'electrician',
    displayName: 'Électricien',
    description: 'Design professionnel optimisé pour électriciens. Couleurs électriques, icônes techniques.',
    color: '#eab308',
    previewImage: '/templates/electrician-preview.png',
    category: 'artisan',
  },
  plumber: {
    name: 'plumber',
    displayName: 'Plombier',
    description: 'Template conçu pour plombiers. Palette bleue aquatique, visuels adaptés.',
    color: '#06b6d4',
    previewImage: '/templates/plumber-preview.png',
    category: 'artisan',
  },
  coach: {
    name: 'coach',
    displayName: 'Coach',
    description: 'Design inspirant pour coachs professionnels. Tons motivants, mise en avant des services.',
    color: '#f59e0b',
    previewImage: '/templates/coach-preview.png',
    category: 'wellness',
  },
  psychologist: {
    name: 'psychologist',
    displayName: 'Psychologue',
    description: 'Template apaisant pour professionnels de la santé mentale. Tons doux, design rassurant.',
    color: '#8b5cf6',
    previewImage: '/templates/psychologist-preview.png',
    category: 'wellness',
  },
  lawyer: {
    name: 'lawyer',
    displayName: 'Avocat',
    description: 'Design sobre et professionnel pour avocats. Tons sérieux, crédibilité maximale.',
    color: '#1e293b',
    previewImage: '/templates/lawyer-preview.png',
    category: 'professional',
  },
};

/**
 * Get template definition by name
 */
export function getTemplate(name: TemplateName): TemplateDefinition {
  const metadata = TEMPLATE_METADATA[name];
  const templateDir = path.join(process.cwd(), 'lib', 'templates', name);

  // Load template files
  const files: Record<string, string> = {};

  try {
    // Load index.html
    const indexPath = path.join(templateDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      files['index.html'] = fs.readFileSync(indexPath, 'utf-8');
    }

    // Load styles.css
    const stylesPath = path.join(templateDir, 'styles.css');
    if (fs.existsSync(stylesPath)) {
      files['styles.css'] = fs.readFileSync(stylesPath, 'utf-8');
    }

    // Additional pages could be loaded here in the future
    // e.g., about.html, services.html, etc.
  } catch (error) {
    console.error(`Error loading template ${name}:`, error);
  }

  return {
    ...metadata,
    files,
  };
}

/**
 * Get all available templates
 */
export function getAllTemplates(): TemplateDefinition[] {
  return TEMPLATES.map(name => getTemplate(name));
}

/**
 * Get template by category
 */
export function getTemplatesByCategory(category: TemplateDefinition['category']): TemplateDefinition[] {
  return getAllTemplates().filter(t => t.category === category);
}

/**
 * Validate if a template name is valid
 */
export function isValidTemplate(name: string): name is TemplateName {
  return TEMPLATES.includes(name as TemplateName);
}

/**
 * Get default template
 */
export function getDefaultTemplate(): TemplateDefinition {
  return getTemplate('default');
}

/**
 * Inject content into template placeholders
 * Replaces {{variable}} with actual content
 */
export function injectTemplateContent(
  templateHtml: string,
  data: {
    title?: string;
    description?: string;
    seo_tags?: string;
    business_name?: string;
    hero_title?: string;
    hero_subtitle?: string;
    services_content?: string;
    about_content?: string;
    phone?: string;
    email?: string;
    address?: string;
    year?: string;
    [key: string]: string | undefined;
  }
): string {
  let result = templateHtml;

  // Replace all placeholders
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(placeholder, value);
    }
  }

  // Replace any remaining placeholders with empty string
  result = result.replace(/\{\{[^}]+\}\}/g, '');

  return result;
}
