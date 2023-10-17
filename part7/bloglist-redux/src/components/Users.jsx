import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../app/summarySlice';

const Users = () => {
  const dispatch = useDispatch();
  const summary = useSelector((store) => store.summary);

  useEffect(() => {
    dispatch(getSummary());
  }, []);
  return <div>Users</div>;
};

export default Users;
