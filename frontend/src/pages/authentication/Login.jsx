import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import './login.css';

const Login = () => {
  const location = useLocation();
  const succefulMessage = location.state?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email: email, password: password },
        {
          withCredentials: true,
        }
      );
      const user = response.data.user;
      const loginMessage = response.data.loginMessage;
      console.log(response.data.message);
      console.log(user.role);
      if (user.role === "user") {
        navigate("/dashboard", { state: {loginMessage: loginMessage }});
      } else if (user.role === "tasker") {
        navigate("/tasker-dashboard", { state: {loginMessage: loginMessage}  } );
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        setError("Unknown role");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); 
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navdiv">
            <div className="logo">
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <path fill="#0088A9" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
                  <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>
      {succefulMessage && <p style={{ color: "green" }}>{succefulMessage}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="container">
          <div className="login-container">
            <h1 className="form-title">Login</h1>
            <div className="input-wrapper">
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              <span className="material-symbols-outlined">mail</span>
            </div>

            <div className="input-wrapper">
              <input
                className="input-field"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
              <span className="material-symbols-outlined">lock</span>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="login-button" type="submit">Login</button>

            <p className="login-text">
              Don't have an account?
              <a href="/signup"> Here</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
