import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const result = await loginUser(email, password);
    if (result.success) {
      // Redirect based on user role
      const user = result.user;
      if (user.role === 'admin') {
        history.push('/admin-dashboard');
      } else if (user.role === 'manager') {
        history.push('/manager-dashboard');
      } else {
        history.push('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
