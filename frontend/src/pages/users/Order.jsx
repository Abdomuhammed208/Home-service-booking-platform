import React, { useState, useEffect } from 'react';
import './Order.css';
import { useParams } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const userId = useParams().userId;
  
  useEffect(() => {
    fetch(`http://localhost:3000/order/${userId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const sortedOrders = data.orders.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setOrders(sortedOrders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  const getStatusColor = (status) => {
    if (!status) return '#666';
    
    switch (status.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'in progress':
        return '#2196F3';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <div className="order-list-container">
      <a href={`/dashboard`} className="back-arrow">
        <span className="material-symbols-outlined">arrow_back</span>
      </a>
      <h2 className="order-list-title">My Orders</h2>
      <div className="order-list">
        {orders.length === 0 ? (
          <div className="no-orders">
            <span className="material-symbols-outlined">receipt_long</span>
            <p>No orders found</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.payment_status || 'Pending'}
                </span>
              </div>
              <div className="order-details">
                <div className="order-info">
                  <p><strong>Order ID:</strong> B{order.id || 'N/A'}</p>
                  <p><strong>Service:</strong> {order.name || 'N/A'}</p>
                  <p><strong>Tasker:</strong> {order.tasker_id || 'N/A'}</p>
                  <p><strong>Price:</strong> {order.amount ? `${order.amount} RM` : '0'}</p>
                  <p><strong>Payment Method:</strong> {order.method || 'N/A'}</p>
                  <p><strong>Time:</strong> {order.time || 'N/A'}</p>
                  <p><strong>Date:</strong> {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="order-actions">
                  <button className="view-details-btn">
                    <span className="material-symbols-outlined">visibility</span>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order; 