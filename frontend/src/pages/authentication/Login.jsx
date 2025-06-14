import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const location = useLocation();
  const succefulMessage = location.state?.succefulMessage;
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

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      fontFamily: "sans-serif"
    },
    formBox: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center"
    },
    inputWrapper: {
      position: "relative",
      marginBottom: "1rem"
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "1rem"
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "1rem"
    },
    text: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      textAlign: "center"
    },
    link: {
      color: "#4f46e5",
      textDecoration: "none",
      marginLeft: "5px"
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "1rem"
    },
    success: {
      color: "green",
      textAlign: "center",
      marginBottom: "1rem"
    }
  };

  const backgroundStyle = {
    minHeight: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0,
    backgroundColor: "#e5e5f7",
    backgroundImage: "repeating-linear-gradient(45deg, #3fde89, #3fde89 11.5px, #e5e5f7 11.5px, #e5e5f7 57.5px)",
    backgroundAttachment: "fixed",
    backgroundRepeat: "repeat"
  };

  const contentWrapperStyle = {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={contentWrapperStyle}>
        <form style={styles.formBox} onSubmit={handleLogin}>
          <h1 style={styles.title}>Login</h1>

          <div style={styles.inputWrapper}>
            <input
              style={styles.input}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <input
              style={styles.input}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} type="submit">Login</button>

          <p style={styles.text}>
            Don't have an account?
            <a href="/signup" style={styles.link}>Here</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
