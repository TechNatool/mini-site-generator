/**
 * Image optimization pipeline using Sharp
 */

import sharp from 'sharp';
import type { ImageSettings } from './image-config';

/**
 * Optimize an image buffer according to settings
 * - Resize to specified dimensions
 * - Convert to target format
 * - Apply quality compression
 * - Strip metadata
 */
export async function optimizeImage(
  buffer: Buffer,
  settings: ImageSettings
): Promise<Buffer> {
  try {
    console.log(
      `[Image Optimizer] Optimizing image: ${settings.size}px, ${settings.format}, quality ${settings.quality}`
    );

    let pipeline = sharp(buffer);

    // Resize image maintaining aspect ratio
    pipeline = pipeline.resize(settings.size, settings.size, {
      fit: 'inside', // Maintain aspect ratio, fit within bounds
      withoutEnlargement: true, // Don't upscale if image is smaller
    });

    // Convert to target format with quality settings
    switch (settings.format) {
      case 'webp':
        pipeline = pipeline.webp({
          quality: settings.quality,
          effort: 4, // Balance between quality and processing time
        });
        break;

      case 'jpg':
        pipeline = pipeline.jpeg({
          quality: settings.quality,
          progressive: true, // Progressive JPEG for better web loading
          mozjpeg: true, // Use mozjpeg for better compression
        });
        break;

      case 'png':
        pipeline = pipeline.png({
          quality: settings.quality,
          compressionLevel: 9, // Maximum compression
          progressive: true,
        });
        break;
    }

    // Strip metadata to reduce file size
    pipeline = pipeline.withMetadata({
      exif: {}, // Remove EXIF data
    });

    // Execute pipeline and return buffer
    const optimizedBuffer = await pipeline.toBuffer();

    console.log(
      `[Image Optimizer] Optimization complete: ${buffer.length} bytes → ${optimizedBuffer.length} bytes (${Math.round((1 - optimizedBuffer.length / buffer.length) * 100)}% reduction)`
    );

    return optimizedBuffer;
  } catch (error) {
    console.error('[Image Optimizer] Error optimizing image:', error);
    throw error;
  }
}

/**
 * Get image dimensions from buffer
 */
export async function getImageDimensions(
  buffer: Buffer
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}

/**
 * Create a placeholder image with specified dimensions and text
 */
export async function createPlaceholderImage(
  width: number,
  height: number,
  text: string
): Promise<Buffer> {
  try {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text
          x="50%"
          y="50%"
          font-family="system-ui, -apple-system, sans-serif"
          font-size="24"
          fill="#6b7280"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${text}
        </text>
      </svg>
    `;

    return await sharp(Buffer.from(svg)).png().toBuffer();
  } catch (error) {
    console.error('[Image Optimizer] Error creating placeholder:', error);
    throw error;
  }
}
