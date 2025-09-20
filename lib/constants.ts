export const MOCK_TRACKS: Track[] = [
  {
    trackId: '1',
    title: 'Midnight Vibes',
    artist: 'Luna Echo',
    album: 'Neon Dreams',
    artworkUrl: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=MV',
    duration: 210,
  },
  {
    trackId: '2',
    title: 'Digital Sunset',
    artist: 'Cyber Waves',
    album: 'Future Sounds',
    artworkUrl: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=DS',
    duration: 185,
  },
  {
    trackId: '3',
    title: 'Base Frequency',
    artist: 'Chain Reaction',
    album: 'Onchain Melodies',
    artworkUrl: 'https://via.placeholder.com/300x300/EC4899/FFFFFF?text=BF',
    duration: 195,
  },
  {
    trackId: '4',
    title: 'Farcaster Dreams',
    artist: 'Social Harmony',
    album: 'Connected',
    artworkUrl: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=FD',
    duration: 220,
  },
  {
    trackId: '5',
    title: 'Crypto Rhythm',
    artist: 'Block Beats',
    album: 'Decentralized',
    artworkUrl: 'https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=CR',
    duration: 175,
  },
];

export const MOCK_USERS: User[] = [
  {
    farcasterId: 'user1',
    displayName: 'MusicLover',
    profileImage: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=ML',
    following: ['user2', 'user3'],
    followers: ['user2', 'user4'],
    listenHistory: [],
  },
  {
    farcasterId: 'user2',
    displayName: 'BeatMaster',
    profileImage: 'https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=BM',
    following: ['user1', 'user3'],
    followers: ['user1', 'user3'],
    listenHistory: [],
  },
  {
    farcasterId: 'user3',
    displayName: 'SoundWave',
    profileImage: 'https://via.placeholder.com/100x100/EC4899/FFFFFF?text=SW',
    following: ['user1', 'user2'],
    followers: ['user1', 'user2'],
    listenHistory: [],
  },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    playlistId: 'playlist1',
    name: 'Base Vibes',
    description: 'The best tracks for Base builders',
    creatorId: 'user1',
    trackIds: ['1', '3', '5'],
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    playlistId: 'playlist2',
    name: 'Midnight Sessions',
    description: 'Late night coding soundtrack',
    creatorId: 'user2',
    trackIds: ['1', '2', '4'],
    isPublic: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

export const APP_CONFIG = {
  name: 'TuneSphere',
  tagline: 'Discover Music, Connect with Culture',
  version: '2.0 Plus',
  maxPlaylistTracks: 50,
  maxPlaylistsPerUser: 20,
  supportedAudioFormats: ['mp3', 'wav', 'ogg'],
};

import { Track, User, Playlist } from './types';
