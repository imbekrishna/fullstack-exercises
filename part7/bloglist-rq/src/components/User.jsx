import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../services/users';

const User = () => {
  const id = useParams().id;

  const userInfo = useQuery({
    queryKey: ['userSummary'],
    queryFn: () => getUser(id),
  });

  if (userInfo.isLoading) {
    return <p>loading...</p>;
  }
  if (!userInfo) {
    return;
  }

  const user = userInfo.data;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
