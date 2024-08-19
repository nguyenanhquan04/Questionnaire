import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import "./Header.scss";
import { logOut } from "../api/AuthService";

const Header = ({ token }) => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.sub);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      setUserName("");
      setRole(null);
    }
  }, [token]);

  const handleLogout = () => {
    logOut(token);
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Adjust to your login page route
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" />
      </div>
      <nav>
        <ul>
          {role === "admin" && (
            <li>
              <a href="/admin">Admin</a>
            </li>
          )}
          {userName && <li>Hello, {userName}</li>}
          {token && (
            <li>
              <button id="LogOutBtn" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
