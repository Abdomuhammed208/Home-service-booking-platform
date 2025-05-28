import { useEffect, useState } from 'react';
import './dashboard.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaTasks, FaBell, FaCheckCircle, FaTimes, FaExclamationCircle } from "react-icons/fa";
import ConversationList from '../users/ConversationList';

function Dashboard() {
    const location = useLocation();
    const message = location.state?.loginMessage;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/user', {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    const sortedPosts = data.posts.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });
                    setPosts(sortedPosts);
                } else {
                    setError(data.message || 'Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    withCredentials: true
                });
                setUserId(response.data.user.id);
                setUserProfile(response.data.user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
        fetchPosts();
    }, []);

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="tasker-dashboard">
            <header className="dashboard-header">
                <div className="header-container">
                    <div className="header-left">
                        <FaTasks className="header-icon" />
                        <h1>User Dashboard</h1>
                    </div>
                    <div className="header-left">
                       <a href={`/order/${userId}`} className="order-history-link">View orders</a>
                    </div>
                    {/* <div className="header-left">
                       <a href={`/conversation-list/${userId}`} className="order-history-link">View conversation</a>
                    </div> */}
                    <div className="header-right">
                        <button onClick={() => navigate(`/notification/${userId}`)} className="notification-btn" aria-label="Notifications">
                            <FaBell className="notification-link" />
                        </button>
                        <div 
                            className="profile-section"
                            onClick={() => navigate("/profile")}
                        >
                            {userProfile?.image ? (
                                <img 
                                    src={`http://localhost:3000${userProfile.image}`} 
                                    alt="Profile" 
                                    className="profile-img"
                                />
                            ) : (
                                <div className="profile-initials">
                                    {getInitials(userProfile?.name)}
                                </div>
                            )}
                            <span className="profile-name">
                                {userProfile?.name || 'Profile'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Success Message */}
            {message && (
                <div className="success-message">
                    <div className="message-content">
                        <div className="message-text">
                            <FaCheckCircle className="message-icon" />
                            <p>{message}</p>
                        </div>
                        <button className="close-message">
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="error-message">
                    <div className="message-content">
                        <div className="message-text">
                            <FaExclamationCircle className="message-icon" />
                            <p>{error}</p>
                        </div>
                        <button className="close-message">
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Task Posts Section */}
                <div className="posts-section">
                    <div className="section-header">
                        <h2>Available Tasks</h2>
                        <div className="section-actions">
                            <button className="action-btn">
                                <i className="fas fa-filter"></i>
                            </button>
                            <button className="action-btn">
                                <i className="fas fa-sort"></i>
                            </button>
                        </div>
                    </div>

                    {/* Task Posts Grid */}
                    <div className="posts-grid">
                        {loading ? (
                            <div className="loading-message">
                                <div className="loading-spinner"></div>
                                <p>Loading posts...</p>
                            </div>
                        ) : posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <div onClick={() => navigate(`/tasker/${post.tasker_id}`)} className="post-author">
                                            {post.tasker_image ? (
                                                <img 
                                                    src={`http://localhost:3000${post.tasker_image}`} 
                                                    alt="Profile" 
                                                    className="author-img"
                                                />
                                            ) : (
                                                <div className="author-initials">
                                                    {getInitials(post.tasker_name)}
                                                </div>
                                            )}
                                            <span className="author-name">{post.tasker_name}</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-content">{post.content}</p>
                                    
                                    <div className="post-footer">
                                        <div className="post-meta">
                                            <p className="post-date">
                                                Posted: {new Date(post.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="post-actions">
                                            <p className="post-price">{post.price} RM</p>
                                            <button 
                                                className="book-btn"
                                                onClick={() => navigate('/checkout', { 
                                                    state: { 
                                                        postDetails: {
                                                            taskerName: post.tasker_name,
                                                            taskerId: post.tasker_id,
                                                            content: post.content,
                                                            title: post.title,
                                                            price: post.price
                                                        }
                                                    }
                                                })}
                                            >
                                                Book now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-posts">
                                <p className="no-posts-title">No posts found</p>
                                <p className="no-posts-subtitle">Check back later for new posts from taskers!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Conversations Section */}
                <ConversationList />
            </main>
        </div>
    );
}

export default Dashboard;
