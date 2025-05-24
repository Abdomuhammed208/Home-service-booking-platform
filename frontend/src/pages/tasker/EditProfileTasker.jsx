import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfileTasker.css";

const EditProfileTasker = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        service: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tasker-profile", {
                    withCredentials: true
                });
                if (response.data.user) {
                    setFormData({
                        name: response.data.user.name || "",
                        mobile: response.data.user.mobile || "",
                        email: response.data.user.email || "",
                        city: response.data.user.city || "",
                        service: response.data.user.service || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post("http://localhost:3000/tasker-submit", formData,
                { withCredentials: true }
            );

            if (response.data.ok) {
                setSuccess("Profile updated successfully!");
                setTimeout(() => {
                    navigate("/profile");
                }, 2000);
             } else {
                setError(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="editProfile-container">
                    <div className="loading-message">Loading profile data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="editProfile-container">
                <h1 className="form-title">Edit Profile</h1>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                
                <form className="editProfile-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            className="input-field"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            
                        />
                        <span className="material-symbols-outlined">person</span>
                    </div>

                    <div className="input-wrapper">
                        <input
                            className="input-field"
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            
                        />
                        <span className="material-symbols-outlined">phone</span>
                    </div>

                    <div className="input-wrapper">
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            
                        />
                        <span className="material-symbols-outlined">mail</span>
                    </div>

                    <div className="input-wrapper">
                        <input
                            className="input-field"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            
                        />
                        <span className="material-symbols-outlined">location_on</span>
                    </div>

                    <div className="input-wrapper">
                        <input
                            className="input-field"
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            placeholder="Enter your service"
                            
                        />
                        <span className="material-symbols-outlined">category</span>
                    </div>
                    <button 
                        className="editProfile-button" 
                        type="submit"
                        onClick={() => navigate("/tasker-profile")}
                    >
                        Save Changes
                    </button>
                    <button 
                        className="editProfile-button" 
                        type="button"
                        onClick={() => navigate("/tasker-profile")}
                        style={{ marginTop: '10px', backgroundColor: '#dc3545' }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileTasker;
