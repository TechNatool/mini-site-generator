/**
 * Analyseur de score SEO pour le contenu généré
 */

export interface SEOAnalysis {
  score: number; // 0 à 100
  keywordDensity: number; // Pourcentage
  readability: number; // Score de lisibilité
  headersCount: number; // Nombre de headers détectés
  suggestions: string[]; // Suggestions d'amélioration
}

/**
 * Analyse le contenu et calcule un score SEO
 */
export function analyzeSEO(text: string, keywords: string[] = []): SEOAnalysis {
  const suggestions: string[] = [];
  let score = 0;

  // 1. Analyser la densité des mots-clés (max 25 points)
  const keywordDensity = calculateKeywordDensity(text, keywords);
  if (keywordDensity > 0 && keywordDensity < 3) {
    score += 25;
  } else if (keywordDensity >= 3 && keywordDensity <= 5) {
    score += 20;
  } else if (keywordDensity > 5) {
    score += 10;
    suggestions.push('Keyword density too high (over-optimization risk)');
  } else {
    score += 5;
    suggestions.push('No keywords found in content');
  }

  // 2. Analyser la lisibilité (max 25 points)
  const readability = calculateReadability(text);
  if (readability >= 60) {
    score += 25;
  } else if (readability >= 40) {
    score += 15;
    suggestions.push('Content readability could be improved');
  } else {
    score += 5;
    suggestions.push('Content is difficult to read, simplify sentences');
  }

  // 3. Analyser les headers (max 25 points)
  const headersCount = countHeaders(text);
  if (headersCount >= 3) {
    score += 25;
  } else if (headersCount >= 1) {
    score += 15;
    suggestions.push('Add more headers (H2, H3) to structure content');
  } else {
    score += 5;
    suggestions.push('No headers detected, add H1, H2, H3 tags');
  }

  // 4. Analyser la longueur du contenu (max 25 points)
  const wordCount = countWords(text);
  if (wordCount >= 300) {
    score += 25;
  } else if (wordCount >= 150) {
    score += 15;
    suggestions.push('Content is short, consider adding more details');
  } else {
    score += 5;
    suggestions.push('Content is too short for good SEO (< 150 words)');
  }

  // Ajouter des suggestions générales
  if (score < 60) {
    suggestions.push('Overall SEO score is low, consider optimizing content');
  }

  // Log le résultat
  console.log(`[SEO] Score: ${score}/100 (keywords: ${keywordDensity.toFixed(1)}%, readability: ${readability.toFixed(1)}, headers: ${headersCount})`);

  return {
    score,
    keywordDensity,
    readability,
    headersCount,
    suggestions,
  };
}

/**
 * Calcule la densité des mots-clés dans le texte (en pourcentage)
 */
function calculateKeywordDensity(text: string, keywords: string[]): number {
  if (keywords.length === 0) return 0;

  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  let keywordMatches = 0;
  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      keywordMatches += matches.length;
    }
  }

  return (keywordMatches / totalWords) * 100;
}

/**
 * Calcule un score de lisibilité basé sur la longueur des phrases
 * Score de 0 à 100 (plus élevé = plus lisible)
 */
function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  if (sentences.length === 0) return 0;

  const words = text.split(/\s+/).filter((w) => w.trim().length > 0);
  const avgWordsPerSentence = words.length / sentences.length;

  // Score basé sur la longueur moyenne des phrases
  // Idéal : 15-20 mots par phrase
  if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) {
    return 100;
  } else if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) {
    return 80;
  } else if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 30) {
    return 60;
  } else if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 35) {
    return 40;
  } else {
    return 20;
  }
}

/**
 * Compte le nombre de headers dans le texte (h1, h2, h3, etc.)
 */
function countHeaders(text: string): number {
  const headerRegex = /<h[1-6][^>]*>/gi;
  const matches = text.match(headerRegex);
  return matches ? matches.length : 0;
}

/**
 * Compte le nombre de mots dans le texte
 */
function countWords(text: string): number {
  // Retirer les balises HTML
  const cleanText = text.replace(/<[^>]*>/g, ' ');
  const words = cleanText.split(/\s+/).filter((w) => w.trim().length > 0);
  return words.length;
}
