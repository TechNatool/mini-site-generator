/**
 * AI Image Generation
 * Supports Claude, Local AI (Stable Diffusion/DeepSeek Vision), and fallback placeholders
 */

import { loadImageSettingsSync } from './image-config';
import { createPlaceholderImage } from './image-optimizer';

/**
 * Generate an image with the configured provider
 */
export async function generateImageWithProvider(prompt: string): Promise<Buffer> {
  const settings = loadImageSettingsSync();
  const provider = settings?.provider || 'none';

  console.log(`[Image AI] Generating image with provider: ${provider}`);
  console.log(`[Image AI] Prompt: ${prompt.substring(0, 100)}...`);

  try {
    switch (provider) {
      case 'claude':
        return await generateClaudeImage(prompt);

      case 'local':
        return await generateLocalImage(prompt);

      case 'none':
      default:
        return await fallbackImage(prompt);
    }
  } catch (error) {
    console.error(`[Image AI] Error generating image with ${provider}:`, error);
    console.log('[Image AI] Falling back to placeholder image');
    return await fallbackImage(prompt);
  }
}

/**
 * Generate image using Claude API
 * Note: As of 2025, Anthropic doesn't have a native image generation API
 * This is a placeholder for future functionality or integration with other services
 */
export async function generateClaudeImage(_prompt: string): Promise<Buffer> {
  console.log('[Image AI] Claude image generation not yet available');
  console.log('[Image AI] Using fallback placeholder');

  // For now, return a placeholder indicating Claude would be used
  return await createPlaceholderImage(
    1080,
    1080,
    'Claude Image (Coming Soon)'
  );
}

/**
 * Generate image using local AI (Stable Diffusion, DeepSeek Vision, etc.)
 * Expects a local server running at STABLE_DIFFUSION_URL or default localhost:7860
 */
export async function generateLocalImage(prompt: string): Promise<Buffer> {
  const sdUrl =
    process.env.STABLE_DIFFUSION_URL || 'http://localhost:7860/sdapi/v1/txt2img';

  console.log(`[Image AI] Calling local Stable Diffusion at: ${sdUrl}`);

  try {
    const response = await fetch(sdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt:
          'ugly, blurry, low quality, distorted, watermark, text, logo',
        steps: 20,
        width: 1024,
        height: 1024,
        cfg_scale: 7,
        sampler_name: 'DPM++ 2M Karras',
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Local AI image generation failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Stable Diffusion API returns base64 encoded images
    if (data.images && data.images.length > 0) {
      const base64Image = data.images[0];
      return Buffer.from(base64Image, 'base64');
    } else {
      throw new Error('No images returned from local AI');
    }
  } catch (error) {
    console.error('[Image AI] Local image generation error:', error);
    throw error;
  }
}

/**
 * Generate a fallback placeholder image
 */
export async function fallbackImage(prompt?: string): Promise<Buffer> {
  console.log('[Image AI] Generating fallback placeholder image');

  // Extract subject from prompt for placeholder text
  const subject = prompt
    ? extractSubjectFromPrompt(prompt)
    : 'Image Placeholder';

  return await createPlaceholderImage(1080, 1080, subject);
}

/**
 * Extract main subject from image prompt for placeholder text
 */
function extractSubjectFromPrompt(prompt: string): string {
  // Simple extraction: take first few words or find main noun
  const words = prompt.split(' ').slice(0, 3);
  let subject = words.join(' ');

  // Capitalize first letter
  subject = subject.charAt(0).toUpperCase() + subject.slice(1);

  // Limit length
  if (subject.length > 30) {
    subject = subject.substring(0, 27) + '...';
  }

  return subject;
}

/**
 * Generate alt text for an image based on context
 */
export function generateAltText(
  prompt: string,
  context: { activity?: string; city?: string; pageName?: string }
): string {
  const { activity, city, pageName } = context;

  let altText = '';

  if (activity && city) {
    // For business images
    altText = `${activity} professionnel à ${city}`;

    if (pageName) {
      switch (pageName) {
        case 'home':
          altText += ' - Vue d\'ensemble des services';
          break;
        case 'services':
          altText += ' - Services et prestations';
          break;
        case 'about':
          altText += ' - Équipe et expertise';
          break;
        case 'contact':
          altText += ' - Contact et localisation';
          break;
        default:
          altText += ` - ${pageName}`;
      }
    }
  } else {
    // Fallback to prompt-based alt text
    altText = extractSubjectFromPrompt(prompt);
  }

  return altText;
}

/**
 * Build image generation prompt from page content and context
 */
export function buildImagePrompt(
  pageName: string,
  formData: { activity?: string; city?: string; name?: string }
): string {
  const { activity, city } = formData;

  const prompts: Record<string, string> = {
    home: `Professional ${activity || 'business'} storefront in ${city || 'modern city'}, high quality photo, professional, well-lit, inviting atmosphere, modern equipment`,

    services: `${activity || 'professional'} at work providing quality service, professional photography, detailed tools and equipment, clean workspace, expert in action`,

    about: `Professional team of ${activity || 'experts'} in ${city || 'city'}, friendly and approachable, modern office or workshop, professional headshots style`,

    pricing: `Professional ${activity || 'service'} pricing and value, clean modern design, quality materials and tools, transparent and professional presentation`,

    contact: `Professional ${activity || 'business'} office in ${city || 'city'}, welcoming reception area, modern and clean, professional environment, easy to find`,
  };

  return (
    prompts[pageName] ||
    `Professional ${activity || 'business'} image, high quality, modern, professional`
  );
}
