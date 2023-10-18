import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAll, createBlog, updateBlog, removeBlog } from './services/blogs';

const App = () => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    isError: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
  });
  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
  });
  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
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
    setUser(null);
  };

  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      newBlogMutation.mutate({ title, author, url });
      const message = `a new blog ${title} by ${author} added`;
      setErrorMessage({ message: message, isError: false });
    } catch (error) {
      console.error(error);
      setErrorMessage({ message: error.message, isError: true });
    }
    setTimeout(() => {
      setErrorMessage({ message: null, isError: false });
    }, 5000);
  };

  const likeBlog = async (blog) => {
    try {
      console.log(blog);
      updateBlogMutation.mutate({
        ...blog,
        likes: blog.likes + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      const confirmed = window.confirm(message);

      if (confirmed) {
        removeBlogMutation.mutate(blog.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (result.isLoading) {
    return <div>loading</div>;
  }

  const blogs = result.data;

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          {errorMessage.message && (
            <Notification
              message={errorMessage.message}
              isError={errorMessage.isError}
            />
          )}
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {errorMessage.message && (
            <Notification
              message={errorMessage.message}
              isError={errorMessage.isError}
            />
          )}
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
                likeBlog={likeBlog}
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
