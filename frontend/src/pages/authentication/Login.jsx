import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const location = useLocation();
  const successfulMessage = location.state?.successfulMessage;
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
        navigate("/dashboard", { state: { loginMessage: loginMessage } });
      } else if (user.role === "tasker") {
        navigate("/tasker-dashboard", { state: { loginMessage: loginMessage } });
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

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#d1fae5",
    backgroundImage: "radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)",
    backgroundSize: "26px 26px",
    opacity: 0.8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem"
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 12px 40px rgba(80, 112, 255, 0.22), 0 2px 12px rgba(234, 88, 12, 0.12)",
    padding: "3rem 2rem",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#ea580c",
    marginBottom: "2rem"
  };

  const inputWrapperStyle = {
    marginBottom: "1.5rem",
    textAlign: "left"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "#4b5563",
    fontWeight: 500
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #fed7aa",
    fontSize: "0.97rem",
    transition: "border-color 0.2s",
    outline: "none",
    height: "36px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1.5rem",
    background: "#ea580c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "1rem"
  };

  const textStyle = {
    marginTop: "1.5rem",
    color: "#6b7280",
    fontSize: "0.95rem"
  };

  const linkStyle = {
    color: "#ea580c",
    textDecoration: "none",
    fontWeight: 600,
    marginLeft: "0.5rem"
  };

  const errorStyle = {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem"
  };

  const successStyle = {
    color: "#059669",
    backgroundColor: "#d1fae5",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem"
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Login</h1>
        {successfulMessage && <p style={successStyle}>{successfulMessage}</p>}
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button style={buttonStyle} type="submit">
            Sign In
          </button>
        </form>
        <p style={textStyle}>
          Don't have an account?
          <a href="/signup" style={linkStyle}>Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
