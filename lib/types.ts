export interface User {
  farcasterId: string;
  displayName: string;
  profileImage: string;
  following: string[];
  followers: string[];
  listenHistory: ListenEvent[];
}

export interface Track {
  trackId: string;
  title: string;
  artist: string;
  album: string;
  artworkUrl: string;
  duration?: number;
  previewUrl?: string;
}

export interface Playlist {
  playlistId: string;
  name: string;
  description: string;
  creatorId: string;
  trackIds: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListenEvent {
  userId: string;
  trackId: string;
  timestamp: Date;
  action: 'play' | 'skip' | 'like' | 'add_to_playlist';
}

export interface MusicFeedItem {
  id: string;
  type: 'track_share' | 'playlist_share' | 'now_playing';
  user: User;
  track?: Track;
  playlist?: Playlist;
  timestamp: Date;
  likes: number;
  comments: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
