import { useState, useEffect, useRef, useReducer, useContext } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAll, createBlog, updateBlog, removeBlog } from './services/blogs';
import NotificationContext, {
  NotificationContextProvider,
} from './helpers/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useContext(NotificationContext);

  const [user, setUser] = useState(null);

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
      setErrorMessage({
        type: 'SET',
        payload: { message: message, isError: false },
      });
    } catch (error) {
      console.error(error);
      setErrorMessage({
        type: 'SET',
        payload: { message: error.message, isError: true },
      });
    }
    setTimeout(() => {
      setErrorMessage({
        type: 'UNSET',
        payload: { message: null, isError: false },
      });
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
        setErrorMessage({
          type: 'SET',
          payload: { message: 'Blog deleted', isError: false },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setErrorMessage({
        type: 'UNSET',
        payload: { message: null, isError: false },
      });
    }, 5000);
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
