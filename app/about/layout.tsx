import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn about Shanil Praveen, Computer Science & Engineering undergraduate at University of Moratuwa, his background, education, and technical journey.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
