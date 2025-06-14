import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
  padding: '36px 32px 32px 32px',
  maxWidth: '700px',
  width: '100%',
  margin: '32px 0'
};

const backLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#ea580c',
  fontWeight: 500,
  marginBottom: '1.5rem',
  fontSize: '1rem',
  gap: '8px',
  transition: 'color 0.2s'
};

const titleStyle = {
  color: '#1f2937',
  fontSize: '2rem',
  marginBottom: '1.5rem',
  textAlign: 'center',
  fontWeight: 700
};

const orderListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
};

const orderItemStyle = {
  backgroundColor: '#f8faff',
  borderRadius: '12px',
  padding: '22px 24px',
  boxShadow: '0 2px 8px rgba(80, 112, 255, 0.06)',
  border: '1px solid #fed7aa',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minHeight: '220px',
  position: 'relative'
};

const orderHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px'
};

const orderStatusStyle = (color) => ({
  backgroundColor: color,
  color: '#fff',
  borderRadius: '8px',
  padding: '4px 14px',
  fontWeight: 600,
  fontSize: '0.98rem',
  marginLeft: '12px'
});

const orderDetailsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '24px',
  flexWrap: 'wrap',
  flex: 1
};

const orderInfoStyle = {
  flex: 1,
  minWidth: '180px'
};

const orderActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  justifyContent: 'flex-end',
  marginTop: 'auto',
  alignSelf: 'flex-end'
};

const viewDetailsBtnStyle = {
  backgroundColor: '#ea580c',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 18px',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'background 0.2s'
};

const noOrdersStyle = {
  textAlign: 'center',
  color: '#6b7280',
  padding: '2.5rem 0'
};

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const taskerId = useParams().taskerId;

  useEffect(() => {
    fetch(`http://localhost:3000/allorder/${taskerId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const sortedOrders = data.orders.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setOrders(sortedOrders);
        console.log(sortedOrders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [taskerId]);

  const handleCompleteOrder = (orderId) => {
    console.log("This is the order id: " + orderId);
    fetch(`http://localhost:3000/complete-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: orderId }),
      credentials: 'include'
    });
  };

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

  const getTimeElapsed = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <a href={`/tasker-dashboard`} style={backLinkStyle}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </a>
        <h2 style={titleStyle}>My Orders</h2>
        <div style={orderListStyle}>
          {orders.length === 0 ? (
            <div style={noOrdersStyle}>
              <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🧾</span>
              <p>No orders found</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={orderItemStyle}>
                <div style={orderHeaderStyle}>
                  <h3 style={{ margin: 0, fontWeight: 600, color: '#1f2937' }}>Order #{order.id}</h3>
                  <span style={orderStatusStyle(getStatusColor(order.booking_status))}>
                    {order.booking_status || 'Pending'}
                  </span>
                </div>
                <div style={orderDetailsStyle}>
                  <div style={orderInfoStyle}>
                    <p><strong>Order ID:</strong> B{order.id || 'N/A'}</p>
                    <p><strong>User:</strong> {order.user_name || 'N/A'}</p>
                    <p><strong>Address:</strong> {order.user_address || 'N/A'} - {order.user_city || 'N/A'}</p>
                    <p><strong>Price:</strong> {order.amount ? `${order.amount} RM` : '0 RM'}</p>
                    <p><strong>Payment Method:</strong> {order.method || 'N/A'}</p>
                    <p><strong>Payment Status:</strong> {order.payment_status || 'N/A'}</p>
                    <p><strong>Time:</strong> {order.time || 'N/A'}</p>
                    <p><strong>Date:</strong> {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                    <p> {order.created_at ? getTimeElapsed(order.created_at) : 'N/A'}</p>
                  </div>
                </div>
                {order.booking_status !== 'Cancelled' && order.booking_status !== 'Completed' && (
                <div style={orderActionsStyle}>
                <button style={viewDetailsBtnStyle} onClick={() => handleCompleteOrder(order.id)}>
                  Complete Order
                </button>
                </div>
                )}
              </div>

            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrder; 