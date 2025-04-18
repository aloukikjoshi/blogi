import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Post } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';

// Define a type for tag objects
type TagObject = {
  name: string;
  [key: string]: unknown;
};

// Type guard to check if a tag is an object with a name property
function isTagObject(tag: unknown): tag is TagObject {
  return typeof tag === 'object' && tag !== null && 'name' in tag;
}

const FeaturedPost = ({ post }) => {
  const {
    title,
    excerpt,
    slug,
    published_at,
    author,
    tags = [],
  } = post;

  // Format date
  const formattedDate = formatDistanceToNow(new Date(published_at), { addSuffix: true });
  
  // Get author initials for fallback
  const getInitials = (username?: string) => {
    return username ? username[0].toUpperCase() : 'U';
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
      <div className="md:flex">
        <div className="p-6 w-full flex flex-col">
          <div className="flex-grow">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags
                  .filter((tag): tag is NonNullable<typeof tag> => tag !== null && tag !== undefined)
                  .slice(0, 3)
                  .map((tag, index) => (
                    <Link 
                      key={index} 
                      to={`/tag/${isTagObject(tag) ? tag.name : String(tag)}`}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-blogi-100 transition-colors"
                    >
                      {isTagObject(tag) ? tag.name : String(tag)}
                    </Link>
                  ))}
              </div>
            )}
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <Link to={`/post/${slug}`} className="text-gray-900 hover:text-blogi-700 transition-colors">
                {title}
              </Link>
            </h2>
            
            {excerpt && (
              <p className="text-gray-600 mb-4">{excerpt}</p>
            )}
          </div>
          
          <div className="mt-4">
            <div className="flex items-center mb-4">
              <Link to={`/profile/${author.id}`} className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={author.avatar} alt={author.username} />
                  <AvatarFallback>{getInitials(author.username)}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-medium text-gray-900">{author.username}</span>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </Link>
            </div>
            
            <Link to={`/post/${slug}`}>
              <Button variant="outline" className="w-full md:w-auto">
                Read Full Article
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
