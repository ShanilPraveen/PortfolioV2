import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display typeface for headlines only (h1/h2 via the .font-display utility
// and the --text-* scale defined in globals.css). Inter remains the body
// typeface — this pairing is what gives headings distinct editorial weight
// instead of headings and paragraphs sharing one visual voice.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Heavy condensed display typeface — used exclusively for the giant
// editorial name in the hero section (SHANIL / PRAVEEN).
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanilpraveen.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shanil Praveen | Full-Stack Developer & AI/ML Explorer',
    template: '%s | Shanil Praveen',
  },
  description:
    'Computer Science & Engineering undergraduate at University of Moratuwa. Full-stack developer, AI/ML enthusiast, and builder of modern digital experiences.',
  keywords: [
    'Shanil Praveen',
    'Full Stack Developer Sri Lanka',
    'Computer Science University of Moratuwa',
    'React Developer',
    'Next.js Portfolio',
    'Machine Learning Engineer',
    'Software Engineer Sri Lanka',
  ],
  authors: [{ name: 'Shanil Praveen', url: siteUrl }],
  creator: 'Shanil Praveen',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shanil Praveen Portfolio',
    title: 'Shanil Praveen | Full-Stack Developer & AI/ML Explorer',
    description:
      'Computer Science & Engineering undergraduate at University of Moratuwa. Building thoughtful digital experiences.',
    images: [
      {
        url: '/images/me-no-bg.png',
        width: 1200,
        height: 630,
        alt: 'Shanil Praveen - Portfolio Preview',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <body>
        <SiteSettingsProvider>
          {/* Fixed full-viewport grain texture — a subtle, low-opacity noise
              overlay that sits above all page content. This is a single,
              cheap addition (one static SVG data-URI, no animation, no per-
              page cost) that separates a "designed" surface from a flat
              gradient background. mix-blend-mode: overlay lets it interact
              with whatever color is underneath rather than just darkening it. */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Scroll progress indicator at the very top */}
          <ScrollProgress />

          {/* Sticky navigation */}
          <Navbar />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
