import React, { useState } from "react";
import CustomerForm from './CustomerForm';
import TaskerForm from './TaskerForm';

function Signup() {
    const [userType, setUserType] = useState('customer');

    const pageStyle = {
        minHeight: "100vh",
        backgroundColor: "#d1fae5",
        backgroundImage: "radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)",
        backgroundSize: "26px 26px",
        opacity: 0.8,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
    };

    const cardStyle = {
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 12px 40px rgba(80, 112, 255, 0.22), 0 2px 12px rgba(234, 88, 12, 0.12)",
        padding: "3rem 2rem",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center"
    };

    const titleStyle = {
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "#ea580c",
        marginBottom: "2rem"
    };

    const typeSelectorStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        justifyContent: "center"
    };

    const typeButtonStyle = {
        padding: "0.75rem 1.5rem",
        borderRadius: "8px",
        border: "1px solid #fed7aa",
        background: "transparent",
        color: "#ea580c",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        flex: 1,
        maxWidth: "200px"
    };

    const activeTypeButtonStyle = {
        ...typeButtonStyle,
        background: "#ea580c",
        color: "#fff",
        border: "none"
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Create Account</h1>
                
                <div style={typeSelectorStyle}>
                    <button
                        style={userType === 'customer' ? activeTypeButtonStyle : typeButtonStyle}
                        onClick={() => setUserType('customer')}
                    >
                        Customer
                    </button>
                    <button
                        style={userType === 'tasker' ? activeTypeButtonStyle : typeButtonStyle}
                        onClick={() => setUserType('tasker')}
                    >
                        Tasker
                    </button>
                </div>

                {userType === 'customer' ? 
                    <CustomerForm setUserType={setUserType} /> : 
                    <TaskerForm setUserType={setUserType} />
                }
            </div>
        </div>
    );
}

export default Signup;
