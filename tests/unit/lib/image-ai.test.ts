import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  generateImageWithProvider,
  generateAltText,
  buildImagePrompt,
  fallbackImage,
} from '@/lib/image-ai';
import { saveImageSettings, deleteImageSettings } from '@/lib/image-config';

describe('Image AI Generation', () => {
  afterEach(async () => {
    // Nettoyer les settings après chaque test
    try {
      await deleteImageSettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }

    vi.restoreAllMocks();
  });

  describe('generateImageWithProvider()', () => {
    it('should generate fallback image when provider is none', async () => {
      await saveImageSettings({
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      const buffer = await generateImageWithProvider('Test image prompt');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should handle claude provider', async () => {
      await saveImageSettings({
        provider: 'claude',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      const buffer = await generateImageWithProvider('Professional plumber image');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should fallback to placeholder on error', async () => {
      await saveImageSettings({
        provider: 'local',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      // Mock fetch to simulate error
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Connection failed'));

      const buffer = await generateImageWithProvider('Test prompt');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should use default provider when no settings exist', async () => {
      // No settings file, should use default (none)
      const buffer = await generateImageWithProvider('Test prompt');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });
  });

  describe('fallbackImage()', () => {
    it('should generate placeholder buffer', async () => {
      const buffer = await fallbackImage('Test placeholder');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should handle empty prompt', async () => {
      const buffer = await fallbackImage();

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should extract subject from long prompt', async () => {
      const longPrompt =
        'Professional plumber working in modern bathroom with tools and equipment';
      const buffer = await fallbackImage(longPrompt);

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });
  });

  describe('generateAltText()', () => {
    it('should generate alt text with activity and city', () => {
      const altText = generateAltText('Image prompt', {
        activity: 'Plombier',
        city: 'Paris',
        pageName: 'home',
      });

      expect(altText).toContain('Plombier');
      expect(altText).toContain('Paris');
      expect(altText).toBeTruthy();
    });

    it('should include page-specific context', () => {
      const pages = ['home', 'services', 'about', 'contact'];

      for (const pageName of pages) {
        const altText = generateAltText('Test prompt', {
          activity: 'Électricien',
          city: 'Lyon',
          pageName,
        });

        expect(altText).toContain('Électricien');
        expect(altText).toContain('Lyon');
        expect(altText.length).toBeGreaterThan(0);
      }
    });

    it('should handle missing context gracefully', () => {
      const altText = generateAltText('Professional business image', {});

      expect(altText).toBeTruthy();
      expect(altText.length).toBeGreaterThan(0);
    });

    it('should fallback to prompt-based alt text', () => {
      const prompt = 'Beautiful modern office space';
      const altText = generateAltText(prompt, {});

      expect(altText).toBeTruthy();
      expect(altText.length).toBeGreaterThan(0);
    });
  });

  describe('buildImagePrompt()', () => {
    it('should build prompt for home page', () => {
      const prompt = buildImagePrompt('home', {
        activity: 'Plombier',
        city: 'Paris',
        name: 'Jean Dupont',
      });

      expect(prompt).toContain('Plombier');
      expect(prompt).toContain('Paris');
      expect(prompt).toBeTruthy();
    });

    it('should build prompt for services page', () => {
      const prompt = buildImagePrompt('services', {
        activity: 'Électricien',
        city: 'Lyon',
      });

      expect(prompt).toContain('Électricien');
      expect(prompt).toBeTruthy();
    });

    it('should build prompt for about page', () => {
      const prompt = buildImagePrompt('about', {
        activity: 'Maçon',
        city: 'Marseille',
      });

      expect(prompt).toContain('Maçon');
      expect(prompt).toContain('Marseille');
      expect(prompt).toBeTruthy();
    });

    it('should build prompt for pricing page', () => {
      const prompt = buildImagePrompt('pricing', {
        activity: 'Couvreur',
      });

      expect(prompt).toContain('Couvreur');
      expect(prompt).toBeTruthy();
    });

    it('should build prompt for contact page', () => {
      const prompt = buildImagePrompt('contact', {
        activity: 'Serrurier',
        city: 'Toulouse',
      });

      expect(prompt).toContain('Serrurier');
      expect(prompt).toContain('Toulouse');
      expect(prompt).toBeTruthy();
    });

    it('should handle unknown page names', () => {
      const prompt = buildImagePrompt('unknown', {
        activity: 'Peintre',
      });

      expect(prompt).toBeTruthy();
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should handle missing activity gracefully', () => {
      const prompt = buildImagePrompt('home', {
        city: 'Nice',
      });

      expect(prompt).toContain('Nice');
      expect(prompt).toBeTruthy();
    });
  });

  describe('Local AI Provider', () => {
    it('should call Stable Diffusion API when provider is local', async () => {
      await saveImageSettings({
        provider: 'local',
        size: 1024,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      // Mock successful Stable Diffusion response
      const mockBase64Image = Buffer.from('test image data').toString('base64');
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          images: [mockBase64Image],
        }),
      });

      const buffer = await generateImageWithProvider('Test prompt');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('localhost:7860'),
        expect.objectContaining({
          method: 'POST',
        })
      );

      expect(buffer).toBeInstanceOf(Buffer);
    });

    it('should use custom STABLE_DIFFUSION_URL when provided', async () => {
      process.env.STABLE_DIFFUSION_URL = 'http://custom-sd:8080/api/generate';

      await saveImageSettings({
        provider: 'local',
        size: 1024,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      const mockBase64Image = Buffer.from('test').toString('base64');
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          images: [mockBase64Image],
        }),
      });

      await generateImageWithProvider('Test');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://custom-sd:8080/api/generate',
        expect.any(Object)
      );

      delete process.env.STABLE_DIFFUSION_URL;
    });

    it('should handle empty images array from Stable Diffusion', async () => {
      await saveImageSettings({
        provider: 'local',
        size: 1024,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          images: [],
        }),
      });

      // Should fallback to placeholder
      const buffer = await generateImageWithProvider('Test');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });
  });
});
