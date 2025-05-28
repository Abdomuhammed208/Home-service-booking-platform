import React, { useState, useEffect } from 'react';
import './Notification.css';
import { useParams } from 'react-router-dom';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = useParams().userId;
  
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

  return (
    <div className="notification-list-container">
      <a href="/dashboard" className="back-arrow">
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Dashboard
      </a>
      <h2 className="notification-list-title">Notifications</h2>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <h3>{notification.message}</h3>
            <p className="notification-time">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification; 