import React, { useState } from 'react';
import SwitchUser from './SwitchUser';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import axios from 'axios';
function CustomerForm({ setUserType }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        address: "",
        city: "",
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
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('city', formData.city);
            if (selectedImage) {
                formDataToSend.append('profile_image', selectedImage);
            }

            const response = await axios.post("http://localhost:3000/signup", formDataToSend, {
                withCredentials: true
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                setFormData({ 
                    name: "", 
                    email: "", 
                    mobile: "", 
                    password: "",
                    address: "",
                    city: ""
                });
                setSelectedImage(null);
                setPreviewUrl(null);
            } else {
                setMessage(response.data.message || "Something went wrong.");
            }
            navigate("/login", {state: {succefulMessage: "Account has been registered successfully"}});

        } catch (err) {
            console.error("Frontend error:", err);
            setMessage(err.response?.data?.message || "Could not connect to the server.");
        }
    };

    return (
        <div className="container">
            <div className="signup-container">
                <h1 className="form-title">Sign up</h1>
                <SwitchUser setUserType={setUserType} />
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="profile-image-upload">
                        {previewUrl && (
                            <div className="image-preview">
                                <img src={previewUrl} alt="Profile preview" />
                            </div>
                        )}
                        <div className="input-wrapper">
                            <label className="file-input-label">
                                {selectedImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input className="input-field" placeholder="Name" type="text" onChange={handleChange} name="name" required />
                    </div>
                    <div className="input-wrapper">
                        <input className="input-field" placeholder="Mobile no." type="text" onChange={handleChange} name="mobile" required />
                    </div>
                    <div className="input-wrapper">
                        <input className="input-field" placeholder="Email" type="email" onChange={handleChange} name="email" required />
                    </div>

                    <div className="city-select-wrapper">
                            <select name="city" onChange={handleChange} className="city-select">
                                <option value="">Select your city</option>
                                <option value="cyberjaya">Cyberjaya</option>
                                <option value="petalingjaya">Petaling Jaya</option>
                            </select>
                        </div>
                    <div className="input-wrapper">
                        <input className="input-field" placeholder="Your address" type="text" onChange={handleChange} name="address" required />
                    </div>
                    <div className="input-wrapper">
                        <input className="input-field" placeholder="Password" type="password" onChange={handleChange} name="password" required />
                    </div>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                    <button className="signup-button" type="submit">Sign up</button>
                </form>
                <p className="sign-up-text">
                    I have an account?
                    <a href="/login"> Login</a>
                </p>
            </div>
        </div>
    );
}

export default CustomerForm;
