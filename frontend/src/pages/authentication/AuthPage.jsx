import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successfulMessage = location.state?.successfulMessage;
  
  const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState('customer');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Signup state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    city: '',
    gender: '',
    service: '',
    type: 'individual',
    company_name: '',
    address: ''
  });
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setLoginError('');
    setSignupError('');
    setSignupSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email: loginEmail, password: loginPassword },
        { withCredentials: true }
      );
      
      const user = response.data.user;
      const loginMessage = response.data.loginMessage;
      
      if (user.role === "user") {
        navigate("/dashboard", { state: { loginMessage: loginMessage } });
      } else if (user.role === "tasker") {
        navigate("/tasker-dashboard", { state: { loginMessage: loginMessage } });
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        setLoginError("Unknown role");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An error occurred during login.");
      }
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    try {
      const formDataToSend = new FormData();
      Object.keys(signupData).forEach(key => {
        formDataToSend.append(key, signupData[key]);
      });

      if (selectedImage) {
        formDataToSend.append('profile_image', selectedImage);
      }

      const endpoint = userType === 'customer' ? '/signup' : '/tasker-signup';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (response.ok) {
        setSignupSuccess("Account has been registered successfully");
        setSignupData({
          name: '', email: '', mobile: '', password: '',
          city: '', gender: '', service: '', type: 'individual', company_name: '', address: ''
        });
        setSelectedImage(null);
        setPreviewUrl(null);
        
        // Auto-switch to login after successful signup
        setTimeout(() => {
          setIsSignUp(false);
          setSignupSuccess('');
        }, 2000);
      } else {
        setSignupError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setSignupError("Could not connect to the server.");
    }
  };

  // Inline styles
  const styles = {
    authPageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: "'Montserrat', sans-serif",
      height: '100vh',
      margin: 0,
      background: '#d1fae5',
      backgroundImage: 'radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)',
      backgroundSize: '26px 26px',
      opacity: 0.8
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 14px 28px rgba(80, 112, 255, 0.22), 0 2px 12px rgba(234, 88, 12, 0.12)',
      position: 'relative',
      overflow: 'hidden',
      width: '1024px',
      maxWidth: '100%',
      minHeight: '700px'
    },
    formContainer: {
      position: 'absolute',
      top: 0,
      height: '100%',
      transition: 'all 0.6s ease-in-out'
    },
    signInContainer: {
      left: 0,
      width: '50%',
      zIndex: 2
    },
    signUpContainer: {
      left: 0,
      width: '50%',
      opacity: 0,
      zIndex: 1
    },
    rightPanelActive: {
      transform: 'translateX(100%)',
      opacity: 1,
      zIndex: 5
    },
    form: {
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 50px',
      height: '100%',
      textAlign: 'center',
      overflowY: 'auto',
      maxHeight: '100%'
    },
    h1: {
      fontWeight: 'bold',
      margin: 0,
      width: '100%',
      color: '#ea580c'
    },
    h3: {
      marginTop: '0px',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '10px'
    },
    p: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0.5px',
      margin: '20px 0 30px'
    },
    formField: {
      margin: '8px 0',
      width: '100%'
    },
    input: {
      backgroundColor: '#eee',
      border: 'none',
      padding: '18px 20px',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '18px'
    },
    select: {
      backgroundColor: '#eee',
      border: 'none',
      padding: '18px 20px',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '18px'
    },
    formBtn: {
      borderRadius: '20px',
      border: '1px solid #ea580c',
      backgroundColor: '#ea580c',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '12px 45px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'transform 80ms ease-in',
      cursor: 'pointer'
    },
    ghostBtn: {
      borderRadius: '20px',
      border: '1px solid #ffffff',
      backgroundColor: 'transparent',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '12px 45px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'transform 80ms ease-in',
      cursor: 'pointer'
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: '50%',
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      transition: 'transform 0.6s ease-in-out',
      zIndex: 100
    },
    overlay: {
      background: '#ea580c',
      background: '-webkit-linear-gradient(to right, #ea580c, #fb923c)',
      background: 'linear-gradient(to right, #ea580c, #fb923c)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '0 0',
      color: '#ffffff',
      position: 'relative',
      left: '-100%',
      height: '100%',
      width: '200%',
      transform: 'translateX(0)',
      transition: 'transform 0.6s ease-in-out'
    },
    overlayPanel: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 40px',
      textAlign: 'center',
      top: 0,
      height: '100%',
      width: '50%',
      transform: 'translateX(0)',
      transition: 'transform 0.6s ease-in-out',

    },
    overlayLeft: {
        padding: '0px 0px 0px 0px',

      transform: 'translateX(-20%)'
    },
    overlayRight: {
        padding: '0px 0px 0px 0px',
      right: 0,
      transform: 'translateX(0)'
    },
    taskerSection: {
        height: '80px',
        marginBottom: '30px',
      marginTop: '20px',
      padding: '15px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.1)'
    },
    authUserType: {
      display: 'flex',
      gap: '10px',
      margin: '10px 0'
    },
    userTypeBtn: {
      backgroundColor: '#eee',
      border: '1px solid #fed7aa',
      padding: '8px 12px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.3s ease'
    },
    userTypeBtnActive: {
      backgroundColor: '#ea580c',
      color: '#fff',
      borderColor: '#ea580c'
    },
    errorMessage: {
      color: '#dc2626',
      backgroundColor: '#fee2e2',
      padding: '8px 12px',
      borderRadius: '4px',
      margin: '8px 0',
      fontSize: '12px'
    },
    successMessage: {
      color: '#059669',
      backgroundColor: '#d1fae5',
      padding: '8px 12px',
      borderRadius: '4px',
      margin: '8px 0',
      fontSize: '12px'
    },
    overlayH1: {
      fontWeight: 'bold',
      margin: 0,
      width: '100%',
      color: '#fff',
      textShadow: '0 2px 8px rgba(0,0,0,0.10)'
    }
  };

  return (
    <div style={styles.authPageContainer}>
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          background: 'none',
          border: 'none',
          fontSize: '2.2rem',
          cursor: 'pointer',
          color: '#ea580c',
          zIndex: 200
        }}
        aria-label="Go back"
      >
        &#8592;
      </button>
      <div style={{...styles.container, ...(isSignUp ? { transform: 'translateX(0)' } : {})}}>
        {/* Sign Up Form */}
        <div style={{
          ...styles.formContainer,
          ...styles.signUpContainer,
          ...(isSignUp ? styles.rightPanelActive : {})
        }}>
          <form style={styles.form} onSubmit={handleSignup}>
            <h1 style={styles.h1}>Create Account</h1>
            
            <div style={styles.authUserType}>
              <button 
                type="button" 
                style={{
                  ...styles.userTypeBtn,
                  ...(userType === 'customer' ? styles.userTypeBtnActive : {})
                }}
                onClick={() => handleUserTypeChange('customer')}
              >
                Customer
              </button>
              <button 
                type="button" 
                style={{
                  ...styles.userTypeBtn,
                  ...(userType === 'tasker' ? styles.userTypeBtnActive : {})
                }}
                onClick={() => handleUserTypeChange('tasker')}
              >
                 Tasker
              </button>
            </div>
            
            {signupSuccess && <div style={styles.successMessage}>{signupSuccess}</div>}
            {signupError && <div style={styles.errorMessage}>{signupError}</div>}
            
            <div style={styles.formField}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                style={styles.input}
              />
              {previewUrl && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <img 
                    src={previewUrl} 
                    alt="Profile preview" 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid #ea580c'
                    }} 
                  />
                </div>
              )}
            </div>
            
            <div style={styles.formField}>
              <input 
                type="text" 
                placeholder="Name" 
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formField}>
              <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formField}>
              <input 
                type="text" 
                placeholder="Mobile Number" 
                name="mobile"
                value={signupData.mobile}
                onChange={handleSignupChange}
                style={styles.input}
                required
              />
            </div>
            
            {userType === 'customer' && (
              <>
                <div style={styles.formField}>
                  <select 
                    name="city" 
                    value={signupData.city}
                    onChange={handleSignupChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select your city</option>

                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Shah Alam">Shah Alam</option>
                    <option value="Subang Jaya">Subang Jaya</option>
                    <option value="Johor Bahru">Johor Bahru</option>
                    <option value="George Town">George Town</option>
                    <option value="Ipoh">Ipoh</option>
                    <option value="Seremban">Seremban</option>
                    <option value="Melaka">Melaka</option>
                    <option value="Alor Setar">Alor Setar</option>
                    <option value="Kota Bharu">Kota Bharu</option>
                    <option value="Kuala Terengganu">Kuala Terengganu</option>
                    <option value="Kuantan">Kuantan</option>
                    <option value="Kota Kinabalu">Kota Kinabalu</option>
                    <option value="Kuching">Kuching</option>
                  </select>
                </div>
                
                <div style={styles.formField}>
                  <input 
                    type="text" 
                    placeholder="Address" 
                    name="address"
                    value={signupData.address}
                    onChange={handleSignupChange}
                    style={styles.input}
                    required
                  />
                </div>
              </>
            )}
            
            {userType === 'tasker' && (
              <>
                <div style={styles.formField}>
                  <select 
                    name="city" 
                    value={signupData.city}
                    onChange={handleSignupChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Shah Alam">Shah Alam</option>
                    <option value="Subang Jaya">Subang Jaya</option>
                    <option value="Johor Bahru">Johor Bahru</option>
                    <option value="George Town">George Town</option>
                    <option value="Ipoh">Ipoh</option>
                    <option value="Seremban">Seremban</option>
                    <option value="Melaka">Melaka</option>
                    <option value="Alor Setar">Alor Setar</option>
                    <option value="Kota Bharu">Kota Bharu</option>
                    <option value="Kuala Terengganu">Kuala Terengganu</option>
                    <option value="Kuantan">Kuantan</option>
                    <option value="Kota Kinabalu">Kota Kinabalu</option>
                    <option value="Kuching">Kuching</option>
                  </select>
                </div>
                {/* Gender select for Tasker */}
                <div style={styles.formField}>
                  <select
                    name="gender"
                    value={signupData.gender}
                    onChange={handleSignupChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div style={styles.formField}>
                  <input 
                    type="text" 
                    placeholder="Service Type (e.g., Plumbing, Electrical)" 
                    name="service"
                    value={signupData.service}
                    onChange={handleSignupChange}
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.formField}>
                  <select 
                    name="type" 
                    value={signupData.type}
                    onChange={handleSignupChange}
                    style={styles.select}
                    required
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                  </select>
                </div>
                
                {signupData.type === "company" && (
                  <div style={styles.formField}>
                    <input 
                      type="text" 
                      placeholder="Company Name" 
                      name="company_name"
                      value={signupData.company_name}
                      onChange={handleSignupChange}
                      style={styles.input}
                      required
                    />
                  </div>
                )}
              </>
            )}
            
            <div style={styles.formField}>
              <input 
                type="password" 
                placeholder="Password" 
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                style={styles.input}
                required
              />
            </div>
            
            <button style={styles.formBtn} type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div style={{
          ...styles.formContainer,
          ...styles.signInContainer,
          ...(isSignUp ? { transform: 'translateX(100%)' } : {})
        }}>
          <form style={styles.form} onSubmit={handleLogin}>
            <h1 style={styles.h1}>Sign In</h1>

            {successfulMessage && <div style={styles.successMessage}>{successfulMessage}</div>}
            {loginError && <div style={styles.errorMessage}>{loginError}</div>}

            <div style={styles.formField}>
              <input 
                type="email" 
                placeholder="Email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formField}>
              <input 
                type="password" 
                placeholder="Password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            <button style={styles.formBtn} type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div style={{
          ...styles.overlayContainer,
          ...(isSignUp ? { transform: 'translateX(-100%)' } : {})
        }}>
          <div style={{
            ...styles.overlay,
            ...(isSignUp ? { transform: 'translateX(50%)' } : {})
          }}>
            <div style={{
              ...styles.overlayPanel,
              ...styles.overlayLeft,
              ...(isSignUp ? { transform: 'translateX(0)' } : {})
            }}>
                <h1 style={styles.overlayH1}>Welcome Back!</h1>
                <p style={styles.p}>To keep connected with us please login with your personal info</p>
                <div style={styles.taskerSection}>
                    <h3 style={styles.h3}>Are you a Tasker?</h3>
                    <p style={styles.p}>Login to manage your services and connect with customers.</p>
                </div>
                <button 
                  style={styles.ghostBtn} 
                  onClick={() => setIsSignUp(false)}
                >
                    Sign In
                </button>
            </div>
            <div style={{
              ...styles.overlayPanel,
              ...styles.overlayRight,
              ...(isSignUp ? { transform: 'translateX(20%)' } : {})
            }}>
                <h1 style={styles.overlayH1}>Hello, There!</h1>
                <p style={styles.p}>Enter your personal details and start your journey with us</p>
                <div style={styles.taskerSection}>
                    <h3 style={styles.h3}>Want to offer your services?</h3>
                    <p style={styles.p}>Join our community of professional taskers and start earning today!</p>
                </div>
                <button 
                  style={styles.ghostBtn} 
                  onClick={() => setIsSignUp(true)}
                >
                    Sign Up
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 