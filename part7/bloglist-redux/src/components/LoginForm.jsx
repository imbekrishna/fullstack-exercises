import { useState } from 'react';
import { setMessage } from '../app/notificationSlice';
import { useDispatch } from 'react-redux';
import { loginUser } from '../app/userSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      dispatch(
        setMessage({ message: 'wrong username or password', isError: true })
      );
    }

    setTimeout(() => {
      dispatch(setMessage({ message: null }));
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

export default LoginForm;
