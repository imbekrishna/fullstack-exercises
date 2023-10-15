import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
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
        <button id='createBlog' type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
