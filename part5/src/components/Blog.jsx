import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, likeBlog, removeBlog, userId }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div id="title-author">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible} id="detail-div">
          <a id="blog-url" href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => likeBlog(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.id === userId ? (
            <button onClick={() => removeBlog(blog)}>remove</button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
export default Blog;
