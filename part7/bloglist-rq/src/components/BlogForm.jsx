import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../services/blogs';
import { useNotificationDispatch } from '../helpers/NotificationContext';
import getError from '../helpers/getError';
import Togglable from './Togglable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const setErrorMessage = useNotificationDispatch();
  const blogFormRef = useRef();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      const message = `a new blog ${newBlog.title} by ${newBlog.author} added`;
      setErrorMessage({ message: message, isError: false });
    },

    onError: (error) => {
      setErrorMessage({ message: getError(error), isError: true });
    },
  });

  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate({ title, author, url });
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
