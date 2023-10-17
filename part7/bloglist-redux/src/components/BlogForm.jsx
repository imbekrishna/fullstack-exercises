import { useRef, useState } from 'react';
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { setMessage } from '../app/notificationSlice';
import { createBlog } from '../app/blogSlice';

const BlogForm = () => {
  const [title, setTitle] = useState('Default title');
  const [author, setAuthor] = useState('Default Author');
  const [url, setUrl] = useState('http://localhost');

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
      <div className="formDiv">
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
      </div>
    </Togglable>
  );
};

export default BlogForm;
