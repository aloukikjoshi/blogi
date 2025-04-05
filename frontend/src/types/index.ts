export type User = {
  id: string;
  username: string;
  email: string;
  name: string | null;
  bio: string | null;
  avatar: string | null;
  is_active: boolean;
  created_at?: string; // Optional for backward compatibility
};

export type PostTagType = {
  name: string;
};

export type PostAuthor = {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  slug: string;
  author: PostAuthor;
  tags: PostTagType[];
};