import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <body>
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
