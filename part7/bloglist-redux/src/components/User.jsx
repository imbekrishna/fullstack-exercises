import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
