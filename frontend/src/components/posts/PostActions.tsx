import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PostActionsProps {
  postId: string;
  onDelete?: () => void;
}

const API_URL = "http://localhost:8000/api/v1"; // or import it from your config

export const PostActions = ({ postId, onDelete }: PostActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      // Use the correct URL with /api/v1/
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete post: Status ${response.status}`);
      }
      
      // Don't try to parse the response as JSON for a 204 No Content response
      toast({
        title: "Post deleted",
        description: "Your post has been successfully deleted.",
      });
      
      if (onDelete) onDelete();
      else navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/edit/${postId}`)}>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-500 focus:text-red-500"
            >
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={deleteLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

