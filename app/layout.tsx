import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

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

export const metadata: Metadata = {
  title: 'Shanil Praveen | Portfolio',
  description:
    'Computer Science & Engineering undergraduate at University of Moratuwa. Full-stack developer, AI/ML enthusiast, and builder of thoughtful digital experiences.',
  keywords: [
    'Shanil Praveen',
    'Portfolio',
    'Full Stack Developer',
    'Computer Science',
    'University of Moratuwa',
    'React',
    'Next.js',
    'Machine Learning',
  ],
  authors: [{ name: 'Shanil Praveen' }],
  openGraph: {
    title: 'Shanil Praveen | Portfolio',
    description: 'CS & Engineering undergraduate · Full-stack developer · AI/ML enthusiast',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
