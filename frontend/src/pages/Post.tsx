import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { fetchPost } from '@/services/api';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PostActions } from '@/components/posts/PostActions';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Check if current user is the author
  const isAuthor = user && post && user.id === post.author.id;

  // Load post data
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
        {/* Featured image if it exists */}
        {post.featured_image && (
          <div className="mb-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto rounded-lg object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        )}

        <header className="mb-8 relative">
          {/* Post title */}
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 pr-12">
              {post.title}
            </h1>
            
            {/* Position the PostActions menu in the top-right of the post header */}
            {isAuthor && (
              <div className="absolute top-0 right-0">
                <PostActions 
                  postId={post.id} 
                  onDelete={() => navigate('/')}
                />
              </div>
            )}
          </div>

          {/* Author info */}
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.username[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                {post.author.username}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post content */}
        <div className="prose prose-lg max-w-none blog-content">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>

        {/* Show edit timestamp */}
        {post.updated_at && new Date(post.updated_at).getTime() > new Date(post.published_at).getTime() + 60000 && (
          <div className="text-sm text-gray-500 italic mt-6 pt-4 border-t border-gray-200">
            This post was last edited on {format(new Date(post.updated_at), 'MMMM d, yyyy')} at {format(new Date(post.updated_at), 'h:mm a')}
          </div>
        )}
      </article>
    </Layout>
  );
};

export default Post;