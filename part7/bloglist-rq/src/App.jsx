import { useContext, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserContext from './helpers/UserContext';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    const blogAppUser = window.localStorage.getItem('blogAppUser');
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      setUser({ type: 'SET', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser');
    setUser({ type: 'UNSET' });
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm />
          <br />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
