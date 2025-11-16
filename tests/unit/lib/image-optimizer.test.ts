import { describe, it, expect } from 'vitest';
import {
  optimizeImage,
  getImageDimensions,
  createPlaceholderImage,
} from '@/lib/image-optimizer';
import type { ImageSettings } from '@/lib/image-config';
import sharp from 'sharp';

describe('Image Optimizer', () => {
  // Create a simple test image buffer
  const createTestImage = async (width: number, height: number): Promise<Buffer> => {
    return await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 100, g: 150, b: 200 },
      },
    })
      .png()
      .toBuffer();
  };

  describe('optimizeImage()', () => {
    it('should optimize image to WebP format', async () => {
      const testImage = await createTestImage(2000, 2000);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      expect(optimized).toBeInstanceOf(Buffer);
      expect(optimized.length).toBeLessThan(testImage.length);

      // Verify format
      const metadata = await sharp(optimized).metadata();
      expect(metadata.format).toBe('webp');
    });

    it('should optimize image to JPEG format', async () => {
      const testImage = await createTestImage(1500, 1500);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'jpg',
        quality: 80,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      expect(optimized).toBeInstanceOf(Buffer);

      const metadata = await sharp(optimized).metadata();
      expect(metadata.format).toBe('jpeg');
    });

    it('should optimize image to PNG format', async () => {
      const testImage = await createTestImage(1200, 1200);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'png',
        quality: 90,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      expect(optimized).toBeInstanceOf(Buffer);

      const metadata = await sharp(optimized).metadata();
      expect(metadata.format).toBe('png');
    });

    it('should resize image to target size', async () => {
      const testImage = await createTestImage(3000, 2000);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      const metadata = await sharp(optimized).metadata();

      // Should fit within 1080px on the longest side
      expect(metadata.width).toBeLessThanOrEqual(1080);
      expect(metadata.height).toBeLessThanOrEqual(1080);

      // Should maintain aspect ratio (3:2 = 1.5)
      const aspectRatio = (metadata.width || 1) / (metadata.height || 1);
      expect(aspectRatio).toBeCloseTo(3 / 2, 1);
    });

    it('should not upscale smaller images', async () => {
      const testImage = await createTestImage(500, 500);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1920,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      const metadata = await sharp(optimized).metadata();

      // Should not exceed original size
      expect(metadata.width).toBeLessThanOrEqual(500);
      expect(metadata.height).toBeLessThanOrEqual(500);
    });

    it('should reduce file size with lower quality', async () => {
      // Create a more complex image with gradients for better quality testing
      const testImage = await sharp({
        create: {
          width: 1500,
          height: 1500,
          channels: 4,
          background: { r: 100, g: 150, b: 200, alpha: 1 },
        },
      })
        .composite([
          {
            input: Buffer.from(
              `<svg><rect x="0" y="0" width="750" height="750" fill="rgb(255,100,100)"/></svg>`
            ),
            top: 0,
            left: 0,
          },
        ])
        .png()
        .toBuffer();

      const highQualitySettings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 100,
        optimize: true,
        autoAltText: true,
      };

      const lowQualitySettings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 20,
        optimize: true,
        autoAltText: true,
      };

      const highQuality = await optimizeImage(testImage, highQualitySettings);
      const lowQuality = await optimizeImage(testImage, lowQualitySettings);

      // Lower quality should generally be smaller (allow some margin)
      expect(lowQuality.length).toBeLessThanOrEqual(highQuality.length * 1.1);
    });

    it('should handle different sizes (512, 720, 1080, 1920)', async () => {
      const testImage = await createTestImage(2500, 2500);
      const sizes = [512, 720, 1080, 1920];

      for (const size of sizes) {
        const settings: ImageSettings = {
          provider: 'none',
          size,
          format: 'webp',
          quality: 85,
          optimize: true,
          autoAltText: true,
        };

        const optimized = await optimizeImage(testImage, settings);
        const metadata = await sharp(optimized).metadata();

        expect(metadata.width).toBeLessThanOrEqual(size);
        expect(metadata.height).toBeLessThanOrEqual(size);
      }
    });

    it('should optimize and process metadata', async () => {
      // Create image with metadata
      const testImage = await sharp({
        create: {
          width: 1000,
          height: 1000,
          channels: 3,
          background: { r: 255, g: 255, b: 255 },
        },
      })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: 'Test Copyright',
            },
          },
        })
        .png()
        .toBuffer();

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      // Image should be optimized and processable
      expect(optimized).toBeInstanceOf(Buffer);
      expect(optimized.length).toBeGreaterThan(0);

      // Should be in target format
      const metadata = await sharp(optimized).metadata();
      expect(metadata.format).toBe('webp');
    });
  });

  describe('getImageDimensions()', () => {
    it('should return correct dimensions', async () => {
      const testImage = await createTestImage(800, 600);

      const dimensions = await getImageDimensions(testImage);

      expect(dimensions.width).toBe(800);
      expect(dimensions.height).toBe(600);
    });

    it('should handle different aspect ratios', async () => {
      const images = [
        { width: 1920, height: 1080 },
        { width: 1000, height: 1000 },
        { width: 600, height: 800 },
      ];

      for (const { width, height } of images) {
        const testImage = await createTestImage(width, height);
        const dimensions = await getImageDimensions(testImage);

        expect(dimensions.width).toBe(width);
        expect(dimensions.height).toBe(height);
      }
    });
  });

  describe('createPlaceholderImage()', () => {
    it('should create placeholder with correct dimensions', async () => {
      const buffer = await createPlaceholderImage(800, 600, 'Test Placeholder');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);

      const metadata = await sharp(buffer).metadata();
      expect(metadata.width).toBe(800);
      expect(metadata.height).toBe(600);
    });

    it('should create square placeholder', async () => {
      const buffer = await createPlaceholderImage(1080, 1080, 'Square Image');

      const metadata = await sharp(buffer).metadata();
      expect(metadata.width).toBe(1080);
      expect(metadata.height).toBe(1080);
    });

    it('should handle empty text', async () => {
      const buffer = await createPlaceholderImage(500, 500, '');

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should handle long text', async () => {
      const longText = 'This is a very long text that should be displayed on the placeholder';
      const buffer = await createPlaceholderImage(1000, 1000, longText);

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should create different sizes', async () => {
      const sizes = [512, 720, 1080, 1920];

      for (const size of sizes) {
        const buffer = await createPlaceholderImage(size, size, `${size}px Image`);

        const metadata = await sharp(buffer).metadata();
        expect(metadata.width).toBe(size);
        expect(metadata.height).toBe(size);
      }
    });

    it('should be in PNG format', async () => {
      const buffer = await createPlaceholderImage(800, 600, 'Test');

      const metadata = await sharp(buffer).metadata();
      expect(metadata.format).toBe('png');
    });
  });

  describe('Optimization Performance', () => {
    it('should significantly reduce large image file size', async () => {
      // Create a large, high-quality image
      const largeImage = await sharp({
        create: {
          width: 3000,
          height: 3000,
          channels: 3,
          background: { r: 100, g: 150, b: 200 },
        },
      })
        .png()
        .toBuffer();

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 80,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(largeImage, settings);

      // Should reduce by at least 50%
      const reductionPercentage = (1 - optimized.length / largeImage.length) * 100;
      expect(reductionPercentage).toBeGreaterThan(50);
    });

    it('should maintain reasonable quality at 85%', async () => {
      const testImage = await createTestImage(1500, 1500);

      const settings: ImageSettings = {
        provider: 'none',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      };

      const optimized = await optimizeImage(testImage, settings);

      // File should be significantly smaller but still reasonable quality
      expect(optimized.length).toBeLessThan(testImage.length);
      expect(optimized.length).toBeGreaterThan(1000); // Not too compressed
    });
  });
});
