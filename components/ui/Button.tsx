/**
 * Button Component
 *
 * Reusable button component with multiple variants and sizes
 * Follows the new UI/UX design system
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Children (button text/content)
   */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variantStyles = {
      primary: 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-glow focus:ring-primary shadow-md hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary-50 focus:ring-primary shadow-sm',
      danger: 'bg-danger text-white hover:bg-danger-dark focus:ring-danger shadow-md hover:scale-[1.02] active:scale-[0.98]',
      ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400',
      success: 'bg-success text-white hover:bg-success-dark focus:ring-success shadow-md hover:scale-[1.02] active:scale-[0.98]',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Combine all styles
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedStyles}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
