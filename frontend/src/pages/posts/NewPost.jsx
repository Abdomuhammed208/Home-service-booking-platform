import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.trim()) {
            setError('Please enter some content for your post');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/post', 
                { post: post.trim() },
                { withCredentials: true }
            );

            if (!response.data) {
                setError('Failed to create post. Please try again.');
            }else{
                setPost('');
                navigate('/tasker-dashboard', { 
                    state: { postMessage: "Post created successfully!" }
                });
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            setError('Failed to create post. Please try again.');
        }
    };
const goToTaskerDashboard = () => {
    navigate('/tasker-dashboard');
}
    return (
        <div className="new-post-container">
            <h1>Create New Post</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea
                        name="post"
                        className="post-input"
                        placeholder="What's on your mind?"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        rows="4"
                    />
                </div>
                <button onClick={goToTaskerDashboard} type="submit" className="submit-button">
                    Share Post
                </button>
                <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => navigate('/tasker-dashboard')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default NewPost;
