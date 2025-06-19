import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserAccount.css";
import { useNavigate } from "react-router-dom";

function CustomerAccount() {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { customerId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/customer/${customerId}`, {
                    method: "GET",
                    credentials: "include"
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch tasker profile");
                }
                
                const data = await response.json();
                setCustomer(data.customers);

            } catch (err) {
                console.error("Failed to fetch tasker data:", err);
                setError("Failed to load tasker profile");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [customerId]);

    // --- Styles matching UserAccount.jsx ---
    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)',
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
        maxWidth: '600px',
        width: '100%',
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center'
    };
    const imageStyle = {
        width: '160px',
        height: '160px',
        borderRadius: '80px',
        objectFit: 'cover',
        border: '3px solid #ea580c',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem'
    };
    const imagePlaceholderStyle = {
        width: '160px',
        height: '160px',
        borderRadius: '80px',
        backgroundColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: '#ea580c',
        border: '3px solid #ea580c',
        marginBottom: '1rem'
    };
    const infoItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.5rem',
        width: '100%'
    };
    const infoLabelStyle = {
        fontWeight: 600,
        color: '#2c3e50',
        marginBottom: '0.25rem'
    };
    const infoValueStyle = {
        color: '#34495e'
    };
    const chatButtonStyle = {
        backgroundColor: '#ea580c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginBottom: '1rem',
        width: '20%'
    };

    if (loading) {
        return <div style={containerStyle}><div style={cardStyle}>Loading...</div></div>;
    }
    if (error) {
        return <div style={containerStyle}><div style={cardStyle}>Error: {error}</div></div>;
    }
    if (!customer) {
        return <div style={containerStyle}><div style={cardStyle}>No profile data available</div></div>;
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {/* Profile Image */}
                {customer.profile_image ? (
                    <img
                        src={`http://localhost:3000${customer.profile_image}`}
                        alt="Profile"
                        style={imageStyle}
                    />
                ) : (
                    <div style={imagePlaceholderStyle}>
                        {customer.name ? customer.name.charAt(0).toUpperCase() : '?'}
                    </div>
                )}
                {/* Chat Button */}
                <button style={chatButtonStyle} onClick={() => navigate(`/chatbox/${customerId}`)}>Chat</button>
                {/* Info Items */}
                <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Name</span>
                    <span style={infoValueStyle}>{customer.name}</span>
                </div>
                <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Email</span>
                    <span style={infoValueStyle}>{customer.email}</span>
                </div>
                <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Mobile</span>
                    <span style={infoValueStyle}>{customer.mobile}</span>
                </div>
                <div style={infoItemStyle}>
                    <span style={infoLabelStyle}>Address</span>
                    <span style={infoValueStyle}>{customer.address} - {customer.city}</span>
                </div>


            </div>
        </div>
    );
}

export default CustomerAccount;