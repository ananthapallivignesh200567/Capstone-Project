import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Swiss International Style Button Component
 *
 * Design Principles:
 * - Hard shadows (no blur) that create depth
 * - Square corners (rounded-none) - Brutalist aesthetic
 * - High contrast black borders
 * - Hover: translate + shadow removal creates "press" effect
 * - Clear semantic variants for different actions
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant determining color and purpose:
   * - `default`: Cobalt/Teal (#0E7490) - Primary actions (save, submit, create)
   * - `destructive`: Alert Red (#DC2626) - Destructive actions (delete, remove)
   * - `success`: Signal Green (#15803D) - Positive actions (download, confirm, complete)
   * - `warning`: Alert Orange (#F97316) - Caution actions (reset, clear, undo)
   * - `outline`: Transparent + black border - Secondary actions (cancel, back)
   * - `secondary`: Panel Grey (#E5E5E0) - Tertiary actions
   * - `ghost`: No background - Subtle actions (icon buttons, navigation)
   * - `link`: Text only with underline - Inline links
   */
  variant?:
    | 'default'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  /**
   * Button size:
   * - `default`: Standard button (h-10)
   * - `sm`: Small button (h-8)
   * - `lg`: Large button (h-12)
   * - `icon`: Square icon button (h-9 w-9)
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    // Base styles applied to ALL buttons
    // Swiss Design: clean, functional, high contrast
    const baseStyles = cn(
      // Layout & Typography
      'inline-flex items-center justify-center gap-2',
      'whitespace-nowrap text-sm font-medium font-sans normal-case tracking-normal',
      // Transitions
      'transition-colors duration-150 ease-out',
      // Focus state
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2',
      // Disabled state
      'disabled:pointer-events-none disabled:opacity-50',
      // SVG icon sizing
      "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
      // Normal/Bootstrap style corners
      'rounded-md'
    );

    // Variant styles - each has distinct purpose and color
    const variants = {
      // PRIMARY - Hyper Blue (#1D4ED8)
      // Use for: Save, Submit, Create, Primary CTA
      default: cn(
        'bg-blue-700 text-white',
        'border border-gray-200',
        'shadow-sm',
        'hover:bg-blue-800',
        'active:bg-blue-900'
      ),

      // DESTRUCTIVE - Alert Red (#DC2626 / red-600)
      // Use for: Delete, Remove, Destroy, Dangerous actions
      destructive: cn(
        'bg-red-600 text-white',
        'border border-gray-200',
        'shadow-sm',
        'hover:bg-red-700',
        'active:bg-red-800'
      ),

      // SUCCESS - Signal Green (#15803D / green-700)
      // Use for: Download, Confirm, Complete, Positive actions
      success: cn(
        'bg-green-700 text-white',
        'border border-gray-200',
        'shadow-sm',
        'hover:bg-green-800',
        'active:bg-green-900'
      ),

      // WARNING - Alert Orange (#F97316 / orange-500)
      // Use for: Reset, Clear, Undo, Caution actions
      warning: cn(
        'bg-orange-500 text-white',
        'border border-gray-200',
        'shadow-sm',
        'hover:bg-orange-600',
        'active:bg-orange-700'
      ),

      // OUTLINE - Canvas background with black border
      // Use for: Cancel, Back, Secondary actions, Navigation
      outline: cn(
        'bg-white text-blue-700',
        'border border-blue-700',
        'shadow-sm',
        'hover:bg-blue-50',
        'active:bg-blue-100'
      ),

      // SECONDARY - Panel Grey (#E5E5E0)
      // Use for: Less prominent actions, Toolbar buttons
      secondary: cn(
        'bg-gray-200 text-black',
        'border border-gray-300',
        'shadow-sm',
        'hover:bg-gray-300',
        'active:bg-gray-400'
      ),

      // GHOST - No background, minimal styling
      // Use for: Icon buttons, Subtle navigation, Toolbars
      ghost: cn(
        'bg-transparent text-blue-700',
        'border-none shadow-none',
        'hover:bg-blue-50',
        'active:bg-blue-100'
      ),

      // LINK - Text only with underline
      // Use for: Inline links, Text navigation
      link: cn(
        'bg-transparent text-blue-700',
        'border-none shadow-none',
        'underline-offset-4 hover:underline',
        'p-0 h-auto'
      ),
    };

    // Size styles
    const sizes = {
      default: 'h-10 px-6 py-2',
      sm: 'h-8 px-4 py-1 text-xs',
      lg: 'h-12 px-8 py-3 text-base',
      icon: 'h-10 w-10 p-0',
    };

    const variantClass = variants[variant];
    const sizeClass = sizes[size];

    return (
      <button ref={ref} className={cn(baseStyles, variantClass, sizeClass, className)} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button };
