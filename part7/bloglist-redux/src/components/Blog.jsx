import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../app/blogSlice';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = async (blog) => {
    try {
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      const confirmed = window.confirm(message);

      if (confirmed) {
        dispatch(deleteBlog(blog.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div className="blog" style={blogStyle}>
      <div id="title-author">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <div style={showWhenVisible} id="detail-div">
          <a id="blog-url" href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {blog.likes}{' '}
            <button id="likeButton" onClick={() => dispatch(likeBlog(blog.id))}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.id === user.user_id ? (
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
};
export default Blog;
