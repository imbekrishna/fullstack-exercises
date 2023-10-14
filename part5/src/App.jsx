import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    isError: false,
  });

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      const blog = await blogService.create({ title, author, url });
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      setErrorMessage({ message: message, isError: false });
      setBlogs([...blogs, blog]);
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
      const result = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? result : b)));
    } catch (error) {
      console.log(error);
    }
  };

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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
