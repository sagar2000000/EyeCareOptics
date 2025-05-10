import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Users.css';

const Users = () => {
  const { users, loadingUsers, errorUsers } = useContext(StoreContext); // Get users data from context

  if (loadingUsers) {
    return <div>Loading...</div>;
  }

  if (errorUsers) {
    return <div>{errorUsers}</div>;
  }

  return (
    <div className="users-container">
      <h2>User List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
