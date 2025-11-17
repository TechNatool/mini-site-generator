/**
 * Error Handling and Classification Layer
 *
 * Provides utilities for classifying, sanitizing, and handling errors across the application
 */

import { logApp } from './logger';

/**
 * Error categories
 */
export enum ErrorCategory {
  AI_ERROR = 'AI_ERROR',
  STRIPE_ERROR = 'STRIPE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  FILE_SYSTEM_ERROR = 'FILE_SYSTEM_ERROR',
  EMAIL_ERROR = 'EMAIL_ERROR',
  DEPLOYMENT_ERROR = 'DEPLOYMENT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Classified error interface
 */
export interface ClassifiedError {
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  originalError: any;
  isRetryable: boolean;
  userMessage: string;
  metadata?: Record<string, any>;
}

/**
 * Classify an error based on its type and content
 */
export function classifyError(error: any): ClassifiedError {
  // Default classification
  let category = ErrorCategory.UNKNOWN_ERROR;
  let severity = ErrorSeverity.MEDIUM;
  let isRetryable = false;
  let userMessage = 'Une erreur est survenue. Veuillez réessayer.';

  const errorMessage = error?.message || String(error);
  const errorName = error?.name || '';
  const errorCode = error?.code || error?.statusCode || error?.status;

  // AI-related errors (Anthropic, OpenAI, etc.)
  if (isAIError(error)) {
    category = ErrorCategory.AI_ERROR;
    severity = ErrorSeverity.HIGH;

    if (errorCode === 429 || errorMessage.includes('rate limit')) {
      isRetryable = true;
      userMessage = 'Le service IA est temporairement surchargé. Réessayez dans quelques instants.';
    } else if (errorCode === 503 || errorMessage.includes('timeout')) {
      isRetryable = true;
      severity = ErrorSeverity.MEDIUM;
      userMessage = 'Le service IA ne répond pas. Réessayez dans un moment.';
    } else if (errorCode === 401 || errorMessage.includes('unauthorized')) {
      severity = ErrorSeverity.CRITICAL;
      userMessage = 'Erreur de configuration IA. Contactez le support.';
    } else {
      userMessage = 'Erreur lors de la génération de contenu. Réessayez ou contactez le support.';
    }
  }
  // Stripe/payment errors
  else if (isStripeError(error)) {
    category = ErrorCategory.STRIPE_ERROR;
    severity = ErrorSeverity.HIGH;

    if (error.type === 'card_error') {
      userMessage = 'Paiement refusé. Vérifiez vos informations de carte bancaire.';
    } else if (error.type === 'rate_limit_error') {
      isRetryable = true;
      userMessage = 'Trop de tentatives de paiement. Réessayez dans quelques minutes.';
    } else if (error.type === 'api_error') {
      isRetryable = true;
      severity = ErrorSeverity.MEDIUM;
      userMessage = 'Erreur de traitement du paiement. Réessayez.';
    } else {
      userMessage = 'Erreur de paiement. Contactez votre banque ou notre support.';
    }
  }
  // Validation errors
  else if (errorName.includes('Validation') || errorMessage.includes('invalid') || errorMessage.includes('required')) {
    category = ErrorCategory.VALIDATION_ERROR;
    severity = ErrorSeverity.LOW;
    userMessage = 'Données invalides. Vérifiez vos informations.';
  }
  // Authentication errors
  else if (errorCode === 401 || errorCode === 403 || errorMessage.includes('unauthorized') || errorMessage.includes('forbidden')) {
    category = ErrorCategory.AUTH_ERROR;
    severity = ErrorSeverity.MEDIUM;
    userMessage = 'Accès non autorisé. Connectez-vous ou contactez le support.';
  }
  // Network errors
  else if (errorName === 'NetworkError' || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ETIMEDOUT')) {
    category = ErrorCategory.NETWORK_ERROR;
    severity = ErrorSeverity.MEDIUM;
    isRetryable = true;
    userMessage = 'Erreur de connexion réseau. Vérifiez votre connexion internet.';
  }
  // Email errors
  else if (errorMessage.includes('email') || errorMessage.includes('SMTP')) {
    category = ErrorCategory.EMAIL_ERROR;
    severity = ErrorSeverity.MEDIUM;
    isRetryable = true;
    userMessage = 'Erreur lors de l\'envoi de l\'email. Réessayez ou vérifiez votre adresse.';
  }
  // Deployment errors
  else if (errorMessage.includes('deploy') || errorMessage.includes('vercel') || errorMessage.includes('build')) {
    category = ErrorCategory.DEPLOYMENT_ERROR;
    severity = ErrorSeverity.HIGH;
    userMessage = 'Erreur lors du déploiement. Réessayez ou contactez le support.';
  }
  // Rate limit errors
  else if (errorCode === 429 || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
    category = ErrorCategory.RATE_LIMIT_ERROR;
    severity = ErrorSeverity.LOW;
    isRetryable = true;
    userMessage = 'Trop de requêtes. Attendez un moment avant de réessayer.';
  }
  // File system errors
  else if (errorCode?.startsWith('E') && (errorCode.includes('NOENT') || errorCode.includes('EACCES'))) {
    category = ErrorCategory.FILE_SYSTEM_ERROR;
    severity = ErrorSeverity.MEDIUM;
    userMessage = 'Erreur de fichier. Contactez le support.';
  }

  const classified: ClassifiedError = {
    category,
    severity,
    message: errorMessage,
    originalError: error,
    isRetryable,
    userMessage,
    metadata: {
      errorName,
      errorCode,
      stack: error?.stack,
    },
  };

  // Log the classified error
  logApp('Error classified', severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH ? 'ERROR' : 'WARN', {
    category,
    severity,
    message: errorMessage,
    isRetryable,
  });

  return classified;
}

/**
 * Check if error is from AI service (Anthropic, OpenAI, etc.)
 */
export function isAIError(error: any): boolean {
  if (!error) return false;

  const errorMessage = error?.message || String(error);
  const errorName = error?.name || '';

  return (
    errorName.includes('Anthropic') ||
    errorName.includes('OpenAI') ||
    errorMessage.includes('anthropic') ||
    errorMessage.includes('openai') ||
    errorMessage.includes('API key') ||
    errorMessage.includes('model') && errorMessage.includes('response') ||
    error?.provider === 'anthropic' ||
    error?.provider === 'openai'
  );
}

/**
 * Check if error is from Stripe
 */
export function isStripeError(error: any): boolean {
  if (!error) return false;

  return (
    error?.type?.includes('stripe') ||
    error?.type === 'card_error' ||
    error?.type === 'rate_limit_error' ||
    error?.type === 'api_error' ||
    error?.rawType !== undefined || // Stripe errors have rawType
    error?.raw?.type !== undefined
  );
}

/**
 * Sanitize error for client response
 * Removes sensitive information like stack traces in production
 */
export function sanitizeErrorForClient(error: any): {
  message: string;
  code?: string;
  retryable?: boolean;
} {
  const classified = classifyError(error);

  // In production, never expose internal error details
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    message: classified.userMessage,
    code: classified.category,
    retryable: classified.isRetryable,
    ...(isProduction ? {} : { debug: classified.message }), // Include debug info in dev
  };
}

/**
 * Handle error and return appropriate HTTP response data
 */
export function handleError(error: any): {
  statusCode: number;
  body: {
    error: string;
    code?: string;
    retryable?: boolean;
  };
} {
  const classified = classifyError(error);

  // Determine HTTP status code based on error category
  let statusCode = 500;

  switch (classified.category) {
    case ErrorCategory.VALIDATION_ERROR:
      statusCode = 400;
      break;
    case ErrorCategory.AUTH_ERROR:
      statusCode = 401;
      break;
    case ErrorCategory.RATE_LIMIT_ERROR:
      statusCode = 429;
      break;
    case ErrorCategory.NETWORK_ERROR:
    case ErrorCategory.AI_ERROR:
    case ErrorCategory.EMAIL_ERROR:
      statusCode = 503; // Service Unavailable
      break;
    default:
      statusCode = 500;
  }

  const sanitized = sanitizeErrorForClient(error);

  return {
    statusCode,
    body: {
      error: sanitized.message,
      code: sanitized.code,
      retryable: sanitized.retryable,
    },
  };
}

/**
 * Log error with appropriate severity and metadata
 */
export function logError(error: any, context?: Record<string, any>) {
  const classified = classifyError(error);

  const logLevel = classified.severity === ErrorSeverity.CRITICAL || classified.severity === ErrorSeverity.HIGH
    ? 'ERROR'
    : 'WARN';

  logApp(classified.message, logLevel, {
    category: classified.category,
    severity: classified.severity,
    isRetryable: classified.isRetryable,
    ...context,
    ...classified.metadata,
  });
}
