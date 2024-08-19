import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setRole } from "../slices/authSlice";
import "./Header.scss";

const Header = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  // State to store the user and userName
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserName(storedUser.name);
    }
  }, [role]); // Empty dependency array ensures this runs only on mount

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");

    // Update the local state
    setUser(null);
    setUserName("");

    // Optionally, update the Redux store if needed
    dispatch(setRole("intern")); // or whatever default role you want to set

    // Redirect to login page or home page
    window.location.href = "/login"; // adjust to your login page route
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
          {user && (
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
