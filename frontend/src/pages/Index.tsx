import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import FeaturedPost from '@/components/posts/FeaturedPost';
import PostGrid from '@/components/posts/PostGrid';
import { Button } from '@/components/ui/button';
import { fetchPosts, Post } from '@/services/api';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Add this import

const Index = () => {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get the actual user from AuthContext
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // Change limit to 7 (6 regular + 1 featured)
        const response = await fetchPosts(1, 7);
        
        if (response.items && response.items.length > 0) {
          setFeaturedPost(response.items[0]);
          // Only take next 6 posts
          setPosts(response.items.slice(1, 7));
        }
      } catch (err: unknown) {
        console.error('Failed to load posts:', err);
        setError((err as Error).message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <Loader className="h-10 w-10 animate-spin text-commonminds-600" />
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Posts</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-commonminds-900 to-commonminds-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Share Your Stories with the World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            commonminds is a platform for writers and readers to connect through the power of words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-post">
              <Button size="lg" className="font-medium">
                Start Writing
              </Button>
            </Link>
            <Link to="/explore">
                <Button variant="outline" size="lg" className="border-commonminds-900 text-commonminds-900 hover:bg-commonminds-900 hover:text-white font-medium">
                Explore Posts
                </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Post</h2>
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}
      
      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
            <Link to="/explore" className="text-commonminds-600 hover:text-commonminds-800 font-medium">
              View All
            </Link>
          </div>
          
          {posts.length > 0 ? (
            <PostGrid initialPosts={posts} showLoadMore={false} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found. Check back later!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to share your story?</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of writers and readers to share your unique voice with the world.
            </p>
            <Link to="/register">
              <Button size="lg" className="font-medium">
                Create an Account
              </Button>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;