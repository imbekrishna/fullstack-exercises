import { useDispatch, useSelector } from 'react-redux';
import { getUser, removeUser } from '../app/accountSlice';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  if (!user) {
    return;
  }

  return (
    <span>
      {user.name} logged in{' '}
      <Button
        size="sm"
        variant="outline-danger"
        onClick={() => dispatch(removeUser())}
      >
        logout
      </Button>
    </span>
  );
};

export default LoggedInUser;
