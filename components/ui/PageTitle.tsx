/**
 * Page Title Component
 *
 * Standardized page title component for dashboard and admin pages
 * Provides consistent heading styles with optional subtitle and icon
 */

import React from 'react';

export interface PageTitleProps {
  /**
   * Main title text
   */
  title: string;
  /**
   * Optional subtitle/description
   */
  subtitle?: string;
  /**
   * Optional icon to display before the title
   */
  icon?: React.ReactNode;
  /**
   * Optional action buttons/elements to display on the right
   */
  actions?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  icon,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Title and Icon */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md">
                {icon}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-neutral-900 tracking-tight">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-base text-neutral-600 mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-transparent" />
    </div>
  );
};

export default PageTitle;
