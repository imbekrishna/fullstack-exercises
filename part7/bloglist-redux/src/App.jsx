import { useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import User from './components/User';
import { useDispatch, useSelector } from 'react-redux';
import { initalizeBlog, deleteBlog, updateBlog } from './app/blogSlice';

import { getUser, removeUser } from './app/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(initalizeBlog());
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <User user={user} />
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
