import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import PrivateRoutes from './components/PrivateRoute'; // Import the private route component

const App = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setRole(decoded.role);
    }
  }, []);

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminDashboard />}/>
            <Route element={<ManagerDashboard />}/>
            <Route element={<Dashboard />}/>
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route exact path='/login' element={<Login/>}/> 
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/logout' element={<Logout/>}/>                  
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
