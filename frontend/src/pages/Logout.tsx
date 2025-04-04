import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account"
        });
      } catch (error) {
        toast({
          title: "Logout failed",
          description: "There was a problem logging out",
          variant: "destructive"
        });
      } finally {
        // Always navigate to home, even if there was an error
        navigate('/', { replace: true });
      }
    };
    
    performLogout();
  }, [logout, navigate, toast]);
  
  return null; // This component doesn't render anything
};

export default Logout;