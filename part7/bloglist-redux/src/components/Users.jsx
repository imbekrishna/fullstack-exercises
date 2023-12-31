import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../app/summarySlice';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const dispatch = useDispatch();
  const summary = useSelector((store) => store.summary);

  useEffect(() => {
    dispatch(getSummary());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((e) => (
            <tr key={e._id}>
              <td>
                <Link to={`/users/${e._id}`}>{e.name}</Link>
              </td>
              <td>{e.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
