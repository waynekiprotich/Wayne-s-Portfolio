const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wayne-s-portfolio-backend.onrender.com/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  
  const data = await response.json();
  
  return data.map(project => ({
    ...project,
    previewImage: project.previewImage || project.preview_image || project.image_url || project.imageUrl || project.image || project.cover_image || project.thumbnail || '',
    tags: typeof project.tags === 'string' 
      ? project.tags.split(',').map(t => t.trim()) 
      : (project.tags || []),
    tech: typeof project.tech === 'string' 
      ? project.tech.split(',').map(t => t.trim()) 
      : (project.tech || [])
  }));
};

export const fetchBlogPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/blog`);
  if (!response.ok) throw new Error('Failed to fetch blog posts');
  return response.json();
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