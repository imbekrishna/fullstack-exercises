import { useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { initalizeBlog } from './app/blogSlice';
import { Routes, Route } from 'react-router-dom';

import { getUser } from './app/userSlice';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <User />
      <Routes>
        <Route path="/users" element={<Users />} />
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
