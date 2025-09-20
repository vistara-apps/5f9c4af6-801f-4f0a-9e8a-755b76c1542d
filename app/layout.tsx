import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TuneSphere - Discover Music, Connect with Culture',
  description: 'A community-driven music streaming MiniApp for discovering music, sharing playlists, and engaging with other music enthusiasts on Base.',
  keywords: ['music', 'streaming', 'playlists', 'base', 'farcaster', 'miniapp'],
  authors: [{ name: 'TuneSphere Team' }],
  openGraph: {
    title: 'TuneSphere',
    description: 'Discover Music, Connect with Culture',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuneSphere',
    description: 'Discover Music, Connect with Culture',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-bg">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
