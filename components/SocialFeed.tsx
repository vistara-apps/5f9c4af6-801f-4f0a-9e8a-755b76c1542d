'use client';

import { MusicFeedItem, Track, Playlist } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';
import { Card } from './ui/Card';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { TrackCard } from './TrackCard';
import { PlaylistCard } from './PlaylistCard';
import Image from 'next/image';
import { useState } from 'react';

interface SocialFeedProps {
  feedItems: MusicFeedItem[];
  onTrackPlay?: (track: Track) => void;
  onPlaylistPlay?: (playlist: Playlist) => void;
  onLike?: (itemId: string) => void;
  onShare?: (itemId: string) => void;
  onComment?: (itemId: string) => void;
}

export function SocialFeed({
  feedItems,
  onTrackPlay,
  onPlaylistPlay,
  onLike,
  onShare,
  onComment,
}: SocialFeedProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (userId: string) => {
    setImageErrors(prev => new Set(prev).add(userId));
  };

  const renderFeedItem = (item: MusicFeedItem) => {
    const handleLike = () => onLike?.(item.id);
    const handleShare = () => onShare?.(item.id);
    const handleComment = () => onComment?.(item.id);

    return (
      <Card key={item.id} className="space-y-4">
        {/* User Header */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            {!imageErrors.has(item.user.farcasterId) ? (
              <Image
                src={item.user.profileImage}
                alt={item.user.displayName}
                fill
                className="object-cover"
                onError={() => handleImageError(item.user.farcasterId)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {item.user.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-text-primary">
                {item.user.displayName}
              </h4>
              <span className="text-xs text-text-secondary">
                {formatTimeAgo(item.timestamp)}
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              {item.type === 'track_share' && 'shared a track'}
              {item.type === 'playlist_share' && 'shared a playlist'}
              {item.type === 'now_playing' && 'is listening to'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          {item.type === 'track_share' && item.track && (
            <TrackCard
              track={item.track}
              variant="compact"
              onPlay={onTrackPlay}
            />
          )}
          
          {item.type === 'playlist_share' && item.playlist && (
            <PlaylistCard
              playlist={item.playlist}
              tracks={[]} // Would need to fetch tracks
              onPlay={onPlaylistPlay}
            />
          )}
          
          {item.type === 'now_playing' && item.track && (
            <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={item.track.artworkUrl}
                  alt={`${item.track.title} artwork`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-text-primary">
                  {item.track.title}
                </h5>
                <p className="text-sm text-text-secondary">
                  {item.track.artist}
                </p>
              </div>
              <IconButton
                variant="play"
                size="sm"
                onClick={() => onTrackPlay?.(item.track!)}
              >
                <Play className="w-4 h-4 fill-current" />
              </IconButton>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 text-text-secondary hover:text-red-400 transition-colors duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{item.likes}</span>
            </button>
            
            <button
              onClick={handleComment}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{item.comments}</span>
            </button>
          </div>
          
          <IconButton
            variant="default"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </IconButton>
        </div>
      </Card>
    );
  };

  if (feedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
          <Heart className="w-8 h-8 text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No activity yet
        </h3>
        <p className="text-text-secondary">
          Follow some users to see their music activity here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {feedItems.map(renderFeedItem)}
    </div>
  );
}
