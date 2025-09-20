'use client';

import { Playlist, Track } from '@/lib/types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Play, Share2, Heart, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface PlaylistCardProps {
  playlist: Playlist;
  tracks: Track[];
  onPlay?: (playlist: Playlist) => void;
  onShare?: (playlist: Playlist) => void;
  onLike?: (playlist: Playlist) => void;
  isLiked?: boolean;
}

export function PlaylistCard({
  playlist,
  tracks,
  onPlay,
  onShare,
  onLike,
  isLiked = false,
}: PlaylistCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Use first track's artwork as playlist cover
  const coverArt = tracks[0]?.artworkUrl;
  
  const handlePlay = () => {
    onPlay?.(playlist);
  };

  const handleShare = () => {
    onShare?.(playlist);
  };

  const handleLike = () => {
    onLike?.(playlist);
  };

  return (
    <Card className="group hover:bg-surface/80 transition-all duration-200">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        {coverArt && !imageError ? (
          <Image
            src={coverArt}
            alt={`${playlist.name} cover`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-1">
                {playlist.name.charAt(0)}
              </div>
              <div className="text-xs opacity-80">
                {tracks.length} tracks
              </div>
            </div>
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
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-text-primary truncate">
            {playlist.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {playlist.description}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {tracks.length} tracks • Created {playlist.createdAt.toLocaleDateString()}
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
              variant="default"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </IconButton>
            <IconButton
              variant="default"
              size="sm"
            >
              <MoreHorizontal className="w-4 h-4" />
            </IconButton>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlay}
          >
            Play All
          </Button>
        </div>
      </div>
    </Card>
  );
}
