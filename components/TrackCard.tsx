'use client';

import { Track } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import { Card } from './ui/Card';
import { IconButton } from './ui/IconButton';
import { Heart, Play, Plus, SkipForward } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface TrackCardProps {
  track: Track;
  variant?: 'default' | 'compact';
  onPlay?: (track: Track) => void;
  onLike?: (track: Track) => void;
  onSkip?: (track: Track) => void;
  onAddToPlaylist?: (track: Track) => void;
  isPlaying?: boolean;
  isLiked?: boolean;
}

export function TrackCard({
  track,
  variant = 'default',
  onPlay,
  onLike,
  onSkip,
  onAddToPlaylist,
  isPlaying = false,
  isLiked = false,
}: TrackCardProps) {
  const [imageError, setImageError] = useState(false);

  const handlePlay = () => {
    onPlay?.(track);
  };

  const handleLike = () => {
    onLike?.(track);
  };

  const handleSkip = () => {
    onSkip?.(track);
  };

  const handleAddToPlaylist = () => {
    onAddToPlaylist?.(track);
  };

  if (variant === 'compact') {
    return (
      <Card className="flex items-center space-x-3 hover:bg-surface/80 cursor-pointer group">
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          {!imageError ? (
            <Image
              src={track.artworkUrl}
              alt={`${track.title} artwork`}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {track.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <IconButton
              variant="play"
              size="sm"
              onClick={handlePlay}
              className="transform scale-75"
            >
              <Play className="w-3 h-3 fill-current" />
            </IconButton>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary truncate">
            {track.title}
          </h4>
          <p className="text-sm text-text-secondary truncate">
            {track.artist}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <IconButton
            variant="like"
            size="sm"
            isActive={isLiked}
            onClick={handleLike}
          >
            <Heart className="w-3 h-3" />
          </IconButton>
          <IconButton
            variant="add"
            size="sm"
            onClick={handleAddToPlaylist}
          >
            <Plus className="w-3 h-3" />
          </IconButton>
        </div>
        
        {track.duration && (
          <span className="text-xs text-text-secondary">
            {formatDuration(track.duration)}
          </span>
        )}
      </Card>
    );
  }

  return (
    <Card className="group hover:bg-surface/80 transition-all duration-200">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        {!imageError ? (
          <Image
            src={track.artworkUrl}
            alt={`${track.title} artwork`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {track.title.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <IconButton
            variant="play"
            size="lg"
            onClick={handlePlay}
          >
            <Play className="w-6 h-6 fill-current" />
          </IconButton>
        </div>
        
        {isPlaying && (
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-text-primary truncate">
            {track.title}
          </h3>
          <p className="text-sm text-text-secondary truncate">
            {track.artist}
          </p>
          <p className="text-xs text-text-secondary truncate">
            {track.album}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconButton
              variant="like"
              size="sm"
              isActive={isLiked}
              onClick={handleLike}
            >
              <Heart className="w-4 h-4" />
            </IconButton>
            <IconButton
              variant="skip"
              size="sm"
              onClick={handleSkip}
            >
              <SkipForward className="w-4 h-4" />
            </IconButton>
            <IconButton
              variant="add"
              size="sm"
              onClick={handleAddToPlaylist}
            >
              <Plus className="w-4 h-4" />
            </IconButton>
          </div>
          
          {track.duration && (
            <span className="text-xs text-text-secondary">
              {formatDuration(track.duration)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
