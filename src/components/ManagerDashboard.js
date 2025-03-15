import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:5000/api/users/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.map(user => (user.id === id ? { ...user, status } : user)));
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bloodGroup}</td>
              <td>
                <select
                  value={user.status}
                  onChange={(e) => handleUpdateStatus(user.id, e.target.value)}
                >
                  <option value="contacted">Contacted</option>
                  <option value="not-contacted">Not Contacted</option>
                  <option value="donated">Donated</option>
                  <option value="unable">Unable to Donate</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
