import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import Logout from "./pages/Logout";
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";
import { ThemeProvider } from "next-themes"; // Add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class"> {/* Add this wrapper */}
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/create-post"
                element={
                  <RequireAuth>
                    <CreatePost />
                  </RequireAuth>
                }
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/post/:id" element={<Post />} />
              <Route
                path="/edit/:id"
                element={
                  <RequireAuth>
                    <EditPost />
                  </RequireAuth>
                }
              />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;