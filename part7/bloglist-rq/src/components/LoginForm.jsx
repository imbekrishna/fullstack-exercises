import { useState } from 'react';
import { useUserDispatch } from '../helpers/UserContext';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { useNotificationDispatch } from '../helpers/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserDispatch();
  const setNotification = useNotificationDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser({ type: 'SET', payload: user });
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (error) {
      setNotification({ message: 'wrong username or password', isError: true });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          password
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button className="mt-3" id="login-button" type="submit">
          login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
