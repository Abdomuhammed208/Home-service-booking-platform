import React, { useState } from 'react';
import SwitchUser from './SwitchUser';

function TaskerForm({ setUserType }) {
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        city: "",
        gender: "",
        service: ""
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
            // Append all form fields
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            
            // Append the image if selected
            if (selectedImage) {
                formDataToSend.append('profile_image', selectedImage);
            }

            const response = await fetch("http://localhost:3000/tasker-signup", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message || "Something went wrong.");
            } else {
                setMessage(data.message);
                setFormData({ 
                    name: "", 
                    email: "", 
                    mobile: "", 
                    password: "", 
                    city: "", 
                    gender: "", 
                    service: "" 
                });
                setSelectedImage(null);
                setPreviewUrl(null);
            }
        } catch (err) {
            console.error("Frontend error:", err);
            setMessage("Could not connect to the server.");
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
                    <div className="form-group">
                        <div className="gender-options">
                            <label htmlFor="male" className="gender-label">
                                <input type="radio" name="gender" value="male" id="male" className="gender-input" onChange={handleChange} />
                                Male
                            </label>
                            <label htmlFor="female" className="gender-label">
                                <input type="radio" name="gender" value="female" id="female" className="gender-input" onChange={handleChange} />
                                Female
                            </label>
                        </div>
                        <div className="city-select-wrapper">
                            <select name="city" onChange={handleChange} className="city-select">
                                <option value="">Select your city</option>
                                <option value="cyberjaya">Cyberjaya</option>
                                <option value="petalingjaya">Petaling Jaya</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input name="service" className="input-field" type="text" placeholder="Service (e.g. Plumbing)" onChange={handleChange} />
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

export default TaskerForm;
