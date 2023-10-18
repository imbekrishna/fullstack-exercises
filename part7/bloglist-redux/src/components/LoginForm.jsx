import { useState } from 'react';
import { setMessage } from '../app/notificationSlice';
import { useDispatch } from 'react-redux';
import { loginUser } from '../app/accountSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(
        setMessage({ message: 'wrong username or password', isError: true })
      );
    }

    setTimeout(() => {
      dispatch(setMessage({ message: null }));
    }, 5000);

    navigate('/');
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
