import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../app/blogSlice';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

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

  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>{blog.author}</td>
    </tr>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
