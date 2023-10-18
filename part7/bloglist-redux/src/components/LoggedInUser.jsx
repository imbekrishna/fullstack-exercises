import { useDispatch, useSelector } from 'react-redux';
import { getUser, removeUser } from '../app/accountSlice';
import { useEffect } from 'react';

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (!user) {
    return;
  }

  return (
    <p>
      {user.name} logged in{' '}
      <button onClick={() => dispatch(removeUser())}>logout</button>
    </p>
  );
};

export default LoggedInUser;
