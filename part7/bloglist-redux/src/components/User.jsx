import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const id = useParams().id;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    userService.getUser(id).then((response) => setUserInfo(response));
  }, [id]);

  if (!userInfo) {
    return;
  }
  return (
    <div>
      <h2>{userInfo.name}</h2>
      <p>added blogs</p>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
