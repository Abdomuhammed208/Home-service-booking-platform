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
  const [searchText, setSearchText] = useState('');
    const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  const handleServiceClick = (serviceName) => {
    alert(`You clicked on "${serviceName}". Booking flow would start here.`);
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      alert(`Searching for "${searchText}" services...`);
    } else {
      alert('Please enter a service to search for');
    }
  };

  const styles = {
    body: {
      fontFamily: 'sans-serif',
      color: '#1f2937',
      backgroundColor: '#f9fafb',
    },
    nav: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '70px',
    },
    navBrand: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#4f46e5',
      flex: '0 0 auto',
    },
    navBrandSpan: { color: '#764ba2' },
    navLinksWrapper: {
      flex: '1 1 0%',
      display: 'flex',
      justifyContent: 'center',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      fontSize: '1rem',
      fontWeight: '500',
      alignItems: 'center',
    },
    navLink: {
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#374151',
    },
    navButtons: {
      position: 'absolute',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      gap: '1rem',
    },
    loginBtn: {
      padding: '0.5rem 1.2rem',
      background: 'white',
      color: '#4f46e5',
      border: '1px solid #4f46e5',
      borderRadius: '0.375rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.2s, color 0.2s',
    },
    signupBtn: {
      padding: '0.5rem 1.2rem',
      background: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.2s, color 0.2s',
    },
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff',
      textAlign: 'center',
      padding: '6rem 1rem'
    },
    services: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem',
      textAlign: 'center'
    },
    serviceCard: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s'
    },
    howItWorks: {
      backgroundColor: '#f3f4f6',
      padding: '4rem 1rem',
      textAlign: 'center'
    },
    testimonials: {
      backgroundColor: '#ffffff',
      padding: '4rem 1rem',
      textAlign: 'center'
    },
    cta: {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      padding: '4rem 1rem',
      textAlign: 'center'
    },
    footer: {
      backgroundColor: '#1f2937',
      color: '#9ca3af',
      padding: '4rem 1rem'
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          Home<span style={styles.navBrandSpan}>Helper</span>
        </div>
        <div style={styles.navLinksWrapper}>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>Services</a>
            <a href="#" style={styles.navLink}>Professionals</a>
            <a href="#" style={styles.navLink}>About</a>
          </div>
        </div>
        <div style={styles.navButtons}>
          <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.signupBtn} onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Professional Home Services At Your Doorstep</h1>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Book trusted professionals for cleaning, plumbing, electrical work and more. Quick, reliable service guaranteed.</p>
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: 'black' }}>{message}</p>
        </div>
      </div>

      <div style={styles.services}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Popular Services</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          <div style={styles.serviceCard}>
            <div style={{ fontSize: '3rem', color: '#4f46e5' }}>🧹</div>
            <h3>House Cleaning</h3>
            <p>Thorough cleaning by professionals</p>
            <p style={{ color: '#4f46e5' }}>From RM 75</p>
          </div>
          <div style={styles.serviceCard}>
            <div style={{ fontSize: '3rem', color: '#764ba2' }}>🔧</div>
            <h3>Plumbing</h3>
            <p>Fixing leaks, installations & more</p>
            <p style={{ color: '#764ba2' }}>From RM 90</p>
          </div>
          <div style={styles.serviceCard}>
            <div style={{ fontSize: '3rem', color: '#059669' }}>⚡</div>
            <h3>Electrical</h3>
            <p>Wiring, lighting & power solutions</p>
            <p style={{ color: '#059669' }}>From RM 85</p>
          </div>
          <div style={styles.serviceCard} >
            <div style={{ fontSize: '3rem', color: '#d97706' }}>🎨</div>
            <h3>Painting</h3>
            <p>Interior & exterior painting services</p>
            <p style={{ color: '#d97706' }}>From RM 120</p>
          </div>
        </div>
      </div>

      <div style={styles.howItWorks}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ backgroundColor: '#4f46e5', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>1</div>
            <h3>Choose Your Service</h3>
            <p>Browse our services and select what you need.</p>
          </div>
          <div>
            <div style={{ backgroundColor: '#764ba2', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>2</div>
            <h3>Schedule An Appointment</h3>
            <p>Pick a date and time that works best for you.</p>
          </div>
          <div>
            <div style={{ backgroundColor: '#059669', borderRadius: '50%', width: '50px', height: '50px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>3</div>
            <h3>Relax While We Work</h3>
            <p>Our professional arrives and delivers service.</p>
          </div>
        </div>
      </div>
      <div style={styles.cta}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Ready to book your service?</h2>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Join thousands of satisfied customers.</p>
        <button style={{ marginTop: '2rem', padding: '1rem 2rem', backgroundColor: 'white', color: '#4f46e5', borderRadius: '0.5rem', border: 'none' }}>Book Now</button>
      </div>

      <footer style={styles.footer}>
        <p style={{ textAlign: 'center' }}>© 2023 HomeHelper. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
