import { toast } from '@/components/ui/use-toast';

// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types
export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  slug: string;
  author: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  tags?: string[];
};

export type CreatePostData = {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  tags?: string[];
};

export type UpdatePostData = Partial<CreatePostData>;

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Helper for API errors
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  const message = error.message || 'An unexpected error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
  throw error;
};

// Fetch all posts (with optional pagination)
export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch a single post by ID or slug
export const fetchPost = async (idOrSlug: string) => {
  try {
    const response = await fetch(`${API_URL}/posts/${idOrSlug}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch post');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new post
export const createPost = async (postData: CreatePostData) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to create a post');
  }
  
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create post');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Update an existing post
export const updatePost = async (id: string, postData: UpdatePostData) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to update a post');
  }
  
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update post');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a post
export const deletePost = async (id: string) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to delete a post');
  }
  
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete post');
    }
    
    return true;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch posts by a specific user
export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/posts`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user posts');
    }
    
    return await response.json();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Search posts by query
export const searchPosts = async (query: string, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to search posts');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Upload image for a post
export const uploadImage = async (file: File) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to upload images');
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(`${API_URL}/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to upload image');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};