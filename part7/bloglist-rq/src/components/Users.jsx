import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { summary } from '../services/users';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Users = () => {
  const userSummary = useQuery({
    queryKey: ['userSummary'],
    queryFn: summary,
  });

  if (userSummary.isLoading) {
    return <p>loading...</p>;
  }

  if (!userSummary.data) {
    return;
  }

  console.log(userSummary.status);

  const users = userSummary.data;

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
          {users.map((e) => (
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
