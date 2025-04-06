import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PostGrid from '@/components/posts/PostGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchUserProfile } from '@/services/api';
import { User } from '@/types';
import { formatDate } from '@/utils/date';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return;

      try {
        const userData = await fetchUserProfile(userId);
        console.log('User data:', userData);
        setUser(userData);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message || 'Failed to load user profile' : 'Failed to load user profile';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <Loader className="h-10 w-10 animate-spin text-blogi-600" />
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600">{error || 'User not found'}</p>
        </div>
      </Layout>
    );
  }

  // Calculate a stable registration date from user.created_at or derive from user.id
  const getRegistrationDateFromId = (id: string): string => {
    try {
      const firstPart = id.split('-')[0];
      const timestamp = parseInt(firstPart, 16) * 1000;
      const date = new Date(timestamp);
      if (date.getFullYear() > 2000 && date.getFullYear() < 2100) {
        return date.toISOString();
      }
    } catch (e) {
      console.error('Failed to parse date from ID', e);
    }
    return '2023-01-01T00:00:00.000Z';
  };

  const registrationDate = user.created_at || getRegistrationDateFromId(user.id);
  const fallbackInitial =
    user.username && user.username.length > 0 ? user.username.charAt(0).toUpperCase() : "";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={user.avatar || undefined} alt={user.username} />
            <AvatarFallback>{fallbackInitial}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.username}
          </h1>
          <div className="text-sm text-gray-500">
            Member since {formatDate(registrationDate)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Posts by {user.username}</h2>
          <PostGrid userId={user.id} showLoadMore={false} />
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;