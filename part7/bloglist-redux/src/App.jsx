import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoggedInUser from './components/LoggedInUser';
import User from './components/User';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getUser } from './app/accountSlice';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <LoggedInUser />
      <Routes>
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
