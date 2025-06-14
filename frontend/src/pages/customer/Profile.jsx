import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/Notfound";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  
  const goToTopupPage = () => {
    navigate("/top-up");
  };

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);

      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profile_image', file);

        const response = await axios.post('http://localhost:3000/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });

        if (response.data.success) {
          setUser(prev => ({
            ...prev,
            profile_image: response.data.image_url
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure to delete this account?");
    if (!confirmDelete) return;
    
    try {
      const response = await axios.post("http://localhost:3000/delete-account", {}, {
        withCredentials: true,
      });
      if (response.data.success) {
        alert("The account has been deleted successfully");
        navigate("/login");
      } else {
        alert(response.data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account.");
    }
  };

  if (!user) return <NotFound />;

  // --- Inline styles for portrait layout ---
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '32px 8px'
  };
  const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
    maxWidth: '900px',
    width: '100%',
    margin: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '32px 32px 24px 32px'
  };
  const headerBarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    width: '100%'
  };
  const headerTitleStyle = {
    flex: 1,
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1f2937'
  };
  const headerLinkStyle = {
    color: '#ea580c',
    textDecoration: 'none',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  };
  const mainContentStyle = {
    display: 'flex',
    gap: '40px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  };
  const leftSectionStyle = {
    flex: '0 0 220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '180px'
  };
  const rightSectionStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '250px'
  };
  const imageStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '90px',
    objectFit: 'cover',
    border: '3px solid #ea580c',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem'
  };
  const imagePlaceholderStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '90px',
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#ea580c',
    border: '3px solid #ea580c',
    marginBottom: '1rem'
  };
  const changePhotoButtonStyle = {
    backgroundColor: '#ea580c',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    border: 'none',
    transition: 'background-color 0.3s',
    marginTop: '0.5rem'
  };
  const infoItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '0.5rem'
  };
  const infoLabelStyle = {
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: '0.25rem'
  };
  const infoValueStyle = {
    color: '#34495e'
  };
  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    flexWrap: 'wrap'
  };
  const btnStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontSize: '1rem'
  };
  const btnTopupStyle = {
    ...btnStyle,
    backgroundColor: '#ea580c',
    color: 'white'
  };
  const btnLogoutStyle = {
    ...btnStyle,
    backgroundColor: '#f3f4f6',
    color: '#ea580c'
  };
  const btnDeleteStyle = {
    ...btnStyle,
    backgroundColor: '#f43f5e',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerBarStyle}>
          <a href="/dashboard" style={headerLinkStyle}>
            <span className="material-symbols-outlined" style={{ marginRight: '6px' }}>arrow_back</span>
            Back to Dashboard
          </a>
          <div style={headerTitleStyle}>User Profile</div>
          <a href="/edit-profile" style={headerLinkStyle}>Edit Profile</a>
        </div>
        <div style={mainContentStyle}>
          <div style={leftSectionStyle}>
            {user.profile_image ? (
              <img 
                src={`http://localhost:3000${user.profile_image}`} 
                alt="Profile" 
                style={imageStyle}
              />
            ) : (
              <div style={imagePlaceholderStyle}>
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <label style={changePhotoButtonStyle}>
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div style={rightSectionStyle}>
            <div style={infoItemStyle}>
              <span style={infoLabelStyle}>Name</span>
              <span style={infoValueStyle}>{user.name}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={infoLabelStyle}>Email</span>
              <span style={infoValueStyle}>{user.email}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={infoLabelStyle}>Mobile</span>
              <span style={infoValueStyle}>{user.mobile}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={infoLabelStyle}>Address</span>
              <span style={infoValueStyle}>{user.address}, {user.city}</span>
            </div>
            <div style={infoItemStyle}>
              <span style={infoLabelStyle}>Balance</span>
              <span style={infoValueStyle}>{user.money} RM</span>
            </div>
            <div style={buttonGroupStyle}>
              <button onClick={goToTopupPage} style={btnTopupStyle}>Top Up</button>
              <button onClick={handleLogout} style={btnLogoutStyle}>Logout</button>
              <button onClick={handleDelete} style={btnDeleteStyle}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
