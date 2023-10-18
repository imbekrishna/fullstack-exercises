import { useDispatch, useSelector } from 'react-redux';
import { getUser, removeUser } from '../app/accountSlice';
import { useEffect } from 'react';

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  if (!user) {
    return;
  }

  return (
    <span>
      {user.name} logged in{' '}
      <button onClick={() => dispatch(removeUser())}>logout</button>
    </span>
  );
};

export default LoggedInUser;
