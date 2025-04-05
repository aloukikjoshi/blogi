import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  username: string;
  name?: string;
  email: string;
}

interface DecodedToken {
  sub: number;
  username: string;
  name?: string;
  email: string;
  exp: number;
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setCurrentUser(null);
          return;
        }

        setCurrentUser({
          id: decoded.sub,
          username: decoded.username,
          name: decoded.name,
          email: decoded.email
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    }
  }, []);

  return currentUser;
};