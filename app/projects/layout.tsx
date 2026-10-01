import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Work',
  description:
    'Explore web applications, full-stack systems, and machine learning models built by Shanil Praveen using Next.js, React, Node.js, and Python.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
