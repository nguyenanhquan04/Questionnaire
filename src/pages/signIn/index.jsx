import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaAngleDown } from 'react-icons/fa';
import { fetchUsers } from '../../api/userApi'; // Adjust path as necessary
import '../signIn/index.scss';
import ROUTES from '../../routes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers); // Store fetched users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'Admin') {
        navigate(ROUTES.adminPage); // Redirect to Admin Page
      } else if (user.role === 'Intern') {
        navigate(ROUTES.internPage); // Redirect to Intern Page
      }
    } else {
      alert('Invalid username or password');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectUser = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setDropdownOpen(false);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon'/>
        </div>
        <button type='submit'>Login</button>
        <button type="button" onClick={toggleDropdown} className="dropdown-toggle">
          <FaAngleDown /> Sample Accounts
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {users.map((user) => (
              <div key={user.userId} onClick={() => handleSelectUser(user)} className="dropdown-item">
                <div className="dropdown-item-content">
                  <div className="dropdown-item-username">Username: {user.username}</div>
                  <div className="dropdown-item-password">Password: {user.password}</div>
                  <div className="dropdown-item-role">Role: {user.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
