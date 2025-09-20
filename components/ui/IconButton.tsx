import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'like' | 'skip' | 'add' | 'play' | 'pause' | 'default';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  children: React.ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    isActive = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105 active:scale-95';
    
    const variants = {
      like: isActive 
        ? 'bg-red-500 text-white shadow-lg' 
        : 'bg-surface/50 text-text-secondary hover:text-red-400 hover:bg-red-500/10',
      skip: 'bg-surface/50 text-text-secondary hover:text-text-primary hover:bg-surface',
      add: 'bg-surface/50 text-text-secondary hover:text-green-400 hover:bg-green-500/10',
      play: 'gradient-bg text-white shadow-lg hover:shadow-xl',
      pause: 'bg-surface text-text-primary hover:bg-surface/80',
      default: 'bg-surface/50 text-text-secondary hover:text-text-primary hover:bg-surface',
    };
    
    const sizes = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
