import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { fetchPost, Post as PostType } from '@/services/api';
import { Loader } from 'lucide-react';
import { Edit2 } from 'lucide-react';
import { DeletePostButton } from '@/components/posts/DeletePostButton';
import { useAuth } from '../hooks/useAuth';

export interface Post {
  id: number;
  title: string;
  content: string;
  published_at: string;
  updated_at?: string;
  featured_image?: string;
  author: {
    id: number;
    username: string;
    name?: string;
    avatar?: string;
  };
  tags?: (string | { name: string })[];
}

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAuth(); // Implement useAuth hook

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await fetchPost(slug);
        setPost(data);
      } catch (err: any) {
        console.error('Failed to load post:', err);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <Loader className="h-10 w-10 animate-spin text-blogi-600" />
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Post</h2>
          <p className="text-gray-600 mb-6">{error || 'Post not found'}</p>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {post.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/tag/${typeof tag === 'string' ? tag : (tag as { name: string }).name}`}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blogi-100 transition-colors"
                >
                  {typeof tag === 'string' ? tag : (tag as { name: string }).name}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center space-x-4">
            <Link to={`/profile/${post.author.id}`} className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author.name?.[0] || post.author.username[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {post.author.name || post.author.username}
                </p>
                <div className="text-sm text-gray-500">
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </time>
                  {post.updated_at && post.updated_at !== post.published_at && (
                    <span> • Updated {format(new Date(post.updated_at), 'MMMM d, yyyy')}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {currentUser && post.author.id === currentUser.id && (
            <div className="flex gap-4 mt-4">
              <Link to={`/edit/${post.id}`}>
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
              <DeletePostButton postId={post.id.toString()} onDelete={() => navigate('/')} />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none blog-content">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default Post;