import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditProfileTasker = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialProfile = location.state || {};
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: initialProfile.name || "",
        mobile: initialProfile.mobile || "",
        email: initialProfile.email || "",
        city: initialProfile.city || "",
        service: initialProfile.service || "",
        company_name: initialProfile.company_name || "",
    });

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
            setTimeout(() => {
                navigate("/tasker-profile");
            }, 2000);
            if (response.data.ok) {
                setSuccess("Profile updated successfully!");
            
             } else {
                setError(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    // --- Modern, card-based, orange-accented styles ---
    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: '#d1fae5',
        backgroundImage: 'radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)',
        backgroundSize: '26px 26px',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '32px 16px'
    };
    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
        padding: '40px 32px 32px 32px',
        maxWidth: '420px',
        width: '100%',
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
    };
    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '16px',
        textAlign: 'center'
    };
    const formStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };
    const inputWrapperStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: '100%'
    };
    const labelStyle = {
        fontWeight: 600,
        color: '#2c3e50',
        marginBottom: '2px',
        fontSize: '1rem'
    };
    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #fed7aa',
        fontSize: '0.97rem',
        outline: 'none',
        transition: 'border 0.2s',
        background: '#f8fafc',
        height: '36px',
        boxSizing: 'border-box'
    };
    const buttonRowStyle = {
        display: 'flex',
        gap: '16px',
        marginTop: '8px',
        width: '100%'
    };
    const submitButtonStyle = {
        flex: 1,
        backgroundColor: '#ea580c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 0',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };
    const cancelButtonStyle = {
        flex: 1,
        backgroundColor: '#f3f4f6',
        color: '#ea580c',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 0',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };
    const errorStyle = {
        color: '#f43f5e',
        background: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '8px',
        textAlign: 'center'
    };
    const successStyle = {
        color: '#16a34a',
        background: '#dcfce7',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '8px',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Edit Profile</h1>
                {error && <div style={errorStyle}>{error}</div>}
                {success && <div style={successStyle}>{success}</div>}
                <form style={formStyle} onSubmit={handleSubmit}>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Name</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Mobile</label>
                        <input
                            style={inputStyle}
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            style={inputStyle}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>City</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Service</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            placeholder="Enter your service"
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Company Name</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                        />
                    </div>
                    <div style={buttonRowStyle}>
                        <button 
                            type="submit"
                            style={submitButtonStyle}
                            onClick={() => navigate("/tasker-profile")}
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            style={cancelButtonStyle}
                            onClick={() => navigate("/tasker-profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileTasker;
