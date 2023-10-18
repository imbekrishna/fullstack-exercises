import { useState } from 'react';
import { useUserDispatch } from '../helpers/UserContext';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { useNotificationDispatch } from '../helpers/NotificationContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserDispatch();
  const setNotification = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser({ type: 'SET', payload: user });
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification({ message: 'wrong username or password', isError: true });
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
