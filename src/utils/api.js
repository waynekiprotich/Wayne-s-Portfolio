import projectsData from '../data/projects.json';
import blogData from '../data/blog.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wayne-s-portfolio-backend.onrender.com/api';

let projectsCache = null;
let blogCache = null;

export const fetchProjects = async () => {
  if (projectsCache) return projectsCache;

  // Simulate an async fetch but use local static JSON to avoid Render cold starts
  const data = projectsData;
  
  projectsCache = data.map(project => ({
    ...project,
    previewImage: project.previewImage || project.preview_image || project.image_url || project.imageUrl || project.image || project.cover_image || project.thumbnail || '',
    tags: typeof project.tags === 'string' 
      ? project.tags.split(',').map(t => t.trim()) 
      : (project.tags || []),
    tech: typeof project.tech === 'string' 
      ? project.tech.split(',').map(t => t.trim()) 
      : (project.tech || [])
  }));
  return projectsCache;
};

export const fetchBlogPosts = async () => {
  if (blogCache) return blogCache;

  // Use local static JSON
  blogCache = blogData;
  return blogCache;
};

export const sendInquiry = async (inquiryData) => {
  const response = await fetch(`${API_BASE_URL}/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });
  if (!response.ok) throw new Error('Failed to send inquiry');
  return response.json();
};