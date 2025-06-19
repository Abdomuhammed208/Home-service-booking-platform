import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function TopupTasker() {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(amount > 0){
            axios.post("http://localhost:3000/top-up-tasker", {amount},{
                withCredentials: true,
            })
            navigate("/tasker-profile");
        }else{
            setError("Invalid Amount")
        }
      
    }
    const handleChange = (e)=>{
        setAmount(e.target.value)
    }
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
        padding: '32px 8px'
    };
    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(8, 10, 22, 0.12), 0 2px 12px rgba(234, 88, 12, 0.12)',
        maxWidth: '400px',
        width: '100%',
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 32px 24px 32px',
        border: '1px solid #fed7aa'
    };
    const formTitleStyle = {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '24px',
        textAlign: 'center'
    };
    const inputWrapperStyle = {
        width: '100%',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };
    const inputFieldStyle = {
        width: '100%',
        maxWidth: '260px',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #fed7aa',
        fontSize: '1rem',
        marginBottom: '8px',
        outline: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'border 0.2s',
        background: '#f8fafc'
    };
    const buttonStyle = {
        backgroundColor: '#ea580c',
        color: '#fff',
        border: 'none',
        padding: '12px 32px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 2px 8px rgba(234, 88, 12, 0.10)',
        marginTop: '8px',
        transition: 'background 0.2s, transform 0.2s'
    };
    const errorStyle = {
        color: 'red',
        marginBottom: '8px',
        textAlign: 'center',
        fontWeight: 500
    };
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <h1 style={formTitleStyle}>Top Up</h1>
                    <div style={inputWrapperStyle}>
                        <input
                            value={amount}
                            name="amount"
                            onChange={handleChange}
                            style={inputFieldStyle}
                            placeholder="Enter your amount"
                            type="number"
                            min="1"
                            required
                        />
                    </div>
                    {error && <p style={errorStyle}>{error}</p>}
                    <button style={buttonStyle} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default TopupTasker;