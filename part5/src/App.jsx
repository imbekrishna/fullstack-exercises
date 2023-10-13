import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem("blogAppUser");
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppUser");
    setUser(null);
  };

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
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

          <BlogForm addBlog={addBlog} setErrorMessage={setErrorMessage} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
