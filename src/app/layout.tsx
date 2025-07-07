import type { Metadata, Viewport } from 'next';
import './globals.css';

// Using system fonts to avoid network dependencies during build
// These provide excellent fallbacks that are available on all systems
const fontClasses = {
  inter: 'font-inter',
  playfair: 'font-playfair',
};

export const metadata: Metadata = {
  title: "Carolina & Thor's Wedding Timeline",
  description:
    "Interactive wedding timeline for Carolina & Thor's special day - July 10-11, 2025 in Banff & Canmore",
  keywords: [
    'wedding',
    'timeline',
    'Carolina',
    'Thor',
    'Banff',
    'Canmore',
    'July 2025',
  ],
  authors: [{ name: 'Wedding Timeline App' }],
  metadataBase: new URL('https://carolina-thor-wedding.azurestaticapps.net'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: "Carolina & Thor's Wedding Timeline",
    description:
      'Join us for our special day! Interactive timeline with all the details.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ec4899',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-inter">
      <body className="wedding-gradient min-h-screen">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
