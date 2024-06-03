import React from 'react';
import { useLocation } from 'react-router-dom';

const UserPage = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'User' }; // Default to 'User' if username is not provided

  return (
    <div className="user-page">
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default UserPage;
