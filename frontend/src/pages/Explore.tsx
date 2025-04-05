import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PostGrid from '@/components/posts/PostGrid';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Explore Posts</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <PostGrid showLoadMore={true} />
      </div>
    </Layout>
  );
};

export default Explore;