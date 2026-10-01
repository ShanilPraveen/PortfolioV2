import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs & Articles',
  description:
    'Technical deep-dives, development tutorials, and thoughts on AI/ML and software engineering by Shanil Praveen.',
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
