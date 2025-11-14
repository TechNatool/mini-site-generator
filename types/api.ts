/**
 * Types pour les API routes
 */

import { FormData, GenerationOptions, GenerationResult } from './generator';

// API: Generate Site
export interface GenerateSiteRequest {
  formData: FormData;
  options?: GenerationOptions;
}

export interface GenerateSiteResponse extends GenerationResult {
  pages?: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    contact: string;
    legal: string;
  };
}

// API: Generate Images
export interface GenerateImagesRequest {
  activity: string;
  style: string;
  count?: number;
  prompts?: string[];
}

export interface GenerateImagesResponse {
  success: boolean;
  images: {
    hero?: string;
    about?: string;
    services?: string;
    background?: string;
  };
  error?: string;
}

// API Error Response
export interface APIError {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}

// Rate Limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

// Validation Error
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse {
  success: false;
  error: 'Validation failed';
  errors: ValidationError[];
}
