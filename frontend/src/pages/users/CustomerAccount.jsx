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

    if (!customer) {
        return <div className="profile-container">No profile data available</div>;
    }

    if (error) {
        return <div className="profile-container">Error: {error}</div>;
    }

    if (loading) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-image-section">
                <div className="profile-image-container">
                    {customer.profile_image ? (
                        <img
                            src={`http://localhost:3000${customer.profile_image}`}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <div className="profile-image-placeholder">
                            {customer.name ? customer.name.charAt(0).toUpperCase() : '?'}
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-info">
            <div className="info-item">
                <button className="chat-button" onClick={() => navigate(`/chatbox/${customerId}`)}> CHAT</button>

                </div>
                <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{customer.name}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{customer.email}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Mobile:</span>
                    <span className="info-value">{customer.mobile}</span>
                </div>
            </div>


        
        </div>
    );
}

export default CustomerAccount;