// src/pages/HomePage/index.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../homepage/index.scss';
import ROUTES from '../../routes';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Homepage</h1>
      <div className="button-container">
        <button onClick={() => navigate(ROUTES.signIn)}>Go to Sign In</button>
        <button onClick={() => navigate(ROUTES.internPage)}>Go to Intern Page</button>
        <button onClick={() => navigate(ROUTES.adminPage)}>Go to Admin Page</button>
      </div>
    </div>
  );
};

export default HomePage;
