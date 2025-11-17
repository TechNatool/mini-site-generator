/**
 * Onboarding state management
 *
 * Stores user onboarding progress and preferences
 */

export interface OnboardingState {
  userId: string;
  completed: boolean;
  currentStep: number;
  totalSteps: number;
  data: {
    businessCategory?: string;
    templatePreference?: string;
    aiTone?: string;
    goals?: string[];
  };
  startedAt: string;
  completedAt?: string;
  lastUpdated: string;
}

/**
 * Get onboarding state for a user
 */
export function getOnboardingState(userId: string): OnboardingState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(`onboarding_${userId}`);
    if (!stored) return null;

    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading onboarding state:', error);
    return null;
  }
}

/**
 * Initialize onboarding for a user
 */
export function initializeOnboarding(userId: string): OnboardingState {
  const state: OnboardingState = {
    userId,
    completed: false,
    currentStep: 1,
    totalSteps: 4,
    data: {},
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(`onboarding_${userId}`, JSON.stringify(state));
  }

  return state;
}

/**
 * Update onboarding state
 */
export function updateOnboardingState(
  userId: string,
  updates: Partial<OnboardingState>
): OnboardingState {
  const current = getOnboardingState(userId) || initializeOnboarding(userId);

  const updated: OnboardingState = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(`onboarding_${userId}`, JSON.stringify(updated));
  }

  return updated;
}

/**
 * Update onboarding data (partial update)
 */
export function updateOnboardingData(
  userId: string,
  data: Partial<OnboardingState['data']>
): OnboardingState {
  const current = getOnboardingState(userId) || initializeOnboarding(userId);

  return updateOnboardingState(userId, {
    data: { ...current.data, ...data },
  });
}

/**
 * Move to next step
 */
export function nextOnboardingStep(userId: string): OnboardingState {
  const current = getOnboardingState(userId) || initializeOnboarding(userId);

  const nextStep = Math.min(current.currentStep + 1, current.totalSteps);

  return updateOnboardingState(userId, {
    currentStep: nextStep,
  });
}

/**
 * Move to previous step
 */
export function previousOnboardingStep(userId: string): OnboardingState {
  const current = getOnboardingState(userId) || initializeOnboarding(userId);

  const prevStep = Math.max(current.currentStep - 1, 1);

  return updateOnboardingState(userId, {
    currentStep: prevStep,
  });
}

/**
 * Complete onboarding
 */
export function completeOnboarding(userId: string): OnboardingState {
  return updateOnboardingState(userId, {
    completed: true,
    completedAt: new Date().toISOString(),
    currentStep: 0, // Reset
  });
}

/**
 * Reset onboarding
 */
export function resetOnboarding(userId: string): OnboardingState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`onboarding_${userId}`);
  }

  return initializeOnboarding(userId);
}

/**
 * Check if onboarding is complete
 */
export function isOnboardingComplete(userId: string): boolean {
  const state = getOnboardingState(userId);
  return state?.completed || false;
}

/**
 * Get onboarding progress percentage
 */
export function getOnboardingProgress(userId: string): number {
  const state = getOnboardingState(userId);
  if (!state) return 0;
  if (state.completed) return 100;

  return Math.round((state.currentStep / state.totalSteps) * 100);
}

// Business categories
export const BUSINESS_CATEGORIES = [
  { id: 'plombier', label: 'Plombier', icon: '🔧' },
  { id: 'electricien', label: 'Électricien', icon: '⚡' },
  { id: 'macon', label: 'Maçon', icon: '🧱' },
  { id: 'menuisier', label: 'Menuisier', icon: '🪚' },
  { id: 'peintre', label: 'Peintre', icon: '🎨' },
  { id: 'jardinier', label: 'Jardinier', icon: '🌿' },
  { id: 'couvreur', label: 'Couvreur', icon: '🏠' },
  { id: 'chauffagiste', label: 'Chauffagiste', icon: '🔥' },
  { id: 'serrurier', label: 'Serrurier', icon: '🔐' },
  { id: 'vitrier', label: 'Vitrier', icon: '🪟' },
  { id: 'autre', label: 'Autre', icon: '⚙️' },
] as const;

// AI tone options
export const AI_TONES = [
  {
    id: 'professional',
    label: 'Professionnel',
    description: 'Ton formel et crédible pour inspirer confiance',
  },
  {
    id: 'friendly',
    label: 'Amical',
    description: 'Ton chaleureux et accessible pour créer du lien',
  },
  {
    id: 'expert',
    label: 'Expert',
    description: 'Ton technique qui démontre votre expertise',
  },
  {
    id: 'simple',
    label: 'Simple',
    description: 'Ton clair et direct, facile à comprendre',
  },
] as const;

// User goals
export const USER_GOALS = [
  { id: 'visibility', label: 'Augmenter ma visibilité en ligne', icon: '👁️' },
  { id: 'leads', label: 'Générer plus de leads', icon: '📈' },
  { id: 'credibility', label: 'Renforcer ma crédibilité', icon: '⭐' },
  { id: 'portfolio', label: 'Présenter mon portfolio', icon: '🖼️' },
  { id: 'services', label: 'Détailler mes services', icon: '📋' },
  { id: 'contact', label: 'Faciliter la prise de contact', icon: '📞' },
] as const;
