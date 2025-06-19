import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = useParams().userId;
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/notification/${userId}`)
      .then(res => res.json())
      .then(data => {
        // Sort notifications by date, newest first
        const sortedNotifications = data.notifications.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setNotifications(sortedNotifications);
      });
  }, [userId]); // Added userId as dependency

  const handleNotificationClick = (notification) => {
    if (notification.message.includes('sent you a message') && notification.related_user_id) {
      navigate(`/chat/${notification.related_user_id}`);
    }
    if (notification.message.includes('has accepted your booking') && notification.related_user_id) {
      navigate(`/order/${notification.related_user_id}`);
    }
    if (notification.message.includes('cancelled your service') && notification.related_user_id) {
      navigate(`/order/${notification.related_user_id}`);
    }
  };



  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: "#d1fae5",
    backgroundImage: "radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)",
    backgroundSize: "26px 26px",
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
    padding: '32px 28px 28px 28px',
    maxWidth: '600px',
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

  const notificationListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const notificationItemStyle = {
    backgroundColor: '#f8faff',
    borderRadius: '10px',
    padding: '18px 20px',
    boxShadow: '0 2px 8px rgba(80, 112, 255, 0.06)',
    border: '1px solid #fed7aa',
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const notificationItemHoverStyle = {
    backgroundColor: '#fff7ed',
    boxShadow: '0 4px 16px rgba(234, 88, 12, 0.08)'
  };

  const notificationTimeStyle = {
    color: '#888',
    fontSize: '0.98rem',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <a href="/dashboard" style={backLinkStyle}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </a>
        <h2 style={titleStyle}>Notifications</h2>
        <div style={notificationListStyle}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={notificationItemStyle}
              onClick={() => handleNotificationClick(notification)}
              onMouseOver={e => {
                e.currentTarget.style.background = notificationItemHoverStyle.backgroundColor;
                e.currentTarget.style.boxShadow = notificationItemHoverStyle.boxShadow;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = notificationItemStyle.backgroundColor;
                e.currentTarget.style.boxShadow = notificationItemStyle.boxShadow;
              }}
            >
              <h3 style={{ margin: 0, color: '#1f2937', fontWeight: 600, fontSize: '1.08rem' }}>{notification.message}</h3>
              <p style={notificationTimeStyle}>
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification; 