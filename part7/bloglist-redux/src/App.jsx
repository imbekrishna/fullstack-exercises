import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from './app/notificationSlice';
import {
  initalizeBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} from './app/blogSlice';

import { getUser, removeUser } from './app/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getUser());
    dispatch(initalizeBlog());
  }, []);

  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog({ title, author, url }));
      const message = `a new blog ${title} by ${author} added`;
      dispatch(setMessage({ message }));
    } catch (error) {
      console.error(error);
      dispatch(setMessage({ message: error.message, isError: true }));
    }
    setTimeout(() => {
      dispatch(setMessage({ message: null }));
    }, 5000);
  };

  const likeBlog = async (blog) => {
    try {
      dispatch(
        updateBlog(blog.id, {
          ...blog,
          likes: blog.likes + 1,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async (blog) => {
    try {
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      const confirmed = window.confirm(message);

      if (confirmed) {
        dispatch(deleteBlog(blog.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(removeUser())}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
                userId={user.user_id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
