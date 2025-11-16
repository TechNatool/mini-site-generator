/**
 * Intégration avec Claude API pour la génération de contenu
 */

import Anthropic from '@anthropic-ai/sdk';
import { FormData, AIGeneratedContent } from '@/types/generator';

// Vérifier que la clé API est présente
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.warn('[Claude API] ANTHROPIC_API_KEY non définie');
}

const anthropic = new Anthropic({
  apiKey: apiKey || '',
});

const MODEL = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';

/**
 * Génère tout le contenu du site via Claude API
 */
export async function generateSiteContent(formData: FormData): Promise<AIGeneratedContent> {
  // Mode NO_AI : utiliser directement le fallback content sans appeler l'API
  if (process.env.NO_AI === 'true') {
    console.log('[Claude API] 🚫 Mode NO_AI activé → contenu de fallback utilisé (aucune requête Anthropic)');
    return generateFallbackContent(formData);
  }

  const prompt = buildContentGenerationPrompt(formData);

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extraire le contenu de la réponse
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Réponse Claude API invalide');
    }

    return parseAIResponse(content.text, formData);
  } catch (error) {
    console.error('[Claude API] Erreur lors de la génération de contenu:', error);
    // Retourner un contenu par défaut en cas d'erreur
    return generateFallbackContent(formData);
  }
}

/**
 * Construit le prompt pour la génération de contenu
 */
function buildContentGenerationPrompt(formData: FormData): string {
  return `Tu es un expert en copywriting pour sites web d'artisans. Tu dois générer du contenu SEO optimisé, professionnel et convaincant.

INFORMATIONS CLIENT :
- Nom : ${formData.name}
- Activité : ${formData.activity}
- Ville : ${formData.city}
- Services : ${formData.services.join(', ')}
- Style : ${formData.style}
${formData.description ? `- Description : ${formData.description}` : ''}

INSTRUCTIONS :
Génère du contenu au format JSON avec cette structure exacte :

{
  "home": {
    "h1": "Titre accrocheur pour la page d'accueil (max 60 caractères)",
    "tagline": "Sous-titre percutant (max 100 caractères)",
    "introduction": "Paragraphe d'introduction convaincant (150-200 mots)",
    "cta": "Texte du bouton d'appel à l'action"
  },
  "about": {
    "h1": "Titre de la page À propos",
    "introduction": "Paragraphe de présentation personnelle (100-150 mots)",
    "expertise": "Paragraphe sur l'expertise et l'expérience (100-150 mots)",
    "values": ["Valeur 1", "Valeur 2", "Valeur 3"],
    "certifications": ["Certification 1", "Certification 2"]
  },
  "servicesContent": [
    {
      "name": "Nom du service 1",
      "description": "Description détaillée du service (80-120 mots)",
      "benefits": ["Bénéfice 1", "Bénéfice 2", "Bénéfice 3"]
    }
    // ... pour chaque service de la liste
  ],
  "pricing": {
    "h1": "Titre de la page tarifs",
    "introduction": "Introduction sur la politique tarifaire (80-100 mots)",
    "priceRanges": [
      {
        "service": "Service 1",
        "range": "À partir de XX€"
      }
    ]
  },
  "testimonials": [
    {
      "name": "Prénom N. (initiale du nom)",
      "text": "Témoignage réaliste et crédible (50-80 mots)",
      "rating": 5
    },
    {
      "name": "Prénom M.",
      "text": "Autre témoignage",
      "rating": 5
    },
    {
      "name": "Prénom P.",
      "text": "Troisième témoignage",
      "rating": 5
    }
  ],
  "seo": {
    "metaDescription": "Meta description optimisée (150-160 caractères)",
    "keywords": ["mot-clé 1", "mot-clé 2", "mot-clé 3", "etc."],
    "ogDescription": "Description pour Open Graph (120-150 caractères)"
  }
}

CONSIGNES IMPORTANTES :
- Utilise un ton professionnel mais accessible
- Intègre naturellement les mots-clés SEO
- Reste factuel et crédible (pas de superlatifs excessifs)
- Personnalise en fonction de l'activité et de la ville
- Les témoignages doivent sembler authentiques
- Génère un service détaillé pour chaque service de la liste
- Respecte STRICTEMENT le format JSON

Retourne UNIQUEMENT le JSON, sans texte avant ou après.`;
}

/**
 * Parse la réponse de Claude API
 */
function parseAIResponse(response: string, formData: FormData): AIGeneratedContent {
  try {
    // Nettoyer la réponse (enlever les backticks markdown si présents)
    const cleanedResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleanedResponse);

    // Validation basique
    if (!parsed.home || !parsed.about || !parsed.servicesContent) {
      throw new Error('Structure JSON invalide');
    }

    return parsed as AIGeneratedContent;
  } catch (error) {
    console.error('[Claude API] Erreur lors du parsing de la réponse:', error);
    console.error('[Claude API] Réponse brute:', response);
    return generateFallbackContent(formData);
  }
}

/**
 * Génère un contenu de secours si l'API échoue
 */
function generateFallbackContent(formData: FormData): AIGeneratedContent {
  return {
    home: {
      h1: `${formData.activity} professionnel à ${formData.city}`,
      tagline: `${formData.name} - Votre expert en ${formData.activity}`,
      introduction: `Bienvenue ! ${formData.name} est votre ${formData.activity} de confiance à ${formData.city}. Avec plusieurs années d'expérience, nous mettons notre expertise à votre service pour tous vos projets. Intervention rapide, travail soigné et devis gratuit.`,
      cta: 'Demander un devis gratuit',
    },
    about: {
      h1: `À propos de ${formData.name}`,
      introduction: `${formData.name} est un ${formData.activity} professionnel basé à ${formData.city}. Passionné par mon métier, je mets mon savoir-faire au service de mes clients particuliers et professionnels.`,
      expertise: `Fort de plusieurs années d'expérience dans le domaine du ${formData.activity}, j'ai développé une expertise reconnue. Je suis régulièrement formé aux nouvelles techniques et réglementations pour vous garantir des prestations de qualité.`,
      values: ['Professionnalisme', 'Ponctualité', 'Qualité du travail', 'Transparence'],
      certifications: ['Certifié RGE', 'Assurance décennale'],
    },
    servicesContent: formData.services.map((service) => ({
      name: service,
      description: `Service professionnel de ${service.toLowerCase()} à ${formData.city}. Nous intervenons rapidement pour tous vos besoins. Devis gratuit et conseils personnalisés.`,
      benefits: [
        'Intervention rapide',
        'Travail soigné et garanti',
        'Matériel professionnel',
        'Prix compétitifs',
      ],
    })),
    pricing: {
      h1: `Tarifs ${formData.activity} à ${formData.city}`,
      introduction: `Nos tarifs sont transparents et compétitifs. Chaque projet est unique, c'est pourquoi nous établissons un devis personnalisé gratuit et sans engagement.`,
      priceRanges: formData.services.map((service) => ({
        service: service,
        range: 'Sur devis',
      })),
    },
    testimonials: [
      {
        name: 'Marie L.',
        text: `Excellent travail réalisé par ${formData.name}. Professionnel, ponctuel et très compétent. Je recommande vivement !`,
        rating: 5,
      },
      {
        name: 'Thomas D.',
        text: `Très satisfait de la prestation. Travail soigné et dans les délais annoncés. Un vrai professionnel.`,
        rating: 5,
      },
      {
        name: 'Sophie M.',
        text: `Je recommande les yeux fermés ! Excellent rapport qualité-prix et un travail impeccable.`,
        rating: 5,
      },
    ],
    seo: {
      metaDescription: `${formData.name}, ${formData.activity} professionnel à ${formData.city}. ${formData.services.slice(0, 2).join(', ')}. Devis gratuit et intervention rapide.`,
      keywords: [
        formData.activity,
        formData.city,
        ...formData.services,
        'professionnel',
        'devis gratuit',
      ],
      ogDescription: `Votre ${formData.activity} de confiance à ${formData.city}. Expertise et qualité garanties.`,
    },
  };
}

/**
 * Génère des suggestions de visuels (descriptions pour génération d'images)
 */
export async function generateImagePrompts(
  activity: string,
  style: string
): Promise<{ hero: string; about: string; services: string }> {
  // Mode NO_AI : retourner directement le fallback sans appeler l'API
  if (process.env.NO_AI === 'true') {
    console.log('[Claude API] 🚫 Mode NO_AI activé → prompts images par défaut (aucune requête Anthropic)');
    return {
      hero: `Professional ${activity} at work, modern and clean`,
      about: `Portrait of professional ${activity}, friendly and trustworthy`,
      services: `${activity} tools and equipment, professional setup`,
    };
  }

  const prompt = `Génère 3 descriptions courtes pour des images professionnelles d'un site web de ${activity}.
Style : ${style}

Format JSON :
{
  "hero": "Description pour l'image hero de la page d'accueil",
  "about": "Description pour l'image de la page à propos",
  "services": "Description pour l'image de la section services"
}

Les descriptions doivent être professionnelles, modernes et adaptées à l'activité.
Retourne UNIQUEMENT le JSON.`;

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Réponse invalide');
    }

    const cleanedResponse = content.text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('[Claude API] Erreur génération prompts images:', error);
    return {
      hero: `Professional ${activity} at work, modern and clean`,
      about: `Portrait of professional ${activity}, friendly and trustworthy`,
      services: `${activity} tools and equipment, professional setup`,
    };
  }
}
