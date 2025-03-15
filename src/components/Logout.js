import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthService';

const Logout = () => {
  const history = useNavigate();

  const handleLogout = () => {
    logoutUser();
    history.push('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
