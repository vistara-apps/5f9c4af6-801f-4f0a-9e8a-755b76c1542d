'use client';

import { useState, useEffect } from 'react';
import { Track, Playlist, User, MusicFeedItem } from '@/lib/types';
import { MOCK_TRACKS, MOCK_PLAYLISTS, MOCK_USERS } from '@/lib/constants';
import { shuffleArray } from '@/lib/utils';
import { MiniAppFrame } from '@/components/MiniAppFrame';
import { TrackCard } from '@/components/TrackCard';
import { PlaylistCard } from '@/components/PlaylistCard';
import { SocialFeed } from '@/components/SocialFeed';
import { MusicPlayer } from '@/components/MusicPlayer';
import { UserAvatarStack } from '@/components/UserAvatarStack';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Music, 
  Users, 
  TrendingUp, 
  Heart,
  Search,
  Plus,
  Home,
  Library,
  User as UserIcon
} from 'lucide-react';

export default function HomePage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [likedPlaylists, setLikedPlaylists] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'discover' | 'feed' | 'playlists' | 'profile'>('discover');
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const [trendingPlaylists, setTrendingPlaylists] = useState<Playlist[]>([]);
  const [socialFeed, setSocialFeed] = useState<MusicFeedItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Initialize data
  useEffect(() => {
    setRecommendedTracks(shuffleArray(MOCK_TRACKS).slice(0, 6));
    setTrendingPlaylists(MOCK_PLAYLISTS);
    
    // Generate mock social feed
    const mockFeed: MusicFeedItem[] = [
      {
        id: '1',
        type: 'track_share',
        user: MOCK_USERS[0],
        track: MOCK_TRACKS[0],
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        likes: 12,
        comments: 3,
      },
      {
        id: '2',
        type: 'playlist_share',
        user: MOCK_USERS[1],
        playlist: MOCK_PLAYLISTS[0],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 8,
        comments: 1,
      },
      {
        id: '3',
        type: 'now_playing',
        user: MOCK_USERS[2],
        track: MOCK_TRACKS[2],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        likes: 5,
        comments: 0,
      },
    ];
    setSocialFeed(mockFeed);
  }, []);

  const handleTrackPlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    const trackIndex = recommendedTracks.findIndex(t => t.trackId === track.trackId);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
    }
  };

  const handlePlaylistPlay = (playlist: Playlist) => {
    const playlistTracks = MOCK_TRACKS.filter(track => 
      playlist.trackIds.includes(track.trackId)
    );
    if (playlistTracks.length > 0) {
      handleTrackPlay(playlistTracks[0]);
    }
  };

  const handleTrackLike = (track: Track) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(track.trackId)) {
        newSet.delete(track.trackId);
      } else {
        newSet.add(track.trackId);
      }
      return newSet;
    });
  };

  const handlePlaylistLike = (playlist: Playlist) => {
    setLikedPlaylists(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playlist.playlistId)) {
        newSet.delete(playlist.playlistId);
      } else {
        newSet.add(playlist.playlistId);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % recommendedTracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(recommendedTracks[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? recommendedTracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(recommendedTracks[prevIndex]);
  };

  const renderDiscoverTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="glass" className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
          <Music className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gradient mb-2">
          TuneSphere
        </h1>
        <p className="text-text-secondary mb-4">
          Discover Music, Connect with Culture
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>1.2k listeners</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </div>
        </div>
      </Card>

      {/* Recommended Tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Recommended for You
          </h2>
          <Button variant="ghost" size="sm">
            See All
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {recommendedTracks.slice(0, 4).map((track) => (
            <TrackCard
              key={track.trackId}
              track={track}
              onPlay={handleTrackPlay}
              onLike={handleTrackLike}
              isPlaying={currentTrack?.trackId === track.trackId && isPlaying}
              isLiked={likedTracks.has(track.trackId)}
            />
          ))}
        </div>
      </div>

      {/* Community Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Community Activity
          </h2>
          <UserAvatarStack users={MOCK_USERS} />
        </div>
        <div className="space-y-3">
          {recommendedTracks.slice(4, 6).map((track) => (
            <TrackCard
              key={track.trackId}
              track={track}
              variant="compact"
              onPlay={handleTrackPlay}
              onLike={handleTrackLike}
              isPlaying={currentTrack?.trackId === track.trackId && isPlaying}
              isLiked={likedTracks.has(track.trackId)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeedTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Music Feed
        </h2>
        <p className="text-text-secondary">
          See what your friends are listening to
        </p>
      </div>
      
      <SocialFeed
        feedItems={socialFeed}
        onTrackPlay={handleTrackPlay}
        onPlaylistPlay={handlePlaylistPlay}
        onLike={(itemId) => console.log('Liked item:', itemId)}
        onShare={(itemId) => console.log('Shared item:', itemId)}
        onComment={(itemId) => console.log('Commented on item:', itemId)}
      />
    </div>
  );

  const renderPlaylistsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Playlists
        </h2>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>
      
      <div className="space-y-4">
        {trendingPlaylists.map((playlist) => {
          const playlistTracks = MOCK_TRACKS.filter(track => 
            playlist.trackIds.includes(track.trackId)
          );
          
          return (
            <PlaylistCard
              key={playlist.playlistId}
              playlist={playlist}
              tracks={playlistTracks}
              onPlay={handlePlaylistPlay}
              onLike={handlePlaylistLike}
              isLiked={likedPlaylists.has(playlist.playlistId)}
            />
          );
        })}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <UserIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Connect Your Account
        </h2>
        <p className="text-text-secondary mb-4">
          Sign in to save your music preferences and connect with friends
        </p>
        <Button variant="primary">
          Connect Wallet
        </Button>
      </Card>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Your Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-primary mb-1">
              {likedTracks.size}
            </div>
            <div className="text-sm text-text-secondary">
              Liked Tracks
            </div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-accent mb-1">
              {likedPlaylists.size}
            </div>
            <div className="text-sm text-text-secondary">
              Saved Playlists
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <MiniAppFrame>
      <div className="pb-32">
        {activeTab === 'discover' && renderDiscoverTab()}
        {activeTab === 'feed' && renderFeedTab()}
        {activeTab === 'playlists' && renderPlaylistsTab()}
        {activeTab === 'profile' && renderProfileTab()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
        <Card variant="glass" className="mx-4">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'discover' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Discover</span>
            </button>
            
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'feed' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Feed</span>
            </button>
            
            <button
              onClick={() => setActiveTab('playlists')}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'playlists' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Library className="w-5 h-5" />
              <span className="text-xs">Playlists</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'profile' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onLike={handleTrackLike}
        isLiked={currentTrack ? likedTracks.has(currentTrack.trackId) : false}
      />
    </MiniAppFrame>
  );
}
