import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaTasks, FaBell, FaEllipsisV, FaEdit, FaTrash, FaPlus, FaTimes, FaCheckCircle } from "react-icons/fa";
import "./tasker_dashboard.css";

function Taskerdashboard() {
    const location = useLocation();
    const message = location.state?.loginMessage;
    const postMessage = location.state?.postMessage;
    const deleteMessage = location.state?.deleteMessage;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentTaskerId, setCurrentTaskerId] = useState(null);
    const [taskerProfile, setTaskerProfile] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRefs = useRef([]);
    const {taskerId} = useParams();

    const toGoToNewpost = () => {
        navigate("/new-post");
    };

    useEffect(() => {
        axios.get("http://localhost:3000/tasker-profile", {
            withCredentials: true
        })
            .then(response => {
                setTaskerProfile(response.data.tasker);
                setCurrentTaskerId(response.data.tasker.id);
            })
            .catch(error => console.error('Error fetching tasker profile:', error));

        fetch("http://localhost:3000/tasker", {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                const sortedPosts = data.posts.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setPosts(sortedPosts);
            })
            .catch(error => console.error('Error fetching posts:', error));

        const handleClickOutside = (event) => {
            if (dropdownOpen !== null && 
                dropdownRefs.current[dropdownOpen] && 
                !dropdownRefs.current[dropdownOpen].contains(event.target)) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleDeletePost = (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios.post(`http://localhost:3000/post/${postId}/delete`, {}, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.success) {
                        setPosts(posts.filter(post => post.id !== postId));
                        navigate("/tasker-dashboard", { state: { deleteMessage: "Post deleted successfully" } });
                    }
                })
                .catch(error => console.error('Error deleting post:', error));
        }
    };
// useEffect(() => {
//     axios.get(`http://localhost:3000/order/${taskerId}`, {
//         withCredentials: true
//     })
//     .then(response => {
//         console.log(response.data);
//     })
// })
    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

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
                        <h1>Tasker Dashboard</h1>
                    </div>
                    {/* <div className="header-left">
                        <a href={`/order/${taskerId}`} className="order-history-link">View orders</a>
                    </div> */}
                    <div className="header-right">
                        <button className="notification-btn" onClick={() => navigate(`/notification/${currentTaskerId}`)} aria-label="Notifications">
                            <FaBell className="notification-link" />
                        </button>
                        <div 
                            className="profile-section"
                            onClick={() => navigate("/tasker-profile")}
                        >
                            {taskerProfile?.image ? (
                                <img 
                                    src={`http://localhost:3000${taskerProfile.image}`} 
                                    alt="Profile" 
                                    className="profile-img"
                                />
                            ) : (
                                <div className="profile-initials">
                                    {getInitials(taskerProfile?.name)}
                                </div>
                            )}
                            <span className="profile-name">
                                {taskerProfile?.name || 'Profile'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Success Message */}
            {(message || postMessage || deleteMessage) && (
                <div className="success-message">
                    <div className="message-content">
                        <div className="message-text">
                            <FaCheckCircle className="message-icon" />
                            <p>{message || postMessage || deleteMessage}</p>
                        </div>
                        <button className="close-message">
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            <main className="dashboard-main">
                <div className="posts-section">
                    <div className="section-header">
                        <h2>Your Task Posts</h2>
                        <div className="section-actions">
                            <button className="action-btn">
                                <i className="fas fa-filter"></i>
                            </button>
                            <button className="action-btn">
                                <i className="fas fa-sort"></i>
                            </button>
                        </div>
                    </div>

                    <div className="posts-grid">
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <div className="post-author">
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
                                        {post.tasker_id === currentTaskerId && (
                                            <div className="post-menu" ref={el => dropdownRefs.current[index] = el}>
                                                <button 
                                                    className="menu-btn"
                                                    onClick={() => toggleDropdown(index)}
                                                >
                                                    <FaEllipsisV />
                                                </button>
                                                {dropdownOpen === index && (
                                                    <div className="menu-dropdown">
                                                        <button 
                                                            onClick={() => {
                                                                navigate(`/post/${post.id}/edit`, {
                                                                    state: {
                                                                        postId: post.id,
                                                                        initialContent: post.content
                                                                    }
                                                                });
                                                                setDropdownOpen(null);
                                                            }}
                                                            className="menu-item"
                                                        >
                                                            <FaEdit className="menu-icon" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                handleDeletePost(post.id);
                                                                setDropdownOpen(null);
                                                            }}
                                                            className="menu-item delete"
                                                        >
                                                            <FaTrash className="menu-icon" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-content">{post.content}</p>
                                    
                                    <div className="post-footer">
                                        <div className="post-meta">
                                            <p className="post-price">{post.price} RM</p>
                                            <p className="post-date">
                                                Posted: {new Date(post.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className="post-status">Available</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-posts">
                                <p className="no-posts-title">No posts found</p>
                                <p className="no-posts-subtitle">Create your first post to get started!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Action Button */}
                <button 
                    onClick={toGoToNewpost}
                    className="floating-btn"
                    aria-label="Create New Post"
                >
                    <FaPlus className="plus-icon" />
                </button>
            </main>
        </div>
    );
}

export default Taskerdashboard;