'use client';

import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface UserAvatarStackProps {
  users: User[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatarStack({
  users,
  maxVisible = 3,
  size = 'md',
  className,
}: UserAvatarStackProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);
  
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const handleImageError = (userId: string) => {
    setImageErrors(prev => new Set(prev).add(userId));
  };

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex -space-x-2">
        {visibleUsers.map((user, index) => (
          <div
            key={user.farcasterId}
            className={cn(
              sizes[size],
              'relative rounded-full border-2 border-bg overflow-hidden bg-surface',
              'hover:z-10 transition-transform duration-200 hover:scale-110'
            )}
            style={{ zIndex: visibleUsers.length - index }}
          >
            {!imageErrors.has(user.farcasterId) ? (
              <Image
                src={user.profileImage}
                alt={user.displayName}
                fill
                className="object-cover"
                onError={() => handleImageError(user.farcasterId)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className={cn('text-white font-bold', textSizes[size])}>
                  {user.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div
            className={cn(
              sizes[size],
              'relative rounded-full border-2 border-bg bg-surface flex items-center justify-center'
            )}
          >
            <span className={cn('text-text-secondary font-medium', textSizes[size])}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
