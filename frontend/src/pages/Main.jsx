// import React, {useState, useEffect} from "react";
// import Heading from "../components/Heading";
// import Footer from "../components/Footer";
// import './main.css';

// function Main() {
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//         <Heading/>
//         <p style={{color: 'black'}}>{message}</p>
//         <Footer/>
//   </div>
//   );
// }

// export default Main;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;
// HomeServ.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Main = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  // --- Styles ---
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#1f2937"
  };
  const navStyle = {
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "70px"
  };
  const navBrand = {
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "#ea580c",
    letterSpacing: "1px"
  };
  const navLinks = {
    display: "flex",
    gap: "2rem",
    fontSize: "1rem",
    fontWeight: 500
  };
  const navLink = {
    color: "#6b7280",
    textDecoration: "none",
    transition: "color 0.3s"
  };
  const navButtons = {
    display: "flex",
    gap: "1rem"
  };
  const loginBtn = {
    padding: "0.5rem 1.2rem",
    background: "white",
    color: "#ea580c",
    border: "1px solid #ea580c",
    borderRadius: "0.375rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s"
  };
  const signupBtn = {
    padding: "0.5rem 1.2rem",
    background: "#ea580c",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s"
  };
  const heroCard = {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 4px 24px rgba(80, 112, 255, 0.07)",
    maxWidth: "600px",
    margin: "48px auto 32px auto",
    padding: "3rem 2rem",
    textAlign: "center"
  };
  const heroTitle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#ea580c",
    marginBottom: "1rem"
  };
  const heroSubtitle = {
    fontSize: "1.2rem",
    color: "#6b7280",
    marginBottom: "2rem"
  };
  const servicesSection = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2.5rem 1rem",
    textAlign: "center"
  };
  const servicesGrid = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "2.5rem",
    flexWrap: "wrap"
  };
  const serviceCard = {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.07)",
    padding: "2rem 1.5rem",
    minWidth: "220px",
    maxWidth: "260px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s"
  };
  const howItWorksSection = {
    background: "#fff7ed",
    padding: "3rem 1rem",
    textAlign: "center"
  };
  const howItWorksGrid = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "2.5rem",
    flexWrap: "wrap"
  };
  const howItWorksCard = {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(80, 112, 255, 0.07)",
    padding: "1.5rem 1rem",
    minWidth: "180px",
    maxWidth: "220px"
  };
  const ctaSection = {
    background: "#ea580c",
    color: "#fff",
    padding: "3rem 1rem",
    textAlign: "center",
    borderRadius: "18px",
    maxWidth: "700px",
    margin: "3rem auto"
  };
  const ctaBtn = {
    marginTop: "2rem",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    color: "#ea580c",
    borderRadius: "0.5rem",
    border: "none",
    fontWeight: 700,
    fontSize: "1.1rem",
    cursor: "pointer"
  };
  const footer = {
    background: "#1f2937",
    color: "#9ca3af",
    padding: "2rem 1rem",
    textAlign: "center",
    marginTop: "3rem"
  };

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <div onClick={() => navigate('/')} style={navBrand}>ServEase</div>
        <div style={navLinks}>
          <a href="/" style={navLink} onClick={e => handleSmoothScroll(e, "home")}>Home</a>
          <a href="#services" style={navLink} onClick={e => handleSmoothScroll(e, "services")}>Services</a>
          <a href="#howitworks" style={navLink} onClick={e => handleSmoothScroll(e, "howitworks")}>How it Works</a>
          <a href="#about" style={navLink} onClick={e => handleSmoothScroll(e, "about")}>About</a>
        </div>
        <div style={navButtons}>
          <button style={loginBtn} onClick={() => navigate('/login')}>Login</button>
          <button style={signupBtn} onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <div style={heroCard}>
        <div style={heroTitle}>Professional Home Services At Your Doorstep</div>
        <div style={heroSubtitle}>
          Book trusted professionals for cleaning, plumbing, electrical work and more. Quick, reliable service guaranteed.
        </div>
        <div style={{ color: '#ea580c', fontWeight: 600 }}>{message}</div>
      </div>

      <div style={servicesSection} id="services">
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#ea580c' }}>Popular Services</h2>
        <div style={servicesGrid}>
          <div style={serviceCard} >
            <div style={{ fontSize: '3rem', color: '#ea580c' }}>🧹</div>
            <h3>House Cleaning</h3>
            <p>Thorough cleaning by professionals</p>
            <p style={{ color: '#ea580c', fontWeight: 600 }}>From RM 75</p>
          </div>
          <div style={serviceCard} >
            <div style={{ fontSize: '3rem', color: '#f59e42' }}>🔧</div>
            <h3>Plumbing</h3>
            <p>Fixing leaks, installations & more</p>
            <p style={{ color: '#f59e42', fontWeight: 600 }}>From RM 90</p>
          </div>
          <div style={serviceCard} >
            <div style={{ fontSize: '3rem', color: '#059669' }}>⚡</div>
            <h3>Electrical</h3>
            <p>Wiring, lighting & power solutions</p>
            <p style={{ color: '#059669', fontWeight: 600 }}>From RM 85</p>
          </div>
          <div style={serviceCard} >
            <div style={{ fontSize: '3rem', color: '#d97706' }}>🎨</div>
            <h3>Painting</h3>
            <p>Interior & exterior painting services</p>
            <p style={{ color: '#d97706', fontWeight: 600 }}>From RM 120</p>
          </div>
        </div>
      </div>

      <div style={howItWorksSection} id="howitworks">
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#ea580c' }}>How It Works</h2>
        <div style={howItWorksGrid}>
          <div style={howItWorksCard}>
            <div style={{ backgroundColor: '#ea580c', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 700, fontSize: '1.3rem' }}>1</div>
            <h3>Choose Your Service</h3>
            <p>Browse our services and select what you need.</p>
          </div>
          <div style={howItWorksCard}>
            <div style={{ backgroundColor: '#f59e42', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 700, fontSize: '1.3rem' }}>2</div>
            <h3>Schedule An Appointment</h3>
            <p>Pick a date and time that works best for you.</p>
          </div>
          <div style={howItWorksCard}>
            <div style={{ backgroundColor: '#059669', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 700, fontSize: '1.3rem' }}>3</div>
            <h3>Relax While We Work</h3>
            <p>Our professional arrives and delivers service.</p>
          </div>
        </div>
      </div>

      <div style={ctaSection}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Ready to book your service?</h2>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Join thousands of satisfied customers.</p>
        <button style={ctaBtn} onClick={() => navigate('/login')}>Book Now</button>
      </div>

      <footer style={footer}>
        <p>© 2025 HomeHelper. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
