import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { API_URL } from '@/services/api'; // Import API_URL from api service

// Define types
type User = {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;  // Changed parameter name
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
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
      console.log("Attempting login with:", { username });
      
      // Create form data instead of JSON
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      
      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);
      
      if (!response.ok) {
        throw data; // Throw the actual error object instead of creating a new Error
      }
      
      // Extract user info safely
      const userData = data.user || {};
      const displayName = userData.username || 'user';

      // Save token and user to localStorage
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(data.access_token);
      setUser(userData);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${displayName}!`,
      });
    } catch (err: any) {
      console.error("Login error:", err);
      
      let errorMessage = 'Failed to login';
      
      // Better error handling for different types of errors
      if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        // Try to extract a meaningful message from the error object
        errorMessage = err.detail || err.error || JSON.stringify(err);
      }
      
      setError(errorMessage);
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
      await login(username, password);
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created!',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      toast({
        title: 'Registration failed',
        description: err.message || 'Please try with different credentials',
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
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      toast({
        title: 'Update failed',
        description: err.message || 'There was an error updating your profile',
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
