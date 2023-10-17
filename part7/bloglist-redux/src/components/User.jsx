import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../app/userSlice';

const User = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <p>
      {user.name} logged in{' '}
      <button onClick={() => dispatch(removeUser())}>logout</button>
    </p>
  );
};

export default User;
