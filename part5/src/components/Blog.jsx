import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, likeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
