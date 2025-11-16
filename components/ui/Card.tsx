/**
 * Card Component
 *
 * Reusable card component for consistent container styling
 * Follows the new UI/UX design system
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   */
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  /**
   * Padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether the card is hoverable (adds hover effects)
   */
  hoverable?: boolean;
  /**
   * Whether the card is clickable (adds cursor pointer)
   */
  clickable?: boolean;
  /**
   * Children content
   */
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-xl transition-all duration-200';

    // Variant styles
    const variantStyles = {
      default: 'bg-white border border-neutral-200 shadow-sm',
      bordered: 'bg-white border-2 border-primary-200',
      elevated: 'bg-white shadow-lg border border-neutral-100',
      glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-soft',
    };

    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Hover styles
    const hoverStyles = hoverable
      ? 'hover:shadow-glow hover:border-primary-300 hover:scale-[1.01]'
      : '';

    // Clickable styles
    const clickableStyles = clickable ? 'cursor-pointer' : '';

    // Combine all styles
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${clickableStyles} ${className}`;

    return (
      <div ref={ref} className={combinedStyles} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header Component
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mb-4 pb-4 border-b border-neutral-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Title Component
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', children, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={`text-xl font-bold text-neutral-900 ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * Card Description Component
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-neutral-600 mt-1 ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * Card Content Component
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer Component
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mt-4 pt-4 border-t border-neutral-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
