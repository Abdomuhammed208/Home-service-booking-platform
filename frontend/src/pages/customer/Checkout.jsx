import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
//import { useParams } from 'react-router-dom'; 
import './checkout.css';

const Checkout = () => {
    const location = useLocation();
    //const { postId } = useParams();
    const postDetails = location.state?.postDetails;
    const [walletBalance, setWalletBalance] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        paymentMethod: 'cash',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

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

    const handleSubmit = (e)  => {
        e.preventDefault();
        // Here you would typically handle the form submission
        const response = axios.post('http://localhost:3000/book-service', formData);
        if(response.data.ok){
            console.log('Form submitted:', formData);
            alert('Booking submitted successfully!');
            navigate('/dashboard');
        }else{
            alert('Booking failed!');
        }
    };
    useEffect(() => {
        fetchWalletBalance();
    }, []);

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


    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            
            <div className="customer-info-section">
                <h2>Booking Information</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="label">Name:</span>
                        <span className="value">{postDetails.taskerName}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Mobile:</span>
                        {/* <span className="value">{postDetails.service}</span> */}
                    </div>
                    <div className="info-item">
                        <span className="label">Service:</span>
                        <span className="value">{postDetails.taskerName}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Amount:</span>
                        <span className="value">{postDetails.price}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Title:</span>
                        <span className="value">{postDetails.title}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Content:</span>
                        <span className="value">{postDetails.content}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-section">
                    <h2>Schedule</h2>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Payment Method</h2>
                    <div className="payment-options">
                        <div className="payment-option">
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
                        <div className="payment-option">
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
                        <div className="payment-option">
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
                        <div className="card-details">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number:</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardName">Cardholder Name:</label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Card Holder Name"
                                    required
                                />
                            </div>
                            <div className="card-details-row">
                                <div className="form-group">
                                    <label htmlFor="expiryDate">Expiry Date:</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="cvv">CVV:</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="3"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvv">Amount:</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="10"
                                        required
                                    />
                                </div>
                                
                            </div>
                        </div>
                    )}
                    {formData.paymentMethod === 'wallet' && (
                        <div className="card-details">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Amount:</label>
                                <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount || ''}
                                    onChange={handleInputChange}
                                    placeholder="Enter the amount you want to pay"
                                    maxLength="19"
                                    required
                                />
                                <label htmlFor="wallet">Wallet Balance: {walletBalance} RM</label>
                            </div>
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-button">
                    Submit Booking
                </button>
            </form>
        </div>
    );
};

export default Checkout; 