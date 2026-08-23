// TypeScript interfaces for client-side use across all pages and components

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  techStack: string[];
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}
