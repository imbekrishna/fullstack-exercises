import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useNotificationDispatch } from './helpers/NotificationContext';
import getError from './helpers/getError';
import blogService, {
  createBlog,
  getAll,
  likeBlog,
  removeBlog,
} from './services/blogs';
import UserContext from './helpers/UserContext';

const App = () => {
  const queryClient = useQueryClient();
  const setErrorMessage = useNotificationDispatch();

  const [user, setUser] = useContext(UserContext);

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      const message = `a new blog ${newBlog.title} by ${newBlog.author} added`;
      setErrorMessage({ message: message, isError: false });
    },

    onError: (error) => {
      setErrorMessage({ message: getError(error), isError: true });
    },
  });
  const updateBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      setErrorMessage({ message: getError(error), isError: false });
    },
  });

  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem('blogAppUser');
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser');
    setUser({ type: 'UNSET' });
  };

  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate({ title, author, url });
  };

  const deleteBlog = async (blog) => {
    try {
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      const confirmed = window.confirm(message);

      if (confirmed) {
        removeBlogMutation.mutate(blog.id);
        setErrorMessage({ message: 'Blog deleted', isError: false });
      }
    } catch (error) {
      setErrorMessage({ message: error.message, isError: true });
    }
  };

  if (result.isLoading) {
    return <div>loading</div>;
  }

  const blogs = result.data;

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={() => updateBlogMutation.mutate(blog.id)}
                removeBlog={deleteBlog}
                userId={user.user_id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
