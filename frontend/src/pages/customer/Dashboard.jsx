import { useEffect, useState } from 'react';
import './dashboard.css';
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const message = location.state?.loginMessage;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/user', {
                    credentials: 'include'
                });
                const data = await response.json();
                console.log("Received data:", data);
                if (data.success) {
                    setPosts(data.posts);
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

        fetchPosts();
    }, []);

    return (
        <div>
            <div className="dashboard-header">
                <h1 className="dashboard-title">User Dashboard</h1>
                <a href="/profile" className="profile-link">View Profile</a>
            </div>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="dashboard-container">
                <div className="posts-grid">
                    {loading ? (
                        <div className="loading-message">Loading posts...</div>
                    ) : posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <h3 onClick={() => navigate(`/tasker/${post.tasker_id}`)} className="post-author">{post.tasker_name}</h3>
                                <h4 className="post-title">{post.title}</h4>
                                <p className="post-content">{post.content}</p>
                                <p className="post-price">Price: {post.price}</p>
                                <button 
                                    className='book-btn'
                                    onClick={() => navigate('/checkout', { 
                                        state: { 
                                            postDetails: {
                                                taskerName: post.tasker_name,
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
                        ))
                    ) : (
                        <div className="no-posts-message">
                            <p>No posts found</p>
                            <p>Check back later for new posts from taskers!</p>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
