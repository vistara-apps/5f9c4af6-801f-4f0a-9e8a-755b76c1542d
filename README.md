# TuneSphere - Base Mini App

A community-driven music streaming MiniApp for discovering music, sharing playlists, and engaging with other music enthusiasts on Base.

## Features

- **Personalized Music Discovery**: Get song recommendations based on your listening history and community trends
- **Community Playlists & Sharing**: Create, share, and discover playlists from other users
- **Social Music Feed**: See what your friends are listening to in a Farcaster-native feed
- **In-Frame Music Actions**: Like, skip, and add songs to playlists directly from frames

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Wallet Integration**: OnchainKit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tunesphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # App providers
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── TrackCard.tsx     # Track display component
│   ├── PlaylistCard.tsx  # Playlist display component
│   ├── SocialFeed.tsx    # Social music feed
│   ├── MusicPlayer.tsx   # Music player component
│   └── ...
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript definitions
│   ├── constants.ts      # App constants
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Key Components

### TrackCard
Displays individual tracks with play, like, and add-to-playlist actions. Supports both default and compact variants.

### PlaylistCard  
Shows playlist information with cover art, track count, and social actions.

### SocialFeed
Displays music activity from followed users including track shares, playlist shares, and now-playing updates.

### MusicPlayer
Full-featured music player with progress bar, controls, and track information.

## Design System

The app uses a dark theme with a purple-to-blue gradient accent:

- **Primary**: `hsl(220 70% 55%)` (Blue)
- **Accent**: `hsl(300 75% 60%)` (Purple)  
- **Background**: `hsl(220 20% 15%)` (Dark)
- **Surface**: `hsl(220 20% 20%)` (Slightly lighter)
- **Text Primary**: `hsl(220 15% 95%)` (Light)
- **Text Secondary**: `hsl(220 15% 75%)` (Muted)

## API Integration

The app is designed to integrate with:

- **Farcaster Hubs API**: For user profiles and social graph
- **Spotify Web API**: For music metadata and recommendations  
- **Base MiniKit**: For frame interactions and wallet integration

Currently uses mock data for development. Replace with real API calls in production.

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Or any platform supporting Node.js

3. **Configure environment variables** in your deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
