import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Add this import

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth(); // Get the current user from context
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif font-bold text-blogi-800">Blogi</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Blogi - where stories come to life. Share your perspectives and ideas with the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
            <ul className="space-y-2">
              {user ? (
                <>
                  <li>
                    <Link to="/create-post" className="text-gray-600 hover:text-blogi-600 transition-colors">
                      Create Post
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="text-gray-600 hover:text-blogi-600 transition-colors">
                      Log out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-gray-600 hover:text-blogi-600 transition-colors">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-gray-600 hover:text-blogi-600 transition-colors">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-blogi-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Blogi. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" />
            <span>by</span>
            <a 
              href="https://github.com/aloukikjoshi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-blogi-600 hover:text-blogi-500 hover:underline ml-1"
            >
              Aloukik Joshi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
