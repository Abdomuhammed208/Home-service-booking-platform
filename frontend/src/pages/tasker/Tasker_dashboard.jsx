import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./tasker_dashboard.css";
import axios from "axios";
function Taskerdashboard() {
    const location = useLocation();
    const message = location.state?.loginMessage;
    const postMessage = location.state?.postMessage;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentTaskerId, setCurrentTaskerId] = useState(null);

    const toGoToNewpost = () => {
        navigate("/new-post");
    };

    useEffect(() => {
        fetch("http://localhost:3000/tasker-profile", {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.tasker) {
                    setCurrentTaskerId(data.tasker.id);
                }
            })
            .catch(error => console.error('Error fetching tasker profile:', error));

        fetch("http://localhost:3000/tasker", {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);
    const handleDeletePost = (postId) => {
        
        axios.post(`http://localhost:3000/post/${postId}/delete`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPosts(posts.filter(post => post.id !== postId));
                }
            })
            .catch(error => console.error('Error deleting post:', error));
    };
    const handleEditPost = (postId) => {
        axios.post(`http://localhost:3000/post/${postId}/edit`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPosts(posts.filter(post => post.id !== postId));
                }
            })
            .catch(error => console.error('Error editing post:', error));
    };

    return (
        <div>

            <div className="dashboard-header">
                <h1 className="dashboard-title">Tasker Dashboard</h1>
                <a href="/tasker-profile" className="profile-link">View Profile</a>
            </div>

            {(message || postMessage) && (
                <div className="success-message">
                    {message || postMessage}
                </div>
            )}
            <div className="dashboard-container">

                <div className="posts-grid">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <p className="post-content">{post.content}</p>
                                <p className="post-author">Posted by: {post.tasker_name}</p>
                                {currentTaskerId === post.tasker_id && (
                                    <div className="post-actions">
                                        <button onClick={() => handleEditPost(post.id)} className="edit-link">Edit</button>

                                        <form
                                            onClick={() => handleDeletePost(post.id)}
                                            method="POST"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (window.confirm('Are you sure you want to delete this post?')) {
                                                    e.target.submit();
                                                }
                                            }}
                                        >
                                            <button type="submit" className="delete-button">Delete</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-posts-message">
                            <p>No posts found</p>
                            <p>Create your first post to get started!</p>
                        </div>
                    )}
                </div>

                <button onClick={toGoToNewpost} className="new-post-button">
                    Create New Post
                </button>
            </div>
        </div>
    );
}

export default Taskerdashboard;