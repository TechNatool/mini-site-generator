import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateSiteContent } from '@/lib/claude-api';
import { deleteSEOSettings } from '@/lib/seo-config';
import type { FormData } from '@/types/generator';

describe('Local AI Provider', () => {
  const mockFormData: FormData = {
    name: 'Test Plombier Local',
    activity: 'Plombier',
    city: 'Bruxelles',
    zipCode: '1000',
    description: 'Test local AI description',
    services: ['Réparation', 'Installation', 'Maintenance'],
    contact: {
      phone: '+32 470 00 00 00',
      email: 'test@localai.com',
      address: 'Rue Locale 456',
    },
    colors: {
      primary: '#1E40AF',
      secondary: '#60A5FA',
    },
    style: 'modern',
    languages: ['fr'],
  };

  let originalEnv: {
    NO_AI?: string;
    AI_PROVIDER?: string;
    OLLAMA_URL?: string;
    LOCAL_AI_MODEL?: string;
  };

  beforeEach(async () => {
    // Sauvegarder les valeurs originales
    originalEnv = {
      NO_AI: process.env.NO_AI,
      AI_PROVIDER: process.env.AI_PROVIDER,
      OLLAMA_URL: process.env.OLLAMA_URL,
      LOCAL_AI_MODEL: process.env.LOCAL_AI_MODEL,
    };

    // Nettoyer le fichier SEO config avant chaque test
    try {
      await deleteSEOSettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }

    // Reset fetch mock
    global.fetch = vi.fn();
  });

  afterEach(async () => {
    // Restaurer les valeurs originales
    if (originalEnv.NO_AI === undefined) {
      delete process.env.NO_AI;
    } else {
      process.env.NO_AI = originalEnv.NO_AI;
    }
    if (originalEnv.AI_PROVIDER === undefined) {
      delete process.env.AI_PROVIDER;
    } else {
      process.env.AI_PROVIDER = originalEnv.AI_PROVIDER;
    }
    if (originalEnv.OLLAMA_URL === undefined) {
      delete process.env.OLLAMA_URL;
    } else {
      process.env.OLLAMA_URL = originalEnv.OLLAMA_URL;
    }
    if (originalEnv.LOCAL_AI_MODEL === undefined) {
      delete process.env.LOCAL_AI_MODEL;
    } else {
      process.env.LOCAL_AI_MODEL = originalEnv.LOCAL_AI_MODEL;
    }

    // Nettoyer le fichier SEO config
    try {
      await deleteSEOSettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }

    vi.restoreAllMocks();
  });

  describe('avec AI_PROVIDER=local', () => {
    it('should use local AI provider when AI_PROVIDER=local', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'local';

      // Mock de la réponse Ollama avec du contenu JSON valide
      const mockResponse = JSON.stringify({
        home: {
          h1: 'Plombier professionnel à Bruxelles',
          tagline: 'Service de plomberie expert',
          introduction: 'Notre service de plomberie offre des solutions professionnelles.',
          cta: 'Contactez-nous',
        },
        about: {
          h1: 'À propos de Test Plombier Local',
          introduction: 'Expert en plomberie depuis des années.',
          expertise: 'Nous maîtrisons tous les aspects de la plomberie.',
          values: ['Qualité', 'Rapidité', 'Fiabilité'],
          certifications: ['Certifié professionnel'],
        },
        servicesContent: [
          {
            name: 'Réparation',
            description: 'Service de réparation rapide et efficace.',
            benefits: ['Rapide', 'Efficace', 'Garanti'],
          },
          {
            name: 'Installation',
            description: 'Installation professionnelle de tous équipements.',
            benefits: ['Professionnel', 'Précis', 'Durable'],
          },
          {
            name: 'Maintenance',
            description: 'Maintenance préventive et curative.',
            benefits: ['Préventif', 'Économique', 'Planifié'],
          },
        ],
        pricing: {
          h1: 'Nos tarifs',
          introduction: 'Tarifs transparents et compétitifs.',
          priceRanges: [
            { service: 'Réparation', range: 'À partir de 50€' },
            { service: 'Installation', range: 'Sur devis' },
            { service: 'Maintenance', range: 'Forfait mensuel' },
          ],
        },
        testimonials: [
          {
            name: 'Jean D.',
            text: 'Excellent service, très professionnel.',
            rating: 5,
          },
          {
            name: 'Marie L.',
            text: 'Rapide et efficace, je recommande.',
            rating: 5,
          },
          {
            name: 'Pierre M.',
            text: 'Très satisfait du travail réalisé.',
            rating: 5,
          },
        ],
        seo: {
          metaDescription: 'Plombier professionnel à Bruxelles - Service rapide et fiable',
          keywords: ['plombier', 'Bruxelles', 'réparation', 'installation'],
          ogDescription: 'Votre plombier de confiance à Bruxelles',
        },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: mockResponse }),
      });

      const content = await generateSiteContent(mockFormData);

      // Vérifier que fetch a été appelé
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/generate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      // Vérifier que le contenu a été généré
      expect(content).toBeDefined();
      expect(content.home).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.servicesContent).toBeDefined();
    });

    it('should use custom OLLAMA_URL when provided', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'local';
      process.env.OLLAMA_URL = 'http://custom-ollama:8080';

      const mockResponse = JSON.stringify({
        home: { h1: 'Test', tagline: 'Test', introduction: 'Test', cta: 'Test' },
        about: {
          h1: 'Test',
          introduction: 'Test',
          expertise: 'Test',
          values: ['Test'],
          certifications: ['Test'],
        },
        servicesContent: [
          { name: 'Test', description: 'Test', benefits: ['Test'] },
        ],
        pricing: {
          h1: 'Test',
          introduction: 'Test',
          priceRanges: [{ service: 'Test', range: 'Test' }],
        },
        testimonials: [{ name: 'Test', text: 'Test', rating: 5 }],
        seo: {
          metaDescription: 'Test',
          keywords: ['test'],
          ogDescription: 'Test',
        },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: mockResponse }),
      });

      await generateSiteContent(mockFormData);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://custom-ollama:8080/api/generate',
        expect.any(Object)
      );
    });

    it('should use custom LOCAL_AI_MODEL when provided', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'local';
      process.env.LOCAL_AI_MODEL = 'llama2';

      const mockResponse = JSON.stringify({
        home: { h1: 'Test', tagline: 'Test', introduction: 'Test', cta: 'Test' },
        about: {
          h1: 'Test',
          introduction: 'Test',
          expertise: 'Test',
          values: ['Test'],
          certifications: ['Test'],
        },
        servicesContent: [
          { name: 'Test', description: 'Test', benefits: ['Test'] },
        ],
        pricing: {
          h1: 'Test',
          introduction: 'Test',
          priceRanges: [{ service: 'Test', range: 'Test' }],
        },
        testimonials: [{ name: 'Test', text: 'Test', rating: 5 }],
        seo: {
          metaDescription: 'Test',
          keywords: ['test'],
          ogDescription: 'Test',
        },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: mockResponse }),
      });

      await generateSiteContent(mockFormData);

      const callArgs = (global.fetch as any).mock.calls[0][1];
      const body = JSON.parse(callArgs.body);
      expect(body.model).toBe('llama2');
    });

    it('should fallback to default content on local AI error', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'local';

      // Mock d'une erreur Ollama
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const content = await generateSiteContent(mockFormData);

      // Vérifier que le contenu de fallback a été utilisé
      expect(content).toBeDefined();
      expect(content.home).toBeDefined();
      expect(content.home.h1).toContain(mockFormData.activity);
      expect(content.home.h1).toContain(mockFormData.city);
    });

    it('should NOT call Claude API when using local provider', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'local';

      const mockResponse = JSON.stringify({
        home: { h1: 'Test', tagline: 'Test', introduction: 'Test', cta: 'Test' },
        about: {
          h1: 'Test',
          introduction: 'Test',
          expertise: 'Test',
          values: ['Test'],
          certifications: ['Test'],
        },
        servicesContent: [
          { name: 'Test', description: 'Test', benefits: ['Test'] },
        ],
        pricing: {
          h1: 'Test',
          introduction: 'Test',
          priceRanges: [{ service: 'Test', range: 'Test' }],
        },
        testimonials: [{ name: 'Test', text: 'Test', rating: 5 }],
        seo: {
          metaDescription: 'Test',
          keywords: ['test'],
          ogDescription: 'Test',
        },
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: mockResponse }),
      });

      await generateSiteContent(mockFormData);

      // Vérifier qu'un seul appel fetch a été fait (vers Ollama, pas Claude)
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('localhost:11434'),
        expect.any(Object)
      );
    });
  });

  describe('AI Provider routing', () => {
    it('should use fallback when NO_AI=true regardless of AI_PROVIDER', async () => {
      process.env.NO_AI = 'true';
      process.env.AI_PROVIDER = 'local';

      const content = await generateSiteContent(mockFormData);

      // Aucun appel fetch ne doit être fait
      expect(global.fetch).not.toHaveBeenCalled();

      // Le contenu de fallback doit être utilisé
      expect(content).toBeDefined();
      expect(content.home.h1).toContain(mockFormData.activity);
    });

    it('should default to claude when AI_PROVIDER is invalid', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'invalid-provider';

      // Le comportement attendu est de fallback vers Claude
      // mais comme on n'a pas de clé API valide, ça va fallback vers le contenu par défaut
      const content = await generateSiteContent(mockFormData);

      expect(content).toBeDefined();
    });

    it('should use claude when AI_PROVIDER=claude', async () => {
      process.env.NO_AI = 'false';
      process.env.AI_PROVIDER = 'claude';

      // On s'attend à ce que Claude soit appelé, mais comme on n'a pas de clé API valide,
      // ça va fallback vers le contenu par défaut
      const content = await generateSiteContent(mockFormData);

      // Aucun appel à Ollama ne doit être fait
      expect(global.fetch).not.toHaveBeenCalled();
      expect(content).toBeDefined();
    });
  });
});
