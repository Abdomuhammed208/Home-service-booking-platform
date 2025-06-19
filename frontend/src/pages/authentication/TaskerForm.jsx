import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskerForm({ setUserType }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    city: "",
    gender: "",
    service: "",
    type: "individual",
    company_name: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (selectedImage) {
        formDataToSend.append('profile_image', selectedImage);
      }


      const response = await fetch("http://localhost:3000/tasker-signup", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      navigate("/login", { state: { successfulMessage: "Account has been registered successfully" } });
      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
      } else {
        setMessage(data.message);
        setFormData({
          name: "", email: "", mobile: "", password: "",
          city: "", gender: "", service: "", type: "individual", company_name: ""
        });
        setSelectedImage(null);
        setPreviewUrl(null);

      }
    } catch (err) {
      console.error("Frontend error:", err);
      setMessage("Could not connect to the server.");
    }
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

  const selectStyle = {
    ...inputStyle,
    backgroundColor: "white",
    cursor: "pointer"
  };

  const fileInputWrapperStyle = {
    marginBottom: "2rem",
    textAlign: "center"
  };

  const fileInputLabelStyle = {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ea580c",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontWeight: 500
  };

  const fileInputStyle = {
    display: "none"
  };

  const previewImageStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1rem",
    border: "3px solid #fed7aa"
  };

  const radioGroupStyle = {
    display: "flex",
    gap: "1.5rem",
    marginTop: "0.5rem"
  };

  const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer"
  };

  const radioInputStyle = {
    width: "1rem",
    height: "1rem",
    cursor: "pointer"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ea580c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "1rem"
  };

  const errorStyle = {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    textAlign: "center"
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={fileInputWrapperStyle}>
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Profile" style={previewImageStyle} />
          </div>
        )}
        <label style={fileInputLabelStyle}>
          {selectedImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={fileInputStyle}
          />
        </label>
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Full Name</label>
        <input
          style={inputStyle}
          placeholder="Enter your full name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Mobile Number</label>
        <input
          style={inputStyle}
          placeholder="Enter your mobile number"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Email Address</label>
        <input
          style={inputStyle}
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Gender</label>
        <div style={radioGroupStyle}>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              style={radioInputStyle}
            />
            Male
          </label>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              style={radioInputStyle}
            />
            Female
          </label>
        </div>
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select your city</option>
          <option value="cyberjaya">Cyberjaya</option>
          <option value="petalingjaya">Petaling Jaya</option>
        </select>
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Service Type</label>
        <input
          style={inputStyle}
          placeholder="e.g., Plumbing, Electrical, Cleaning"
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        />
      </div>

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Account Type</label>
        <div style={radioGroupStyle}>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="type"
              value="individual"
              checked={formData.type === "individual"}
              onChange={handleChange}
              style={radioInputStyle}
            />
            Individual
          </label>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="type"
              value="company"
              checked={formData.type === "company"}
              onChange={handleChange}
              style={radioInputStyle}
            />
            Company
          </label>
        </div>
      </div>

      {formData.type === "company" && (
        <>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Company Name</label>
            <input
              style={inputStyle}
              placeholder="Enter company name"
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div style={inputWrapperStyle}>
        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          placeholder="Create a password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {message && <p style={errorStyle}>{message}</p>}
      
      <button style={buttonStyle} type="submit">
        Create Account
      </button>
      <p>Already have an account? <a href="/login">Login</a></p>

    </form>
  );
}

export default TaskerForm;
