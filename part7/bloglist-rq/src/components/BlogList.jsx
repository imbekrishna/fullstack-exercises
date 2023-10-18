import React from 'react';
import Blog from './Blog';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../services/blogs';
import { useUser } from '../helpers/UserContext';

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
