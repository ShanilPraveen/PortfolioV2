import { Project, Blog } from '@/types';

// All API routes are in the same Next.js app — no need for a full URL
const API_BASE_URL = '/api';

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginAdmin = async (username: string, password: string): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to login');
  }

  return data.token;
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const addProject = async (formData: {
  title: string;
  description: string;
  githubUrl: string;
  techStack: string;
  image: File;
}): Promise<Project> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('githubUrl', formData.githubUrl);
  data.append('techStack', formData.techStack);
  data.append('image', formData.image);

  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add project');
  }

  return res.json();
};

export const deleteProject = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to delete project');
};

// ─── Blogs ────────────────────────────────────────────────────────────────────

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const addBlog = async (formData: {
  title: string;
  description: string;
  image: File;
}): Promise<Blog> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('image', formData.image);

  const res = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add blog');
  }

  return res.json();
};

export const deleteBlog = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to delete blog');
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const sendEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || 'Failed to send email');
  }
};
