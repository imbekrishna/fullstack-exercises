import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../app/summarySlice';

const Users = () => {
  const dispatch = useDispatch();
  const summary = useSelector((store) => store.summary);

  useEffect(() => {
    dispatch(getSummary());
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
