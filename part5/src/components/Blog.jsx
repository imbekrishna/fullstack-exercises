import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = window.localStorage.getItem('blogAppUser');
    if (currUser) {
      const parsedUser = JSON.parse(currUser);
      const uid = jwt_decode(parsedUser.token);
      setUser(uid);
    }
  }, []);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'hide' : 'view'}
        </button>
        {isExpanded && (
          <div>
            <a href={blog.url}>{blog.url}</a>
            <div>
              likes {blog.likes}{' '}
              <button onClick={() => likeBlog(blog)}>like</button>
            </div>
            <div>{blog.author}</div>
            {blog.user.id === user.id ? (
              <button onClick={() => removeBlog(blog)}>remove</button>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};
export default Blog;
