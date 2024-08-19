import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../signIn/index.scss";
import ROUTES from "../../routes";
import { login } from "../../api/AuthService";
import {jwtDecode} from "jwt-decode";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = await login(username, password);
      const authToken = user.data.token;

      if (user) {
        localStorage.setItem("authToken", JSON.stringify(authToken));
        const decodedToken = jwtDecode(authToken);

        // Notify the Header component about the login
        onLogin(authToken);

        if (decodedToken.role === "ADMIN") {
          navigate(ROUTES.adminPage); 
        } else if (decodedToken.role === "INTERN") {
          navigate(ROUTES.internPage); 
        }
      } 
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Username or password is incorrect or account does not exist");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
