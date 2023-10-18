import { useEffect, useState } from 'react';
import { likeBlog, removeBlog } from '../services/blogs';

import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../helpers/NotificationContext';
import getError from '../helpers/getError';

const Blog = ({ blog, userId }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const queryClient = useQueryClient();
  const setNotification = useNotificationDispatch();

  const updateBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      setNotification({ message: getError(error), isError: false });
    },
  });

  const deleteBlog = async (blog) => {
    try {
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      const confirmed = window.confirm(message);

      if (confirmed) {
        removeBlogMutation.mutate(blog.id);
        setNotification({ message: 'Blog deleted', isError: false });
      }
    } catch (error) {
      setNotification({ message: error.message, isError: true });
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
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible} id="detail-div">
          <a id="blog-url" href={blog.url}>
            {blog.url}
          </a>
          <div>
            likes {blog.likes}{' '}
            <button
              id="likeButton"
              onClick={() => updateBlogMutation.mutate(blog.id)}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.id === userId ? (
            <button onClick={() => deleteBlog(blog)}>remove</button>
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
  userId: PropTypes.string.isRequired,
};
export default Blog;
