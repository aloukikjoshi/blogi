import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { API_URL } from '@/config/api';


// Define types
type User = {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
};

type LoginCredentials = {
  username: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', username);
      
      // Use FormData instead of JSON
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type header with FormData - browser sets it automatically with boundary
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        
        if (errorData.detail) {
          throw new Error(
            typeof errorData.detail === 'string' 
              ? errorData.detail 
              : JSON.stringify(errorData.detail)
          );
        } else {
          throw new Error('Login failed. Please check your credentials.');
        }
      }
      
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (!data.access_token) {
        throw new Error('No access token received');
      }
      
      // Store the token
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
      
      // If user info is returned with the token response
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        // Fetch user data separately if needed
        await fetchUserProfile();
      }
      
      setIsAuthenticated(true);
      
    } catch (error: unknown) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : String(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add this function to fetch user profile after login
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token available');
    }
    
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }
      
      // Auto-login after successful registration
      await login(username, password); // Fixed to match the login function signature
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created!',
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      toast({
        title: 'Registration failed',
        description: err instanceof Error ? err.message : 'Please try with different credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>) => {
    if (!token || !user) {
      setError('You must be logged in to update your profile');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update profile');
      }
      
      // Update local user data
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated',
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'There was an error updating your profile';
      setError(errorMessage || 'Failed to update profile');
      toast({
        title: 'Update failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

