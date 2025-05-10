import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './NewPost.css';

const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { postId, initialContent } = location.state || {}; 

    const [postContent, setPostContent] = useState(initialContent || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!initialContent) {
            axios.get(`http://localhost:3000/post/${id}/edit`, {
                withCredentials: true
            })
            .then(response => {
                if (response.data.post) {
                    setPostContent(response.data.post.content);
                }
            })
            .catch(err => {
                console.error('Error fetching post:', err);
                setError('Failed to load post content');
            });
        }
    }, [id, initialContent]);

    const handleEditPost = () => {
        if (!postContent.trim()) {
            setError('Post content cannot be empty.');
            return;
        }

        const postIdToUse = postId || id;

        axios.post(`http://localhost:3000/post/${postIdToUse}/edit`, 
            { post: postContent }, 
            { withCredentials: true }
        )
        .then(response => {
            navigate('/tasker-dashboard', { 
                state: { postMessage: "Post edited successfully!" } 
            });
        })
        .catch(err => {
            console.error('Error editing post:', err);
            setError('Something went wrong. Please try again.');
        });
    };

    const goToTaskerDashboard = () => {
        navigate('/tasker-dashboard');
    }

    return (
        <div className="new-post-container">
            <h1>Edit Post</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleEditPost}>
            <div className="form-group">
                <textarea
                    name="post"
                    className="post-input"
                    placeholder="Edit your post..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows="4"
                />
            </div>

            <button 
                onClick={goToTaskerDashboard}
                className="submit-button"

            >
                Save Changes
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

export default EditPost;
