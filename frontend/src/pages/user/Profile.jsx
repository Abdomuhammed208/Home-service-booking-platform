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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
        <a href="/edit-profile" className="edit-link">Edit Profile</a>
      </div>

      <div className="profile-image-section">
        <div className="profile-image-container">
          {user.profile_image ? (
            <img 
              src={`http://localhost:3000${user.profile_image}`} 
              alt="Profile" 
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <label className="change-photo-button">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{user.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{user.email}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Mobile:</span>
          <span className="info-value">{user.mobile}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Balance:</span>
          <span className="info-value">{user.money} RM</span>
        </div>
      </div>

      <div className="button-group">
        <button onClick={goToTopupPage} className="btn btn-topup">Top Up</button>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        <button onClick={handleDelete} className="btn btn-delete">Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
