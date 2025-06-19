import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const postDetails = location.state?.postDetails;
    const [walletBalance, setWalletBalance] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        taskerId: postDetails.taskerId,
        postId: postDetails.postId,
        date: '',
        time: '',
        paymentMethod: 'cash',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        amount: ''
    });
    // Time slots for selection
    const timeSlots = [
        { label: '8:00 AM - 10:00 AM', value: '8-10 AM', disabled: false },
        { label: '10:00 AM - 12:00 PM', value: '10-12 AM', disabled: false },
        { label: '12:00 PM - 2:00 PM', value: '12-14 PM', disabled: true },
        { label: '2:00 PM - 4:00 PM', value: '02-04 PM', disabled: false },
        { label: '4:00 PM - 6:00 PM', value: '04-06 PM', disabled: false },
        { label: '6:00 PM - 8:00 PM', value: '06-08 PM', disabled: false },
    ];
    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e)  => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/book-service', formData, {
                withCredentials: true
            });
            navigate('/dashboard');

            if(response.data.success){
                console.log('Form submitted:', formData);
                alert('Booking submitted successfully!');
            }else{
                alert(response.data.message || 'Booking failed!');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed! Please try again.');
        }
    };

    const fetchWalletBalance = async () => {
        try {
            const response = await axios.get('http://localhost:3000/profile', {
                withCredentials: true
            });
            setWalletBalance(response.data.user.money);
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
        }
    };

    // --- Modern, card-based, orange-accented styles ---
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
    const sectionTitleStyle = {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#ea580c',
        marginBottom: '12px',
        textAlign: 'left',
        width: '100%'
    };
    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto auto',
        gridTemplateAreas: `
            "title content"
            "name mobile"
            "service amount"
        `,
        gap: '12px',
        width: '100%',
        marginBottom: '12px'
    };
    const infoItemStyle = {
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#34495e'
    };
    const titleContentContainerStyle = {
        ...infoItemStyle,
        gridColumn: '1 / span 2',
        gridRow: '1 / span 2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: '110px',
        gap: '6px'
    };
    const labelStyle = {
        fontWeight: 600,
        color: '#2c3e50',
        marginBottom: '2px',
        fontSize: '1rem'
    };
    const valueStyle = {
        color: '#ea580c',
        fontWeight: 600
    };
    const formStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px'
    };
    const formGroupStyle = {
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
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
    const timeSlotsGridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '6px'
    };
    const timeSlotBtnStyle = (selected, disabled) => ({
        padding: '8px 18px',
        borderRadius: '8px',
        border: selected ? '2px solid #ea580c' : '1px solid #fed7aa',
        background: disabled ? '#f3f4f6' : selected ? '#ea580c' : '#fff',
        color: disabled ? '#bdbdbd' : selected ? '#fff' : '#ea580c',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        outline: 'none',
        boxShadow: selected ? '0 2px 8px rgba(234, 88, 12, 0.08)' : 'none',
        borderWidth: selected ? '2px' : '1px'
    });
    const paymentOptionsStyle = {
        display: 'flex',
        gap: '2rem',
        marginBottom: '1rem',
        marginTop: '0.5rem'
    };
    const paymentOptionStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 500,
        color: '#ea580c',
        fontSize: '1rem'
    };
    const submitButtonStyle = {
        width: '100%',
        padding: '12px 0',
        backgroundColor: '#ea580c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginTop: '12px',
        boxShadow: '0 2px 8px rgba(234, 88, 12, 0.08)',
        transition: 'background 0.2s'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={{...sectionTitleStyle, fontSize: '2rem', textAlign: 'center', color: '#ea580c', marginBottom: '24px'}}>Checkout</h1>
                <div style={{width: '100%'}}>
                    <h2 style={sectionTitleStyle}>Booking Information</h2>
                    <div style={infoGridStyle}>
                        <div style={titleContentContainerStyle}>
                            <span style={labelStyle}>Title:</span>
                            <span style={valueStyle}>{postDetails.title}</span>
                            <span style={{...labelStyle, marginTop: '8px'}}>Content:</span>
                            <span style={valueStyle}>{postDetails.content}</span>
                        </div>
                        <div style={infoItemStyle}><span style={labelStyle}>Name:</span><span style={valueStyle}>{postDetails.taskerName}</span></div>
                        <div style={infoItemStyle}><span style={labelStyle}>Mobile:</span><span style={valueStyle}>{postDetails.taskerMobile}</span></div>
                        <div style={infoItemStyle}><span style={labelStyle}>Service:</span><span style={valueStyle}>{postDetails.taskerService}</span></div>
                        <div style={infoItemStyle}><span style={labelStyle}>Amount:</span><span style={valueStyle}>{postDetails.price}</span></div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <h2 style={sectionTitleStyle}>Schedule</h2>
                        <div style={formGroupStyle}>
                            <label htmlFor="date" style={labelStyle}>Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                style={inputStyle}
                            />
                        </div>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Available Time Slots</label>
                            <div style={timeSlotsGridStyle}>
                                {timeSlots.map((slot) => (
                                    <button
                                        type="button"
                                        key={slot.value}
                                        style={timeSlotBtnStyle(formData.time === slot.value, slot.disabled)}
                                        onClick={() => !slot.disabled && setFormData({ ...formData, time: slot.value })}
                                        disabled={slot.disabled}
                                    >
                                        {slot.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 style={sectionTitleStyle}>Payment Method</h2>
                        <div style={paymentOptionsStyle}>
                            <div style={paymentOptionStyle}>
                                <input
                                    type="radio"
                                    id="cash"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={formData.paymentMethod === 'cash'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="cash">Cash</label>
                            </div>
                            <div style={paymentOptionStyle}>
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="card">Card</label>
                            </div>
                            <div style={paymentOptionStyle}>
                                <input
                                    type="radio"
                                    id="wallet"
                                    name="paymentMethod"
                                    value="wallet"
                                    checked={formData.paymentMethod === 'wallet'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="wallet">Your wallet</label>
                            </div>
                        </div>
                        {formData.paymentMethod === 'card' && (
                            <div>
                                <div style={formGroupStyle}>
                                    <label htmlFor="cardNumber" style={labelStyle}>Card Number:</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={formGroupStyle}>
                                    <label htmlFor="cardName" style={labelStyle}>Cardholder Name:</label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Card Holder Name"
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{display: 'flex', gap: '12px'}}>
                                    <div style={formGroupStyle}>
                                        <label htmlFor="expiryDate" style={labelStyle}>Expiry Date:</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div style={formGroupStyle}>
                                        <label htmlFor="cvv" style={labelStyle}>CVV:</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div style={formGroupStyle}>
                                        <label htmlFor="amount" style={labelStyle}>Amount:</label>
                                        <input
                                            type="text"
                                            id="amount"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength="10"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {formData.paymentMethod === 'wallet' && (
                            <div>
                                <div style={formGroupStyle}>
                                    <label htmlFor="amount" style={labelStyle}>Amount:</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        value={formData.amount || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter the amount you want to pay"
                                        maxLength="19"
                                        required
                                        style={inputStyle}
                                    />
                                    <label htmlFor="wallet" style={labelStyle}>Wallet Balance: {walletBalance} RM</label>
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit" style={submitButtonStyle}>
                        Submit Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 