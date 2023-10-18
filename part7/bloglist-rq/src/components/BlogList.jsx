import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useUser } from '../helpers/UserContext';
import { getAll } from '../services/blogs';
import Blog from './Blog';

const BlogList = () => {
  const user = useUser();

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
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} userId={user.user_id} />
        ))}
    </div>
  );
};

export default BlogList;
