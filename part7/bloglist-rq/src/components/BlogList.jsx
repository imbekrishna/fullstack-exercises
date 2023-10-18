import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useUser } from '../helpers/UserContext';
import { getAll } from '../services/blogs';
import Blog from './Blog';
import Table from 'react-bootstrap/Table';
const BlogList = () => {

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading</div>;
  }

  const blogs = result.data;
  return (
    <Table className="blog">
      <thead>
        <tr>
          <td>Title</td>
          <td>Author</td>
        </tr>
      </thead>
      <tbody>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
