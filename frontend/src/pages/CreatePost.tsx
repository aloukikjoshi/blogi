import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createPost, uploadImage } from '@/services/api';
import { Loader } from 'lucide-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeaturedImage(file);
      
      try {
        setLoading(true);
        const result = await uploadImage(file);
        setImageUrl(result.url);
        toast({ title: "Image uploaded successfully" });
      } catch (error: any) {
        toast({ 
          title: "Failed to upload image", 
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

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
        featured_image: imageUrl || undefined,
        tags: tagsArray.length > 0 ? tagsArray : undefined
      };
      
      const newPost = await createPost(postData);
      
      toast({
        title: "Post created successfully",
        description: "Your post has been published"
      });
      
      // Redirect to homepage instead of individual post
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt (optional)</Label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1"
              placeholder="Brief summary of your post"
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1"
              placeholder="technology, programming, web"
            />
          </div>
          
          <div>
            <Label>Content</Label>
            <Tabs defaultValue="write" className="mt-2">
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
          
          <div>
            <Label htmlFor="image">Featured Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageUpload}
              className="mt-1"
              accept="image/*"
            />
            {imageUrl && (
              <div className="mt-4">
                <img 
                  src={imageUrl} 
                  alt="Featured preview" 
                  className="max-h-[200px] rounded-md" 
                />
              </div>
            )}
          </div>
          
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;