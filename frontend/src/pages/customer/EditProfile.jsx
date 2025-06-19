import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        city: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/profile", {
                    withCredentials: true
                });
                if (response.data.user) {
                    setFormData({
                        name: response.data.user.name || "",
                        mobile: response.data.user.mobile || "",
                        email: response.data.user.email || "",
                        address: response.data.user.address || "",
                        city: response.data.user.city || "",    
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
            const response = await axios.post(
                "http://localhost:3000/submit",
                formData,
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
        padding: '8px 12px', // reduced padding
        borderRadius: '8px',
        border: '1px solid #fed7aa',
        fontSize: '0.97rem', // slightly smaller font
        outline: 'none',
        transition: 'border 0.2s',
        background: '#f8fafc',
        height: '36px', // set a smaller height
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
    const backArrowStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        fontSize: '1.8rem',
        color: '#ea580c',
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(234, 88, 12, 0.10)',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #fed7aa',
        transition: 'background 0.2s, box-shadow 0.2s'
    };

    if (loading) {
        return (
            <div style={containerStyle}><div style={cardStyle}>Loading profile data...</div></div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{...cardStyle, position: 'relative'}}>
                <span
                    style={backArrowStyle}
                    onClick={() => navigate('/profile')}
                    aria-label="Back to Profile"
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/profile'); }}
                >
                    &#8592;
                </span>
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <div style={inputWrapperStyle}>
                        <label style={labelStyle}>Address</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div> <div style={inputWrapperStyle}>
                        <label style={labelStyle}>City</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            required
                        />
                    </div>
                    <div style={buttonRowStyle}>
                        <button 
                            type="submit"
                            style={submitButtonStyle}
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            style={cancelButtonStyle}
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
