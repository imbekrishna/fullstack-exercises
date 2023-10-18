import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogView from './components/BlogView';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoggedInUser from './components/LoggedInUser';
import User from './components/User';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import { getUser } from './app/accountSlice';
import { useEffect } from 'react';
import { initalizeBlog } from './app/blogSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(initalizeBlog());
    dispatch(getUser());
  }, []);

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user && <LoggedInUser />}
      </div>
      <h2>Blogs</h2>
      <Notification />
      <LoggedInUser />
      <Routes>
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

const Home = () => {
  return (
    <>
      <div>
        <BlogForm />
        <BlogList />
      </div>
    </>
  );
};
