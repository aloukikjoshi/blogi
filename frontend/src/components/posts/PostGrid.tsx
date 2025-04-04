import { useState, useEffect } from 'react';
import { Post, fetchPosts } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

type PostGridProps = {
  initialPosts?: Post[];
  userId?: string;
  showLoadMore?: boolean;
};

const PostGrid = ({
  initialPosts,
  userId,
  showLoadMore = true,
}: PostGridProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const loadPosts = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use fetchPosts from api service
      const response = await fetchPosts(pageNum);
      
      if (pageNum === 1) {
        setPosts(response.items);
      } else {
        setPosts(prev => [...prev, ...response.items]);
      }
      
      setHasMore(response.total > posts.length + response.items.length);
    } catch (err: any) {
      console.error('Failed to load posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!initialPosts) {
      loadPosts();
    }
  }, [initialPosts]);
  
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage);
  };
  
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="h-8 w-8 animate-spin text-blogi-600" />
      </div>
    );
  }
  
  if (error && posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load posts</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button variant="outline" onClick={() => loadPosts()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">Check back later for new content</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{post.excerpt || post.content?.substring(0, 100)}</p>
            <div className="mt-4">
              <a href={`/post/${post.id}`} className="text-blogi-600 hover:underline">Read more</a>
            </div>
          </div>
        ))}
      </div>
      
      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostGrid;