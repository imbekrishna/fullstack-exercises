import { useRef, useState } from 'react';
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { setMessage } from '../app/notificationSlice';
import { createBlog } from '../app/blogSlice';
import { Button, Container, Form } from 'react-bootstrap';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog({ title, author, url }));
      const message = `a new blog ${title} by ${author} added`;
      dispatch(setMessage({ message }));
    } catch (error) {
      console.error(error);
      dispatch(setMessage({ message: error.message, isError: true }));
    }
    setTimeout(() => {
      dispatch(setMessage({ message: null }));
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <Container className="formDiv">
        <h3>Create new</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              id="blogTitle"
              type="text"
              value={title}
              name="Title"
              placeholder="Blog title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              id="blogAuthor"
              type="text"
              value={author}
              name="Author"
              placeholder="Blog author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Url:</Form.Label>
            <Form.Control
              id="blogUrl"
              type="url"
              value={url}
              name="Url"
              placeholder="Blog url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-primary"
            size="sm"
            id="createBlog"
            type="submit"
          >
            Create
          </Button>
          <Button
            className="ms-3"
            size="sm"
            variant="outline-secondary"
            onClick={() => blogFormRef.current.toggleVisibility()}
          >
            cancel
          </Button>
        </Form>
      </Container>
    </Togglable>
  );
};

export default BlogForm;
