import type { Metadata } from 'next';
import Script from 'next/script';
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
const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
  twitter: {
    card: 'summary_large_image',
    title: 'Shanil Praveen | Full-Stack Developer & AI/ML Explorer',
    description:
      'CS & Engineering undergraduate at University of Moratuwa. Full-stack developer & AI/ML enthusiast.',
    images: ['/images/me-no-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shanil Praveen',
  url: siteUrl,
  jobTitle: 'Software Engineer & Full-Stack Developer',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University of Moratuwa',
  },
  sameAs: [
    'https://github.com/ShanilPraveen',
    'https://www.linkedin.com/in/shanil-praveen',
    'https://kaggle.com/shanilpraveen',
    'https://medium.com/@jspraveen2002',
    'https://www.facebook.com/profile.php?id=61552762254541',
  ],
  knowsAbout: [
    'Full-Stack Web Development',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Artificial Intelligence',
    'Machine Learning',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <body>
        {/* Google Analytics GA4 */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}

        {/* JSON-LD Structured Data Schema for Google & search crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

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
