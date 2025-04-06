import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchPost, updatePost } from '@/services/api';
import { Loader } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) return;
        const post = await fetchPost(id);
        
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt || '');
        
        // Handle tags - could be array of objects or array of strings
        if (post.tags && post.tags.length > 0) {
          if (typeof post.tags[0] === 'object') {
            setTags(post.tags.map((tag: { name: string }) => tag.name).join(', '));
          } else {
            setTags(post.tags.join(', '));
          }
        }
      } catch (error: unknown) {
          toast({
            title: "Error loading post",
            description: error instanceof Error ? error.message : 'An unexpected error occurred',
            variant: "destructive"
          });
          navigate('/');
      } finally {
        setLoadingPost(false);
      }
    };

    loadPost();
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Missing fields",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      const postData = {
        title,
        content,
        excerpt: excerpt || undefined,
        tags: tagsArray.length > 0 ? tagsArray : undefined
      };
      
      await updatePost(id!, postData);
      
      toast({
        title: "Post updated successfully",
        description: "Your changes have been saved"
      });
      
      navigate(`/post/${id}`);
    } catch (error: unknown) {
    toast({
      title: "Failed to update post",
      description: error instanceof Error ? error.message : String(error),
      variant: "destructive"
    });
    } finally {
      setLoading(false);
    }
  };

  if (loadingPost) {
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
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt (Optional)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter a brief excerpt"
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>
          
          <div>
            <Label>Content</Label>
            <Tabs defaultValue="write">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="editor-textarea"
                  placeholder="Write your post content here..."
                  required
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="editor-preview">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                  ) : (
                    <p className="text-gray-400">Your content preview will appear here</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Post'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;