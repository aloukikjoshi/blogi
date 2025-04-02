
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';

type PostCardProps = {
  post: Post;
  className?: string;
};

const PostCard = ({ post, className = '' }: PostCardProps) => {
  const {
    title,
    excerpt,
    slug,
    published_at,
    featured_image,
    author,
    tags = [],
  } = post;

  // Format date
  const formattedDate = formatDistanceToNow(new Date(published_at), { addSuffix: true });
  
  // Get author initials for fallback
  const getInitials = (name?: string, username?: string) => {
    if (name && name.length > 0) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return username ? username[0].toUpperCase() : 'U';
  };

  return (
    <article className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md ${className}`}>
      {featured_image && (
        <Link to={`/post/${slug}`} className="block overflow-hidden h-48 relative">
          <img
            src={featured_image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      )}
      
      <div className="p-5">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Link 
                key={index} 
                to={`/tag/${tag}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-blogi-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
            )}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/post/${slug}`} className="text-gray-900 hover:text-blogi-700 transition-colors">
            {title}
          </Link>
        </h3>
        
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        )}
        
        <div className="flex items-center mt-4">
          <Link to={`/profile/${author.id}`} className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={author.avatar} alt={author.name || author.username} />
              <AvatarFallback>{getInitials(author.name, author.username)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium text-gray-900">{author.name || author.username}</span>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
