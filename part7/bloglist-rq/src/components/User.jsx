import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../services/users';

const User = () => {
  const id = useParams().id;

  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(id),
    refetchOnMount: true,
  });
  return (
    <div>
      {isLoading ? (
        <b> Loading .. </b>
      ) : (
        <div>
          <h2>{data.name}</h2>
          <p>added blogs</p>
          <ul>
            {data.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
