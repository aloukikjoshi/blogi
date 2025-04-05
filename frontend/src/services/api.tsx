import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

// Fetch all posts (with optional pagination and userId filter)
export const fetchPosts = async (page = 1, limit = 10, userId?: string) => {
  try {
    let url = `${API_URL}/posts?page=${page}&limit=${limit}&sort=-published_at`;
    
    // Add userId filter if provided
    if (userId) {
      url += `&author_id=${userId}`;
    }
    
    const response = await fetch(url);
    
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

// Update a post
export const updatePost = async (postId: string, postData: UpdatePostData) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to update a post');
  }
  
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
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

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a post
export const deletePost = async (postId: string) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('You must be logged in to delete a post');
  }
  
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
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

// Add this function to fetch posts for a specific user
export const fetchUserPosts = async (userId: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/posts?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user posts');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
