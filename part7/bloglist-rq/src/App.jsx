import Container from 'react-bootstrap/esm/Container';
import { Route, Routes } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import NavbarCrumb from './components/Navbar';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import BlogView from './components/BlogView';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Container>
      <NavbarCrumb />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Container>
  );
};

const Home = () => {
  return (
    <>
      <h2>Blogs</h2>
      <BlogForm />
      <br />
      <BlogList />
    </>
  );
};

export default App;
