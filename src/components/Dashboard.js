import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    address: '',
    contact: '',
    bloodGroup: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile');
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('http://localhost:5000/api/users/me', updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={updatedUser.name}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
        />
        <input
          type="text"
          value={updatedUser.address}
          onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
        />
        <input
          type="text"
          value={updatedUser.contact}
          onChange={(e) => setUpdatedUser({ ...updatedUser, contact: e.target.value })}
        />
        <input
          type="text"
          value={updatedUser.bloodGroup}
          onChange={(e) => setUpdatedUser({ ...updatedUser, bloodGroup: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Dashboard;
