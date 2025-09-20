'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MiniAppFrameProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function MiniAppFrame({
  children,
  className,
  title,
  subtitle,
}: MiniAppFrameProps) {
  return (
    <div className={cn('max-w-lg mx-auto min-h-screen bg-bg', className)}>
      {(title || subtitle) && (
        <div className="sticky top-0 z-50 glass-effect border-b border-gray-700/50 px-4 py-3">
          <div className="text-center">
            {title && (
              <h1 className="text-xl font-bold text-gradient">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-text-secondary mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="px-4 py-6">
        {children}
      </div>
    </div>
  );
}
