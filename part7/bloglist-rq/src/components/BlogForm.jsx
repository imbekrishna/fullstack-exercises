import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../services/blogs';
import { useNotificationDispatch } from '../helpers/NotificationContext';
import getError from '../helpers/getError';
import Togglable from './Togglable';

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
    <Togglable
      buttonLabel="create new blog"
      className="formDiv"
      ref={blogFormRef}
    >
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="blogTitle"
            type="text"
            value={title}
            name="Title"
            placeholder="Blog title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="blogAuthor"
            type="text"
            value={author}
            name="Author"
            placeholder="Blog author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="blogUrl"
            type="url"
            value={url}
            name="Url"
            placeholder="Blog url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="createBlog" type="submit">
          Create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
