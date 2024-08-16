import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../slices/authSlice';
import './Header.scss';

const Header = () => {
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : '';

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Optionally, update the Redux store if needed
    dispatch(setRole('intern')); // or whatever default role you want to set
    
    // Redirect to login page or home page
    window.location.href = '/login'; // adjust to your login page route
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/public/logo.jpg" alt="Logo" />
      </div>
      <nav>
        <ul>
          {role === 'admin' && <li><a href="/admin">Admin</a></li>}
          {userName && <li>Hello, {userName}</li>}
          {user && <li><button id='LogOutBtn' onClick={handleLogout}>Log Out</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
