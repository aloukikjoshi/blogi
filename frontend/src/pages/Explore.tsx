import Layout from '@/components/layout/Layout';
import PostGrid from '@/components/posts/PostGrid';

const Explore = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Explore Posts</h1>
        </div>
        
        <PostGrid showLoadMore={true} />
      </div>
    </Layout>
  );
};

export default Explore;