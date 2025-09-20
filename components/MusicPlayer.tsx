'use client';

import { Track } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import { Card } from './ui/Card';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Volume2,
  Repeat,
  Shuffle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike?: (track: Track) => void;
  isLiked?: boolean;
  className?: string;
}

export function MusicPlayer({
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onLike,
  isLiked = false,
  className,
}: MusicPlayerProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [imageError, setImageError] = useState(false);

  // Simulate progress for demo
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        if (currentTrack.duration && newTime >= currentTrack.duration) {
          onNext();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, onNext]);

  useEffect(() => {
    if (currentTrack?.duration) {
      setProgress((currentTime / currentTrack.duration) * 100);
    }
  }, [currentTime, currentTrack?.duration]);

  useEffect(() => {
    setCurrentTime(0);
    setProgress(0);
    setImageError(false);
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }

  const handleLike = () => {
    onLike?.(currentTrack);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack?.duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * currentTrack.duration;
    
    setCurrentTime(newTime);
    setProgress(newProgress);
  };

  return (
    <Card 
      variant="glass" 
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg mx-auto rounded-t-xl rounded-b-none border-x border-t border-b-0 ${className}`}
    >
      {/* Progress Bar */}
      <div 
        className="w-full h-1 bg-gray-700 rounded-full cursor-pointer mb-4"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full gradient-bg rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            {!imageError ? (
              <Image
                src={currentTrack.artworkUrl}
                alt={`${currentTrack.title} artwork`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {currentTrack.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-text-primary truncate">
              {currentTrack.title}
            </h4>
            <p className="text-sm text-text-secondary truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <IconButton
            variant="default"
            size="sm"
            onClick={() => setIsShuffled(!isShuffled)}
            className={isShuffled ? 'text-primary' : ''}
          >
            <Shuffle className="w-4 h-4" />
          </IconButton>
          
          <IconButton
            variant="default"
            size="sm"
            onClick={onPrevious}
          >
            <SkipBack className="w-4 h-4" />
          </IconButton>
          
          <IconButton
            variant={isPlaying ? "pause" : "play"}
            size="md"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
          </IconButton>
          
          <IconButton
            variant="default"
            size="sm"
            onClick={onNext}
          >
            <SkipForward className="w-4 h-4" />
          </IconButton>
          
          <IconButton
            variant="default"
            size="sm"
            onClick={() => {
              const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
              const currentIndex = modes.indexOf(repeatMode);
              const nextMode = modes[(currentIndex + 1) % modes.length];
              setRepeatMode(nextMode);
            }}
            className={repeatMode !== 'off' ? 'text-primary' : ''}
          >
            <Repeat className="w-4 h-4" />
          </IconButton>
        </div>

        {/* Secondary Controls */}
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
            variant="default"
            size="sm"
          >
            <Volume2 className="w-4 h-4" />
          </IconButton>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-text-secondary mt-2">
        <span>{formatDuration(Math.floor(currentTime))}</span>
        <span>{currentTrack.duration ? formatDuration(currentTrack.duration) : '--:--'}</span>
      </div>
    </Card>
  );
}
