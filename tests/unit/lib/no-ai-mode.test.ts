import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateSiteContent } from '@/lib/claude-api';
import { generateSite } from '@/lib/generator';
import type { FormData } from '@/types/generator';

describe('NO_AI Mode', () => {
  const mockFormData: FormData = {
    name: 'Test Plombier',
    activity: 'Plombier',
    city: 'Bruxelles',
    zipCode: '1000',
    description: 'Test description',
    services: ['Réparation', 'Installation'],
    contact: {
      phone: '+32 470 00 00 00',
      email: 'test@example.com',
      address: 'Rue de Test 123',
    },
    colors: {
      primary: '#1E40AF',
      secondary: '#60A5FA',
    },
    style: 'moderne',
  };

  let originalEnv: string | undefined;

  beforeEach(() => {
    // Sauvegarder la valeur originale de NO_AI
    originalEnv = process.env.NO_AI;
  });

  afterEach(() => {
    // Restaurer la valeur originale
    if (originalEnv === undefined) {
      delete process.env.NO_AI;
    } else {
      process.env.NO_AI = originalEnv;
    }
  });

  describe('generateSiteContent avec NO_AI=true', () => {
    it('should generate fallback content when NO_AI is true', async () => {
      process.env.NO_AI = 'true';

      const content = await generateSiteContent(mockFormData);

      // Vérifier que le contenu est généré
      expect(content).toBeDefined();
      expect(content.home).toBeDefined();
      expect(content.about).toBeDefined();
      expect(content.servicesContent).toBeDefined();
      expect(content.pricing).toBeDefined();
      expect(content.testimonials).toBeDefined();
      expect(content.seo).toBeDefined();
    });

    it('should include formData values in fallback content', async () => {
      process.env.NO_AI = 'true';

      const content = await generateSiteContent(mockFormData);

      // Vérifier que les données du formulaire sont utilisées
      expect(content.home.h1).toContain(mockFormData.activity);
      expect(content.home.h1).toContain(mockFormData.city);
      expect(content.about.h1).toContain(mockFormData.name);
      expect(content.seo.metaDescription).toContain(mockFormData.activity);
      expect(content.seo.metaDescription).toContain(mockFormData.city);
    });

    it('should generate services from formData.services', async () => {
      process.env.NO_AI = 'true';

      const content = await generateSiteContent(mockFormData);

      // Vérifier que les services sont générés
      expect(content.servicesContent).toHaveLength(mockFormData.services.length);
      expect(content.servicesContent[0].name).toBe(mockFormData.services[0]);
      expect(content.servicesContent[1].name).toBe(mockFormData.services[1]);
    });

    it('should generate testimonials', async () => {
      process.env.NO_AI = 'true';

      const content = await generateSiteContent(mockFormData);

      // Vérifier que les témoignages sont générés
      expect(content.testimonials).toBeDefined();
      expect(content.testimonials.length).toBeGreaterThan(0);
      expect(content.testimonials[0].rating).toBe(5);
    });

    it('should generate SEO data with keywords', async () => {
      process.env.NO_AI = 'true';

      const content = await generateSiteContent(mockFormData);

      // Vérifier que les données SEO sont générées
      expect(content.seo.keywords).toBeDefined();
      expect(content.seo.keywords).toContain(mockFormData.activity);
      expect(content.seo.keywords).toContain(mockFormData.city);
      expect(content.seo.metaDescription).toBeDefined();
      expect(content.seo.ogDescription).toBeDefined();
    });
  });

  describe('generateSite avec NO_AI=true', () => {
    it('should generate complete site without calling Anthropic API', async () => {
      process.env.NO_AI = 'true';

      const site = await generateSite(mockFormData, {
        generateImages: false,
        autoDeployVercel: false,
      });

      // Vérifier que le site est généré
      expect(site).toBeDefined();
      expect(site.clientId).toBeDefined();
      expect(site.formData).toEqual(mockFormData);
      expect(site.pages).toBeDefined();
      expect(site.files).toBeDefined();
    });

    it('should generate all required pages', async () => {
      process.env.NO_AI = 'true';

      const site = await generateSite(mockFormData, {
        generateImages: false,
        autoDeployVercel: false,
      });

      // Vérifier que toutes les pages sont générées
      expect(site.pages.home).toBeDefined();
      expect(site.pages.about).toBeDefined();
      expect(site.pages.services).toBeDefined();
      expect(site.pages.pricing).toBeDefined();
      expect(site.pages.contact).toBeDefined();
      expect(site.pages.legal).toBeDefined();

      // Vérifier que les pages contiennent du HTML
      expect(site.pages.home).toContain('<!DOCTYPE html>');
      expect(site.pages.about).toContain('<!DOCTYPE html>');
    });

    it('should generate required files (sitemap, robots)', async () => {
      process.env.NO_AI = 'true';

      const site = await generateSite(mockFormData, {
        generateImages: false,
        autoDeployVercel: false,
      });

      // Vérifier que les fichiers sont générés
      const fileNames = site.files.map((f) => f.path);
      expect(fileNames).toContain('sitemap.xml');
      expect(fileNames).toContain('robots.txt');
    });

    it('should include formData in generated pages', async () => {
      process.env.NO_AI = 'true';

      const site = await generateSite(mockFormData, {
        generateImages: false,
        autoDeployVercel: false,
      });

      // Vérifier que les données du formulaire sont dans les pages
      expect(site.pages.home).toContain(mockFormData.name);
      expect(site.pages.contact).toContain(mockFormData.contact.email);
      expect(site.pages.contact).toContain(mockFormData.contact.phone);
    });
  });

  describe('NO_AI mode comportement', () => {
    it('should use AI when NO_AI is false', async () => {
      process.env.NO_AI = 'false';

      // Ce test vérifie simplement que la fonction ne plante pas
      // En environnement de test, l'API key est mockée, donc on peut avoir un fallback
      const content = await generateSiteContent(mockFormData);
      expect(content).toBeDefined();
    });

    it('should use AI when NO_AI is not set', async () => {
      delete process.env.NO_AI;

      // Ce test vérifie simplement que la fonction ne plante pas
      const content = await generateSiteContent(mockFormData);
      expect(content).toBeDefined();
    });

    it('should handle NO_AI with different values', async () => {
      // Test avec "true"
      process.env.NO_AI = 'true';
      let content = await generateSiteContent(mockFormData);
      expect(content).toBeDefined();

      // Test avec valeur vide (équivalent à false)
      process.env.NO_AI = '';
      content = await generateSiteContent(mockFormData);
      expect(content).toBeDefined();

      // Test avec "1" (ne devrait pas activer le mode NO_AI)
      process.env.NO_AI = '1';
      content = await generateSiteContent(mockFormData);
      expect(content).toBeDefined();
    });
  });
});
