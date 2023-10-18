import { useContext, useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';
import { useUserDispatch } from '../helpers/UserContext';

const LoginForm = ({ setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserDispatch();

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
      setErrorMessage({ message: 'wrong username or password', isError: true });
    }

    setTimeout(() => {
      setErrorMessage({ message: null, isError: false });
    }, 5000);
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default LoginForm;
