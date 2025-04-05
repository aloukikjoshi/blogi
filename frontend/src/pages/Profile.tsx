import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PostGrid from '@/components/posts/PostGrid';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <Loader className="h-10 w-10 animate-spin text-blogi-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={user.avatar} alt={user.name || user.username} />
            <AvatarFallback>
              {(user.name?.[0] || user.username[0]).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.name || user.username}
          </h1>
          {user.bio && (
            <p className="text-gray-600 text-center max-w-2xl mb-4">{user.bio}</p>
          )}
          
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => navigate('/settings')}>
              Edit Profile
            </Button>
            <Button onClick={() => navigate('/create')}>
              Create New Post
            </Button>
          </div>
        </div>

        <Tabs defaultValue="posts" className="max-w-4xl mx-auto">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <PostGrid userId={user.id} showEditDelete={true} />
          </TabsContent>
          
          <TabsContent value="drafts">
            <div className="text-center py-16">
              <p className="text-gray-600">Draft functionality coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;