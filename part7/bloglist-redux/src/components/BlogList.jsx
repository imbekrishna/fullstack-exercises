import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import { initalizeBlog } from '../app/blogSlice';
import { Table } from 'react-bootstrap';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <Table className="blog">
      <thead>
        <tr>
          <td>Title</td>
          <td>Author</td>
        </tr>
      </thead>
      <tbody>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
