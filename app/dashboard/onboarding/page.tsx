'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getOnboardingState,
  updateOnboardingData,
  nextOnboardingStep,
  previousOnboardingStep,
  completeOnboarding,
  BUSINESS_CATEGORIES,
  AI_TONES,
  USER_GOALS,
} from '@/lib/onboarding-store';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTone, setSelectedTone] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Mock user ID - in real app, get from auth
  const userId = 'user-123';

  useEffect(() => {
    // Load existing state if any
    const state = getOnboardingState(userId);
    if (state) {
      setCurrentStep(state.currentStep);
      if (state.data.businessCategory) setSelectedCategory(state.data.businessCategory);
      if (state.data.templatePreference) setSelectedTemplate(state.data.templatePreference);
      if (state.data.aiTone) setSelectedTone(state.data.aiTone);
      if (state.data.goals) setSelectedGoals(state.data.goals);
    }
  }, [userId]);

  const handleNext = () => {
    // Save current step data
    if (currentStep === 1 && selectedCategory) {
      updateOnboardingData(userId, { businessCategory: selectedCategory });
    } else if (currentStep === 2 && selectedTemplate) {
      updateOnboardingData(userId, { templatePreference: selectedTemplate });
    } else if (currentStep === 3 && selectedTone) {
      updateOnboardingData(userId, { aiTone: selectedTone });
    }

    nextOnboardingStep(userId);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    previousOnboardingStep(userId);
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    updateOnboardingData(userId, { goals: selectedGoals });
    completeOnboarding(userId);
    router.push('/dashboard');
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
    );
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedCategory !== '';
    if (currentStep === 2) return selectedTemplate !== '';
    if (currentStep === 3) return selectedTone !== '';
    if (currentStep === 4) return selectedGoals.length > 0;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Étape {currentStep} sur 4</span>
            <span className="text-sm font-medium text-gray-700">{(currentStep / 4) * 100}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Welcome Step */}
        {currentStep === 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue sur ForgeWeb !</h1>
            <p className="text-lg text-gray-600 mb-8">
              Nous allons vous guider en quelques étapes pour créer votre premier site web professionnel.
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg transition-colors"
            >
              Commencer
            </button>
          </div>
        )}

        {/* Step 1: Business Category */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quelle est votre activité ?</h2>
            <p className="text-gray-600 mb-6">Choisissez la catégorie qui correspond le mieux à votre métier.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {BUSINESS_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-medium text-gray-900">{category.label}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <div />
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Template */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre template</h2>
            <p className="text-gray-600 mb-6">Sélectionnez le style de site qui vous correspond.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'modern', label: 'Moderne', desc: 'Design épuré et contemporain' },
                { id: 'classic', label: 'Classique', desc: 'Style traditionnel et sobre' },
                { id: 'bold', label: 'Audacieux', desc: 'Design marquant et coloré' },
              ].map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    selectedTemplate === template.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 mb-1">{template.label}</div>
                  <div className="text-sm text-gray-600">{template.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AI Tone */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel ton pour votre contenu ?</h2>
            <p className="text-gray-600 mb-6">L'IA utilisera ce ton pour générer vos textes.</p>

            <div className="space-y-4 mb-8">
              {AI_TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTone === tone.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 mb-1">{tone.label}</div>
                  <div className="text-sm text-gray-600">{tone.description}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Goals */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quels sont vos objectifs ?</h2>
            <p className="text-gray-600 mb-6">Sélectionnez un ou plusieurs objectifs (au choix).</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {USER_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedGoals.includes(goal.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{goal.icon}</span>
                    <span className="font-medium text-gray-900">{goal.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
